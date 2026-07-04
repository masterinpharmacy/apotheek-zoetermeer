"use client";

import { useState, useMemo, FormEvent } from "react";

type Status = "idle" | "loading" | "success" | "error";

const BMI_REFERRAL_THRESHOLD = 30;

function isValidBsn(bsn: string): boolean {
  const digits = bsn.replace(/\D/g, "");
  if (digits.length < 8 || digits.length > 9) return false;
  const padded = digits.padStart(9, "0");
  const sum = padded
    .split("")
    .slice(0, 8)
    .reduce((acc, digit, i) => acc + Number(digit) * (9 - i), 0);
  const check = sum - Number(padded[8]);
  return check % 11 === 0;
}

export default function UploadForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [fileName, setFileName] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [bsn, setBsn] = useState("");
  const [bsnTouched, setBsnTouched] = useState(false);

  const [lengte, setLengte] = useState(""); // cm
  const [gewicht, setGewicht] = useState(""); // kg

  const bmi = useMemo(() => {
    const h = parseFloat(lengte) / 100;
    const w = parseFloat(gewicht);
    if (!h || !w || h <= 0 || w <= 0) return null;
    return w / (h * h);
  }, [lengte, gewicht]);

  const bsnValid = bsn.length === 0 || isValidBsn(bsn);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!isValidBsn(bsn)) {
      setBsnTouched(true);
      setErrorMsg("Controleer uw BSN — dit lijkt geen geldig burgerservicenummer.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = new FormData(form);
    if (bmi) data.set("bmi", bmi.toFixed(1));

    try {
      const res = await fetch("/api/upload-recept", {
        method: "POST",
        body: data,
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Versturen is niet gelukt.");
      }

      setStatus("success");
      form.reset();
      setFileName("");
      setBsn("");
      setLengte("");
      setGewicht("");
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Er ging iets mis. Probeer het opnieuw."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="bg-white perforated-edge rounded-md p-10 text-center max-w-xl mx-auto">
        <div className="stamp text-pine w-20 h-20 mx-auto mb-6 flex items-center justify-center">
          <span className="font-mono text-[10px] font-bold">ONTVANGEN</span>
        </div>
        <h3 className="font-display text-2xl text-pine mb-3">
          Uw recept is bij ons binnen
        </h3>
        <p className="text-ink/70 text-sm leading-relaxed mb-6">
          U ontvangt binnen enkele minuten een bevestiging per e-mail. Onze
          apotheker controleert uw recept, meestal binnen 24 uur op werkdagen.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="text-sm font-semibold text-clay hover:text-clay-dark"
        >
          Nog een recept insturen
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white perforated-edge rounded-md p-8 md:p-10 max-w-xl mx-auto space-y-5"
    >
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="naam" className="block text-xs font-mono uppercase tracking-wide text-ink/60 mb-1.5">
            Volledige naam
          </label>
          <input
            required
            id="naam"
            name="naam"
            type="text"
            className="w-full border border-pine/20 rounded-lg px-4 py-2.5 text-sm focus:border-clay outline-none"
          />
        </div>
        <div>
          <label htmlFor="geboortedatum" className="block text-xs font-mono uppercase tracking-wide text-ink/60 mb-1.5">
            Geboortedatum
          </label>
          <input
            required
            id="geboortedatum"
            name="geboortedatum"
            type="date"
            className="w-full border border-pine/20 rounded-lg px-4 py-2.5 text-sm focus:border-clay outline-none"
          />
        </div>
      </div>

      <div>
        <label htmlFor="bsn" className="block text-xs font-mono uppercase tracking-wide text-ink/60 mb-1.5">
          BSN (burgerservicenummer)
        </label>
        <input
          required
          id="bsn"
          name="bsn"
          type="text"
          inputMode="numeric"
          maxLength={9}
          value={bsn}
          onChange={(e) => setBsn(e.target.value.replace(/\D/g, ""))}
          onBlur={() => setBsnTouched(true)}
          placeholder="123456789"
          className={`w-full border rounded-lg px-4 py-2.5 text-sm outline-none ${
            bsnTouched && !bsnValid
              ? "border-clay focus:border-clay"
              : "border-pine/20 focus:border-clay"
          }`}
        />
        {bsnTouched && !bsnValid && (
          <p className="text-xs text-clay-dark mt-1.5">
            Dit lijkt geen geldig BSN. Controleer het nummer.
          </p>
        )}
        <p className="text-xs text-ink/45 mt-1.5">
          Nodig voor identificatie bij uw zorgverzekeraar. Wordt uitsluitend
          gebruikt voor de verwerking van uw recept en beveiligd opgeslagen.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wide text-ink/60 mb-1.5">
            E-mailadres
          </label>
          <input
            required
            id="email"
            name="email"
            type="email"
            className="w-full border border-pine/20 rounded-lg px-4 py-2.5 text-sm focus:border-clay outline-none"
          />
        </div>
        <div>
          <label htmlFor="telefoon" className="block text-xs font-mono uppercase tracking-wide text-ink/60 mb-1.5">
            Telefoonnummer
          </label>
          <input
            required
            id="telefoon"
            name="telefoon"
            type="tel"
            className="w-full border border-pine/20 rounded-lg px-4 py-2.5 text-sm focus:border-clay outline-none"
          />
        </div>
      </div>

      <div>
        <label htmlFor="recept" className="block text-xs font-mono uppercase tracking-wide text-ink/60 mb-1.5">
          Recept (foto of PDF)
        </label>
        <input
          required
          id="recept"
          name="recept"
          type="file"
          accept="image/*,application/pdf"
          onChange={(e) => setFileName(e.target.files?.[0]?.name || "")}
          className="w-full text-sm file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:bg-sage/40 file:text-pine file:text-xs file:font-semibold file:uppercase file:tracking-wide file:cursor-pointer border border-pine/20 rounded-lg"
        />
        {fileName && (
          <p className="text-xs text-ink/50 mt-1.5 font-mono">
            Geselecteerd: {fileName}
          </p>
        )}
      </div>

      {/* BMI-check */}
      <div className="border border-pine/15 rounded-lg p-5 bg-sage/10">
        <p className="text-xs font-mono uppercase tracking-wide text-ink/60 mb-3">
          BMI-check (optioneel)
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="lengte" className="block text-xs text-ink/50 mb-1.5">
              Lengte (cm)
            </label>
            <input
              id="lengte"
              name="lengte"
              type="number"
              min={100}
              max={250}
              value={lengte}
              onChange={(e) => setLengte(e.target.value)}
              className="w-full border border-pine/20 rounded-lg px-4 py-2.5 text-sm focus:border-clay outline-none"
            />
          </div>
          <div>
            <label htmlFor="gewicht" className="block text-xs text-ink/50 mb-1.5">
              Gewicht (kg)
            </label>
            <input
              id="gewicht"
              name="gewicht"
              type="number"
              min={30}
              max={300}
              value={gewicht}
              onChange={(e) => setGewicht(e.target.value)}
              className="w-full border border-pine/20 rounded-lg px-4 py-2.5 text-sm focus:border-clay outline-none"
            />
          </div>
        </div>

        {bmi && (
          <div className="mt-4 pt-4 border-t border-pine/10">
            <p className="text-sm text-ink/70">
              Uw BMI is <span className="font-semibold text-pine">{bmi.toFixed(1)}</span>
            </p>
            {bmi >= BMI_REFERRAL_THRESHOLD && (
              <div className="mt-3 bg-clay/10 border border-clay/20 rounded-lg p-4">
                <p className="text-sm text-ink/75 leading-relaxed">
                  Bij een BMI vanaf {BMI_REFERRAL_THRESHOLD} kan begeleide
                  gewichtsbegeleiding zinvol zijn. Onze partner{" "}
                  <a
                    href="https://bmibewust.nl"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-clay-dark font-semibold underline"
                  >
                    BMI Bewust
                  </a>{" "}
                  biedt hiervoor een begeleid traject onder toezicht van een
                  arts en apotheker.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <div>
        <label htmlFor="opmerking" className="block text-xs font-mono uppercase tracking-wide text-ink/60 mb-1.5">
          Opmerking (optioneel)
        </label>
        <textarea
          id="opmerking"
          name="opmerking"
          rows={3}
          className="w-full border border-pine/20 rounded-lg px-4 py-2.5 text-sm focus:border-clay outline-none resize-none"
        />
      </div>

      <label className="flex items-start gap-3 text-xs text-ink/60 leading-relaxed">
        <input required type="checkbox" name="akkoord" className="mt-1" />
        Ik geef toestemming voor de verwerking van mijn gegevens, BSN en
        recept door Apotheek Zoetermeer, in overeenstemming met de AVG. Bij
        de bezorging wordt mijn identiteit gecontroleerd.
      </label>

      {status === "error" && (
        <p className="text-sm text-clay-dark bg-clay/10 rounded-lg px-4 py-3">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-clay text-paper py-3.5 rounded-full font-semibold hover:bg-clay-dark transition-colors disabled:opacity-60"
      >
        {status === "loading" ? "Versturen..." : "Recept insturen"}
      </button>

      <p className="text-xs text-ink/45 text-center">
        Twijfelt u over uw recept? Bel direct met onze apotheker:{" "}
        <a href="tel:+31791234567" className="text-clay-dark font-medium">
          079 123 45 67
        </a>
      </p>
    </form>
  );
}
