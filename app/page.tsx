import ContactForm from "./components/ContactForm";
import Header from "./components/Header";
import HeroSlideshow from "./components/HeroSlideShow";
import FloatingLogo from "./components/FloatingLogo";

export default function HomePage() {
  return (
    <>
      <FloatingLogo />
      <Header />
      

    <main className="min-h-screen">
      <HeroSlideshow />
      <section className="px-6 py-24 max-w-6xl mx-auto">
        <p className="text-sm uppercase tracking-wide mb-4">
          Beyond the Coverage
        </p>
        <h1 className="text-4xl md:text-6xl font-bold max-w-3xl mb-6">
          Insurance guidance with a human touch
        </h1>
        <p className="text-lg max-w-2xl mb-8">
          Simple, clear support for individuals and families looking for better
          coverage options.
        </p>
        <a href="#contact" className="rounded border px-5 py-3 inline-block">
          Request a Quote
        </a>
      </section>

      <section className="px-6 py-16 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">About</h2>
        <p className="max-w-3xl">
          Beyond the Coverage helps clients understand their options and move
          forward with confidence.
        </p>
      </section>

      <section className="px-6 py-16 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">Services</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded border p-6">Coverage reviews</div>
          <div className="rounded border p-6">Policy guidance</div>
          <div className="rounded border p-6">Quote support</div>
        </div>
      </section>

      <section id="contact" className="px-6 py-16 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">Contact</h2>
        <ContactForm />
      </section>
    </main>
    </>
  );
}