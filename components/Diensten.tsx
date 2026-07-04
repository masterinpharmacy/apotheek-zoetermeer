const diensten = [
  {
    title: "Herhaalrecepten",
    body: "Vaste medicatie automatisch laten herhalen en thuisbezorgd, zonder dat u er telkens naar hoeft te vragen.",
  },
  {
    title: "Nieuwe recepten",
    body: "Direct vanaf de huisarts of specialist ontvangen en dezelfde dag nog verwerkt, indien vóór 15:00 binnen.",
  },
  {
    title: "Medicatiebegeleiding",
    body: "Persoonlijk advies over interacties, bijwerkingen en inname — telefonisch of via een videobelafspraak.",
  },
  {
    title: "Baxterverpakking",
    body: "Medicatie per innamemoment verpakt in rolcontainers, handig bij meerdere medicijnen per dag.",
  },
];

export default function Diensten() {
  return (
    <section id="diensten" className="py-24 bg-paper">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-xl mb-16">
          <span className="font-mono text-xs tracking-widest uppercase text-clay-dark">
            Diensten
          </span>
          <h2 className="font-display text-3xl md:text-4xl text-pine mt-3">
            Meer dan alleen bezorgen
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {diensten.map((d) => (
            <div
              key={d.title}
              className="bg-white rounded-xl p-8 border border-pine/10 hover:border-clay/30 transition-colors"
            >
              <h3 className="font-display text-xl text-pine mb-3">
                {d.title}
              </h3>
              <p className="text-ink/70 text-sm leading-relaxed">{d.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
