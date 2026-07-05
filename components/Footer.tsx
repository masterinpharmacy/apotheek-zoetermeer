export default function Footer() {
  return (
    <footer id="contact" className="bg-pine-dark text-paper/80 py-16">
      <div className="max-w-6xl mx-auto px-6 grid sm:grid-cols-3 gap-10">
        <div>
          <span className="font-display text-xl text-paper">
            Apotheek Zoetermeer
          </span>
          <p className="text-sm mt-3 leading-relaxed text-paper/60">
            Dorpsstraat 12
            <br />
            2712 AB Zoetermeer
          </p>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-sage-light mb-3">
            Contact
          </p>
          <p className="text-sm space-y-1.5">
            <a href="tel:+31791234567" className="block hover:text-paper">
              079 123 45 67
            </a>
            <a
              href="mailto:info@apotheekzoetermeer.nl"
              className="block hover:text-paper"
            >
              info@apotheekzoetermeer.nl
            </a>
          </p>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-sage-light mb-3">
            Erkenning
          </p>
          <p className="text-sm text-paper/60 leading-relaxed">
            Geregistreerd bij het CIBG en onder toezicht van de IGJ.
            UZI/AGB-code op aanvraag.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-12 pt-6 border-t border-paper/10 text-xs text-paper/40 flex flex-wrap justify-between gap-3">
        <span>© {new Date().getFullYear()} Apotheek Zoetermeer</span>
        <span>Privacyverklaring · Algemene voorwaarden</span>
      </div>
    </footer>
  );
}
