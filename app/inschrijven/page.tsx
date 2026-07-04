import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InschrijfForm from "@/components/InschrijfForm";

export default function InschrijvenPage() {
  return (
    <main>
      <Header />

      <section className="py-20 md:py-28 bg-paper">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-xl mb-14 mx-auto text-center">
            <span className="font-mono text-xs tracking-widest uppercase text-clay-dark">
              Nieuwe patiënt
            </span>
            <h1 className="font-display text-3xl md:text-4xl text-pine mt-3">
              Schrijf u in bij Apotheek Zoetermeer
            </h1>
            <p className="text-ink/60 mt-3 text-sm">
              Stapt u over van een andere apotheek? Wij vragen uw
              medicatiegegevens dan met uw toestemming bij hen op.
            </p>
          </div>
          <InschrijfForm />
        </div>
      </section>

      <Footer />
    </main>
  );
}
