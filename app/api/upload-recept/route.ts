import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Apotheek-inbox die recepten ontvangt — pas aan naar het juiste adres
const APOTHEEK_INBOX = process.env.APOTHEEK_INBOX_EMAIL || "info@apotheekzoetermeer.nl";
const AFZENDER = process.env.RESEND_FROM_EMAIL || "Apotheek Zoetermeer <info@apotheekzoetermeer.nl>";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/heic", "application/pdf"];

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const naam = String(formData.get("naam") || "").trim();
    const geboortedatum = String(formData.get("geboortedatum") || "").trim();
    const bsn = String(formData.get("bsn") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const telefoon = String(formData.get("telefoon") || "").trim();
    const bmi = String(formData.get("bmi") || "").trim();
    const opmerking = String(formData.get("opmerking") || "").trim();
    const akkoord = formData.get("akkoord");
    const file = formData.get("recept") as File | null;

    if (!naam || !geboortedatum || !bsn || !email || !telefoon || !akkoord) {
      return NextResponse.json(
        { error: "Vul alle verplichte velden in." },
        { status: 400 }
      );
    }

    if (!isValidBsn(bsn)) {
      return NextResponse.json(
        { error: "Dit lijkt geen geldig BSN. Controleer het nummer." },
        { status: 400 }
      );
    }

    if (!file || file.size === 0) {
      return NextResponse.json(
        { error: "Voeg een foto of PDF van uw recept toe." },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "Het bestand is te groot (max. 10MB)." },
        { status: 400 }
      );
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Alleen foto's (JPG, PNG, HEIC) of PDF worden geaccepteerd." },
        { status: 400 }
      );
    }

    const bytes = Buffer.from(await file.arrayBuffer());
    const ticketNr = `RCP-${Date.now().toString().slice(-8)}`;

    // 1) Interne mail naar apotheek met recept als bijlage
    await resend.emails.send({
      from: AFZENDER,
      to: APOTHEEK_INBOX,
      replyTo: email,
      subject: `Nieuw recept ingestuurd — ${naam} (${ticketNr})`,
      html: `
        <h2>Nieuw recept ontvangen — ${ticketNr}</h2>
        <table cellpadding="6">
          <tr><td><strong>Naam</strong></td><td>${escapeHtml(naam)}</td></tr>
          <tr><td><strong>Geboortedatum</strong></td><td>${escapeHtml(geboortedatum)}</td></tr>
          <tr><td><strong>BSN</strong></td><td>${escapeHtml(bsn)}</td></tr>
          <tr><td><strong>E-mail</strong></td><td>${escapeHtml(email)}</td></tr>
          <tr><td><strong>Telefoon</strong></td><td>${escapeHtml(telefoon)}</td></tr>
          ${bmi ? `<tr><td><strong>BMI</strong></td><td>${escapeHtml(bmi)}${Number(bmi) >= 30 ? " (≥30 — mogelijk relevant voor verwijzing BMI Bewust)" : ""}</td></tr>` : ""}
          <tr><td><strong>Opmerking</strong></td><td>${escapeHtml(opmerking || "—")}</td></tr>
        </table>
      `,
      attachments: [
        {
          filename: file.name || "recept",
          content: bytes,
        },
      ],
    });

    // 2) Bevestigingsmail naar patiënt
    await resend.emails.send({
      from: AFZENDER,
      to: email,
      subject: `Uw recept is ontvangen — ${ticketNr}`,
      html: `
        <p>Beste ${escapeHtml(naam)},</p>
        <p>We hebben uw recept in goede orde ontvangen (referentie <strong>${ticketNr}</strong>).
        Onze apotheker controleert uw recept, meestal binnen 24 uur op werkdagen.
        U ontvangt bericht zodra uw medicatie onderweg is.</p>
        <p>Vragen? Bel ons op 079 123 45 67.</p>
        <p>Met vriendelijke groet,<br/>Apotheek Zoetermeer</p>
      `,
    });

    return NextResponse.json({ ok: true, ticketNr });
  } catch (err) {
    console.error("Fout bij verwerken receptupload:", err);
    return NextResponse.json(
      { error: "Er ging iets mis bij het versturen. Probeer het opnieuw of bel ons." },
      { status: 500 }
    );
  }
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

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
