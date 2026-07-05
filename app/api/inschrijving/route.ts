import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const APOTHEEK_INBOX = process.env.APOTHEEK_INBOX_EMAIL || "info@apotheekzoetermeer.nl";
const AFZENDER = process.env.RESEND_FROM_EMAIL || "Apotheek Zoetermeer <info@apotheekzoetermeer.nl>";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const naam = String(formData.get("naam") || "").trim();
    const geboortedatum = String(formData.get("geboortedatum") || "").trim();
    const bsn = String(formData.get("bsn") || "").trim();
    const adres = String(formData.get("adres") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const telefoon = String(formData.get("telefoon") || "").trim();
    const huisarts = String(formData.get("huisarts") || "").trim();
    const vorigeApotheek = String(formData.get("vorigeApotheek") || "").trim();
    const zorgverzekeraar = String(formData.get("zorgverzekeraar") || "").trim();
    const polisnummer = String(formData.get("polisnummer") || "").trim();
    const akkoord = formData.get("akkoord");

    if (!naam || !geboortedatum || !bsn || !adres || !email || !telefoon || !zorgverzekeraar || !polisnummer || !akkoord) {
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

    await resend.emails.send({
      from: AFZENDER,
      to: APOTHEEK_INBOX,
      reply_to: email,
      subject: `Nieuwe inschrijving — ${naam}`,
      html: `
        <h2>Nieuwe patiëntinschrijving</h2>
        <table cellpadding="6">
          <tr><td><strong>Naam</strong></td><td>${escapeHtml(naam)}</td></tr>
          <tr><td><strong>Geboortedatum</strong></td><td>${escapeHtml(geboortedatum)}</td></tr>
          <tr><td><strong>BSN</strong></td><td>${escapeHtml(bsn)}</td></tr>
          <tr><td><strong>Adres</strong></td><td>${escapeHtml(adres)}</td></tr>
          <tr><td><strong>E-mail</strong></td><td>${escapeHtml(email)}</td></tr>
          <tr><td><strong>Telefoon</strong></td><td>${escapeHtml(telefoon)}</td></tr>
          <tr><td><strong>Huisarts</strong></td><td>${escapeHtml(huisarts || "—")}</td></tr>
          <tr><td><strong>Vorige apotheek</strong></td><td>${escapeHtml(vorigeApotheek || "—")}</td></tr>
          <tr><td><strong>Zorgverzekeraar</strong></td><td>${escapeHtml(zorgverzekeraar)}</td></tr>
          <tr><td><strong>Polisnummer</strong></td><td>${escapeHtml(polisnummer)}</td></tr>
        </table>
      `,
    });

    await resend.emails.send({
      from: AFZENDER,
      to: email,
      subject: "Uw inschrijving bij Apotheek Zoetermeer is ontvangen",
      html: `
        <p>Beste ${escapeHtml(naam)},</p>
        <p>We hebben uw inschrijving ontvangen. Indien u overstapt van een
        andere apotheek, vragen wij met uw toestemming uw medicatiegegevens
        bij hen op. U ontvangt bericht zodra uw inschrijving is verwerkt.</p>
        <p>Met vriendelijke groet,<br/>Apotheek Zoetermeer</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Fout bij verwerken inschrijving:", err);
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
