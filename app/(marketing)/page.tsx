import { Footer } from "./_components/footer";
import Hero from "./_components/hero";
import Navbar from "./_components/navbar";
import { Pricing } from "./_components/pricing";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="relative overflow-hidden p-4" >
        <Hero />
        <Pricing />
        <Footer />
      </div>
    </div>
  );
}
