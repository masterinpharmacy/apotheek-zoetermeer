import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HoeHetWerkt from "@/components/HoeHetWerkt";
import Diensten from "@/components/Diensten";
import UploadForm from "@/components/UploadForm";
import OverOns from "@/components/OverOns";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <HoeHetWerkt />
      <Diensten />

      <section id="recept-uploaden" className="py-24 bg-paper">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-xl mb-14 mx-auto text-center">
            <span className="font-mono text-xs tracking-widest uppercase text-clay-dark">
              Recept insturen
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-pine mt-3">
              Stuur uw recept veilig in
            </h2>
            <p className="text-ink/60 mt-3 text-sm">
              Duurt minder dan twee minuten. Uw gegevens worden versleuteld
              verzonden.
            </p>
          </div>
          <UploadForm />
        </div>
      </section>

      <OverOns />
      <Footer />
    </main>
  );
}
