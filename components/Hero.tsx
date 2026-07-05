export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-24 md:pt-24 md:pb-32 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <span className="inline-block font-mono text-xs tracking-widest uppercase text-clay-dark bg-clay/10 px-3 py-1.5 rounded-full mb-6">
            Erkende apotheek · Zoetermeer
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-pine mb-6">
            Uw recept insturen.
            <br />
            <span className="italic font-light">Wij regelen de rest.</span>
          </h1>
          <p className="text-ink/75 text-lg leading-relaxed mb-8 max-w-md">
            Stuur uw recept online in, onze apothekers controleren en
            bereiden het klaar, en we bezorgen uw medicijnen thuis in
            Zoetermeer en omstreken.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#recept-uploaden"
              className="inline-flex items-center bg-pine text-paper px-7 py-3.5 rounded-full font-semibold hover:bg-pine-light transition-colors"
            >
              Recept insturen
            </a>
            <a
              href="#hoe-het-werkt"
              className="inline-flex items-center px-7 py-3.5 rounded-full font-semibold text-pine border-2 border-pine/20 hover:border-pine/40 transition-colors"
            >
              Hoe het werkt
            </a>
          </div>
        </div>

        {/* Het receptticket — signature visual */}
        <div className="relative mx-auto max-w-sm w-full">
          <div className="bg-white perforated-edge perforated-edge-bottom shadow-xl rounded-md px-7 py-8 relative rotate-[1.5deg]">
            <div className="flex items-center justify-between mb-6 border-b border-dashed border-pine/20 pb-4">
              <div>
                <p className="font-mono text-[10px] tracking-widest text-ink/50 uppercase">
                  Receptstrook
                </p>
                <p className="font-display text-lg text-pine">
                  Apotheek Zoetermeer
                </p>
              </div>
              <div className="stamp text-clay w-16 h-16 flex items-center justify-center rotate-[-8deg]">
                <span className="font-mono text-[9px] font-bold leading-tight text-center">
                  ONTVANGEN
                </span>
              </div>
            </div>

            <ul className="space-y-3 font-mono text-xs text-ink/70">
              <li className="flex justify-between">
                <span>01 · Ingestuurd</span>
                <span className="text-pine">✓</span>
              </li>
              <li className="flex justify-between">
                <span>02 · Gecontroleerd</span>
                <span className="text-pine">✓</span>
              </li>
              <li className="flex justify-between">
                <span>03 · Onderweg</span>
                <span className="text-clay">●</span>
              </li>
              <li className="flex justify-between text-ink/35">
                <span>04 · Bezorgd</span>
                <span>○</span>
              </li>
            </ul>

            <div className="mt-6 pt-4 border-t border-dashed border-pine/20 flex items-center justify-between">
              <span className="font-mono text-[10px] text-ink/40">
                NR. 2026-0417
              </span>
              <span className="font-mono text-[10px] text-ink/40">
                ± 24 UUR
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
