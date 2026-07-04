const steps = [
  {
    code: "01",
    title: "Recept insturen",
    body: "Upload een foto of PDF van uw recept, of laat uw arts het rechtstreeks doorsturen. U ontvangt direct een bevestiging.",
  },
  {
    code: "02",
    title: "Apotheker controleert",
    body: "Onze apotheker toetst het recept op juistheid, interacties en dosering — dezelfde controle als aan de balie.",
  },
  {
    code: "03",
    title: "Klaargemaakt & verpakt",
    body: "Uw medicatie wordt zorgvuldig klaargemaakt en discreet verpakt, met bijsluiter en eventueel doseeradvies.",
  },
  {
    code: "04",
    title: "Thuisbezorgd",
    body: "Bezorging bij u thuis in Zoetermeer en omgeving, met track & trace. Vragen? Onze apotheker is altijd bereikbaar.",
  },
];

export default function HoeHetWerkt() {
  return (
    <section id="hoe-het-werkt" className="bg-pine text-paper py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-xl mb-16">
          <span className="font-mono text-xs tracking-widest uppercase text-sage-light">
            Het proces
          </span>
          <h2 className="font-display text-3xl md:text-4xl mt-3">
            Van recept tot voordeur, in vier stempels
          </h2>
        </div>

        <div className="grid md:grid-cols-4 gap-px bg-paper/15 rounded-2xl overflow-hidden">
          {steps.map((s) => (
            <div key={s.code} className="bg-pine p-7 relative">
              <span className="font-mono text-xs text-clay-light block mb-8">
                {s.code}
              </span>
              <h3 className="font-display text-xl mb-3">{s.title}</h3>
              <p className="text-paper/70 text-sm leading-relaxed">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
