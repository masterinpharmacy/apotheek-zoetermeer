# Apotheek Zoetermeer — website + online receptverwerking

Next.js 14 site met receptupload die via Resend een e-mail met bijlage naar de apotheek stuurt, plus automatische bevestiging naar de patiënt.

## Lokaal draaien

```bash
npm install
cp .env.example .env.local   # vul RESEND_API_KEY in
npm run dev
```

## Deployen (GitHub → Vercel → Resend), zelfde flow als je andere sites

1. **GitHub**: nieuwe repo aanmaken, deze map pushen.
2. **Vercel**: repo importeren, deploy.
3. **Resend**:
   - Account op resend.com, domein `apotheekzoetermeer.nl` toevoegen.
   - DNS-records (SPF/DKIM) bij Strato instellen — zelfde stap die bij Obrov nog openstond.
   - API key aanmaken.
4. **Vercel environment variables**: `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `APOTHEEK_INBOX_EMAIL` instellen (Project → Settings → Environment Variables), daarna opnieuw deployen.
5. Test de flow: stuur een testrecept in en controleer of zowel de apotheek-inbox als de patiënt-bevestiging binnenkomen.

## Belangrijk: dit is meer dan een website-project

Een recept online laten insturen en medicatie thuisbezorgen valt onder gereguleerde farmaceutische zorg. Voordat dit live gaat, in elk geval checken:

- **CIBG-registratie** van de apotheek voor internetverkoop van geneesmiddelen (verplicht logo/vermelding op de site).
- **IGJ-eisen**: o.a. verplichte mogelijkheid tot rechtstreeks contact met een apotheker (telefonisch/video) vóór aflevering bij twijfel.
- **Identiteitscontrole** bij aflevering, met name bij UR-geneesmiddelen (dit staat nu als tekst in het formulier, maar moet ook echt in het bezorgproces geborgd zijn).
- **AVG**: medische gegevens zijn een bijzondere persoonsgegevenscategorie — dataverwerkersovereenkomst met Resend, bewaartermijnen en een privacyverklaring zijn nodig, niet alleen een akkoordvinkje.
- **Uitsluiting van bepaalde middelen** van online aflevering (bv. sommige opioïden/BTM) — vaak apart afgehandeld, niet via een simpel uploadformulier.

Dit zijn zaken voor een jurist/compliance-check bij de KNMP of IGJ, niet iets wat de website zelf oplost — maar de site moet er wel op ingericht zijn (bijv. een duidelijk "spoed/twijfel → bel direct" pad, wat nu is toegevoegd).

## Volgende uitbreidingsstap (later, indien gewenst)

Nu: upload + e-mailnotificatie. Latere stap zou een koppeling met het apotheeksysteem (AIS/Pharmacom) kunnen zijn voor automatische statusupdates i.p.v. handmatige verwerking door het team.
