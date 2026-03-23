import { Toaster } from "@/components/ui/sonner";
import About from "./components/About";
import AdminView from "./components/AdminView";
import AiSolutions from "./components/AiSolutions";
import BpoServices from "./components/BpoServices";
import CertificateVerification from "./components/CertificateVerification";
import ChatBot from "./components/ChatBot";
import Contact from "./components/Contact";
import Curriculum from "./components/Curriculum";
import Footer from "./components/Footer";
import ForBusinesses from "./components/ForBusinesses";
import FreeDemo from "./components/FreeDemo";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import Instructor from "./components/Instructor";
import Navbar from "./components/Navbar";
import Pricing from "./components/Pricing";
import Programs from "./components/Programs";
import Projects from "./components/Projects";
import ReviewModal from "./components/ReviewModal";
import Testimonials from "./components/Testimonials";

const isAdmin =
  typeof window !== "undefined" && window.location.search.includes("admin");

export default function App() {
  if (isAdmin) {
    return <AdminView />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <FreeDemo />
      <main>
        <Hero />
        <About />
        <Programs />
        <HowItWorks />
        <Curriculum />
        <Instructor />
        <Pricing />
        <BpoServices />
        <AiSolutions />
        <Projects />
        <Testimonials />
        <CertificateVerification />
        <ForBusinesses />
        <Contact />
      </main>
      <Footer />
      <Toaster position="top-right" />
      <ChatBot />
      <ReviewModal />
    </div>
  );
}
