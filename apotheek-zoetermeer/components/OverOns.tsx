export default function OverOns() {
  return (
    <section id="over-ons" className="py-24 bg-sage/25">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <span className="font-mono text-xs tracking-widest uppercase text-clay-dark">
            Over ons
          </span>
          <h2 className="font-display text-3xl md:text-4xl text-pine mt-3 mb-6">
            Uw apotheek in Zoetermeer, ook online
          </h2>
          <p className="text-ink/70 leading-relaxed mb-4">
            Apotheek Zoetermeer is een erkende openbare apotheek. Achter elk
            online ingestuurd recept staat hetzelfde team van apothekers en
            farmaceutisch consulenten dat u ook aan de balie treft.
          </p>
          <p className="text-ink/70 leading-relaxed">
            Persoonlijk advies blijft voorop staan: bij twijfel over een
            recept, interactie of bijwerking neemt onze apotheker altijd
            contact met u op — telefonisch of via videobellen.
          </p>
        </div>

        <div className="bg-white rounded-xl p-8 border border-pine/10">
          <h3 className="font-display text-xl text-pine mb-5">
            Openingstijden
          </h3>
          <ul className="font-mono text-sm text-ink/70 space-y-2.5">
            <li className="flex justify-between">
              <span>Maandag – vrijdag</span>
              <span>08:00 – 17:30</span>
            </li>
            <li className="flex justify-between">
              <span>Zaterdag</span>
              <span>09:00 – 13:00</span>
            </li>
            <li className="flex justify-between">
              <span>Zondag</span>
              <span>Gesloten</span>
            </li>
          </ul>
          <p className="text-xs text-ink/50 mt-5 pt-5 border-t border-pine/10">
            Voor spoedgevallen buiten openingstijden verwijzen wij u naar de
            dienstapotheek regio Zoetermeer.
          </p>
        </div>
      </div>
    </section>
  );
}
