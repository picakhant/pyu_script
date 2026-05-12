import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Story from "@/components/Story";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen text-base-content flex flex-col relative overflow-hidden">
      {/* Main Content Wrapper */}
      <div className="relative z-10 w-full flex flex-col grow">
        <Navbar />

        <div className="grow overflow-x-hidden w-full flex flex-col">
          <Hero />
          <Story />
        </div>

        <Footer />
      </div>
    </main>
  );
}
