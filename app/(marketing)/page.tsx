import Hero from "./_components/hero";
import Navbar from "./_components/navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="relative overflow-hidden" >
        <Hero />
      </div>
    </div>
  );
}
