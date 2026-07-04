"use client";

import { useState, FormEvent } from "react";

type Status = "idle" | "loading" | "success" | "error";

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

export default function InschrijfForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [bsn, setBsn] = useState("");
  const [bsnTouched, setBsnTouched] = useState(false);
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

    try {
      const res = await fetch("/api/inschrijving", {
        method: "POST",
        body: data,
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Versturen is niet gelukt.");
      }

      setStatus("success");
      form.reset();
      setBsn("");
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
          Uw inschrijving is ontvangen
        </h3>
        <p className="text-ink/70 text-sm leading-relaxed">
          We nemen uw inschrijving in behandeling en nemen zo nodig contact
          met u op, bijvoorbeeld om medicatiegegevens over te dragen van uw
          vorige apotheek.
        </p>
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
          <input required id="naam" name="naam" type="text" className="w-full border border-pine/20 rounded-lg px-4 py-2.5 text-sm focus:border-clay outline-none" />
        </div>
        <div>
          <label htmlFor="geboortedatum" className="block text-xs font-mono uppercase tracking-wide text-ink/60 mb-1.5">
            Geboortedatum
          </label>
          <input required id="geboortedatum" name="geboortedatum" type="date" className="w-full border border-pine/20 rounded-lg px-4 py-2.5 text-sm focus:border-clay outline-none" />
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
            bsnTouched && !bsnValid ? "border-clay" : "border-pine/20 focus:border-clay"
          }`}
        />
        {bsnTouched && !bsnValid && (
          <p className="text-xs text-clay-dark mt-1.5">Dit lijkt geen geldig BSN.</p>
        )}
      </div>

      <div>
        <label htmlFor="adres" className="block text-xs font-mono uppercase tracking-wide text-ink/60 mb-1.5">
          Adres
        </label>
        <input required id="adres" name="adres" type="text" placeholder="Straat, huisnummer, postcode, Zoetermeer" className="w-full border border-pine/20 rounded-lg px-4 py-2.5 text-sm focus:border-clay outline-none" />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wide text-ink/60 mb-1.5">
            E-mailadres
          </label>
          <input required id="email" name="email" type="email" className="w-full border border-pine/20 rounded-lg px-4 py-2.5 text-sm focus:border-clay outline-none" />
        </div>
        <div>
          <label htmlFor="telefoon" className="block text-xs font-mono uppercase tracking-wide text-ink/60 mb-1.5">
            Telefoonnummer
          </label>
          <input required id="telefoon" name="telefoon" type="tel" className="w-full border border-pine/20 rounded-lg px-4 py-2.5 text-sm focus:border-clay outline-none" />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="huisarts" className="block text-xs font-mono uppercase tracking-wide text-ink/60 mb-1.5">
            Huisarts (praktijk)
          </label>
          <input id="huisarts" name="huisarts" type="text" className="w-full border border-pine/20 rounded-lg px-4 py-2.5 text-sm focus:border-clay outline-none" />
        </div>
        <div>
          <label htmlFor="vorigeApotheek" className="block text-xs font-mono uppercase tracking-wide text-ink/60 mb-1.5">
            Huidige apotheek (indien overstap)
          </label>
          <input id="vorigeApotheek" name="vorigeApotheek" type="text" className="w-full border border-pine/20 rounded-lg px-4 py-2.5 text-sm focus:border-clay outline-none" />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="zorgverzekeraar" className="block text-xs font-mono uppercase tracking-wide text-ink/60 mb-1.5">
            Zorgverzekeraar
          </label>
          <input required id="zorgverzekeraar" name="zorgverzekeraar" type="text" className="w-full border border-pine/20 rounded-lg px-4 py-2.5 text-sm focus:border-clay outline-none" />
        </div>
        <div>
          <label htmlFor="polisnummer" className="block text-xs font-mono uppercase tracking-wide text-ink/60 mb-1.5">
            Polisnummer
          </label>
          <input required id="polisnummer" name="polisnummer" type="text" className="w-full border border-pine/20 rounded-lg px-4 py-2.5 text-sm focus:border-clay outline-none" />
        </div>
      </div>

      <label className="flex items-start gap-3 text-xs text-ink/60 leading-relaxed">
        <input required type="checkbox" name="akkoord" className="mt-1" />
        Ik geef toestemming voor de verwerking van mijn gegevens en BSN door
        Apotheek Zoetermeer ten behoeve van mijn inschrijving en medicatiedossier,
        in overeenstemming met de AVG.
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
        {status === "loading" ? "Versturen..." : "Inschrijving versturen"}
      </button>
    </form>
  );
}
