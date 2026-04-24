import ContactForm from "./components/ContactForm";
import Header from "./components/Header";
import HeroSlideshow from "./components/HeroSlideShow";
import RotatingWords from "./components/RotatingWords";
import Footer from "./components/Footer";
import Image from "next/image";

export default function HomePage() {
  return (
    <>
      <Header />

      <main className="min-h-screen">
        <HeroSlideshow />

        {/* SERVICES SECTION */}
        <section id="services" className="px-6 py-20 max-w-6xl mx-auto bg-gray-50">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Our Services</h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive insurance consulting services designed to help you navigate coverage options
              with confidence and clarity.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
            {/* Coverage Review */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-light rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">Coverage Review</h3>
              <p className="text-sm text-gray-600">
                Comprehensive analysis of your current policies to identify gaps, overlaps, and optimization opportunities.
              </p>
            </div>

            {/* Policy Optimization */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">Policy Optimization</h3>
              <p className="text-sm text-gray-600">
                Expert guidance through policy selection, terms explanation, and decision-making support for all insurance needs.
              </p>
            </div>

            {/* Compliance Support */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">Compliance Support</h3>
              <p className="text-sm text-gray-600">
                Stay compliant with evolving regulations. We help navigate complex requirements and documentation.
              </p>
            </div>

            {/* Claims Guidance */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">Claims Guidance</h3>
              <p className="text-sm text-gray-600">
                Expert assistance through the claims process, ensuring you receive the benefits you're entitled to.
              </p>
            </div>

            {/* Business Insurance Support */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-light rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">Business Insurance Support</h3>
              <p className="text-sm text-gray-600">
                Specialized consulting for employee benefits packages, group insurance, and workplace coverage solutions.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">
              Ready to get started? Contact us today for a free consultation.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 font-semibold text-white hover:bg-secondary transition-colors duration-200"
            >
              Get Started Today
            </a>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="px-6 py-20 max-w-6xl mx-auto bg-gray-50">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">About Us</h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                Beyond the Coverage is your trusted partner in navigating the complex world of insurance.
                We specialize in employee benefits consulting, providing personalized guidance to help
                individuals and families make informed decisions about their coverage options.
              </p>

              <p className="text-lg text-gray-700 leading-relaxed">
                With years of experience in the insurance industry, our team combines deep expertise
                with a genuine commitment to helping clients understand their options and move forward
                with confidence. We believe that everyone deserves access to comprehensive, affordable
                insurance coverage that meets their unique needs.
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-2">Our Mission</h3>
                  <p className="text-gray-600 text-sm">
                    To simplify insurance decisions and ensure every client has the coverage they need.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-2">Our Approach</h3>
                  <p className="text-gray-600 text-sm">
                    Personalized consultations with transparent, no-pressure guidance.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg overflow-hidden">
              <Image
                src="/images/SH - Headshot.jpg"
                alt="Sammy - Insurance Consultant"
                width={400}
                height={500}
                className="w-full h-auto object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Meet Sammy</h3>
              <p className="text-gray-600 text-sm">
                With years of dedicated experience in insurance consulting, Sammy is passionate about helping clients navigate complex coverage options with clarity and confidence.
              </p>
            </div>
          </div>
        </section>

        {/* PARTNERS SECTION */}
        <section id="partners" className="px-6 py-20 max-w-6xl mx-auto bg-white">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Our Partners</h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We work with leading insurance providers to offer you the best coverage options.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8 items-center">
            {/* Partner 1 - Cigna */}
            <div className="flex items-center justify-center p-4 grayscale hover:grayscale-0 hover:scale-105 transition-all duration-300">
              <div className="text-center">
                <div className="h-16 w-32 bg-gray-200 rounded-lg flex items-center justify-center mb-2">
                  <span className="text-lg font-bold text-gray-600">Cigna</span>
                </div>
              </div>
            </div>

            {/* Partner 2 - Kaiser */}
            <div className="flex items-center justify-center p-4 grayscale hover:grayscale-0 hover:scale-105 transition-all duration-300">
              <div className="text-center">
                <div className="h-16 w-32 bg-gray-200 rounded-lg flex items-center justify-center mb-2">
                  <span className="text-lg font-bold text-gray-600">Kaiser</span>
                </div>
              </div>
            </div>

            {/* Partner 3 - Chamber */}
            <div className="flex items-center justify-center p-4 grayscale hover:grayscale-0 hover:scale-105 transition-all duration-300">
              <div className="text-center">
                <div className="h-16 w-32 bg-gray-200 rounded-lg flex items-center justify-center mb-2">
                  <span className="text-lg font-bold text-gray-600">Chamber</span>
                </div>
              </div>
            </div>

            {/* Partner 4 - Blue Cross */}
            <div className="flex items-center justify-center p-4 grayscale hover:grayscale-0 hover:scale-105 transition-all duration-300">
              <div className="text-center">
                <div className="h-16 w-32 bg-gray-200 rounded-lg flex items-center justify-center mb-2">
                  <span className="text-lg font-bold text-gray-600">Blue Cross</span>
                </div>
              </div>
            </div>

            {/* Partner 5 - Aetna */}
            <div className="flex items-center justify-center p-4 grayscale hover:grayscale-0 hover:scale-105 transition-all duration-300">
              <div className="text-center">
                <div className="h-16 w-32 bg-gray-200 rounded-lg flex items-center justify-center mb-2">
                  <span className="text-lg font-bold text-gray-600">Aetna</span>
                </div>
              </div>
            </div>

            {/* Partner 6 - United */}
            <div className="flex items-center justify-center p-4 grayscale hover:grayscale-0 hover:scale-105 transition-all duration-300">
              <div className="text-center">
                <div className="h-16 w-32 bg-gray-200 rounded-lg flex items-center justify-center mb-2">
                  <span className="text-lg font-bold text-gray-600">United</span>
                </div>
              </div>
            </div>

            {/* Partner 7 - Humana */}
            <div className="flex items-center justify-center p-4 grayscale hover:grayscale-0 hover:scale-105 transition-all duration-300">
              <div className="text-center">
                <div className="h-16 w-32 bg-gray-200 rounded-lg flex items-center justify-center mb-2">
                  <span className="text-lg font-bold text-gray-600">Humana</span>
                </div>
              </div>
            </div>

            {/* Partner 8 - Anthem */}
            <div className="flex items-center justify-center p-4 grayscale hover:grayscale-0 hover:scale-105 transition-all duration-300">
              <div className="text-center">
                <div className="h-16 w-32 bg-gray-200 rounded-lg flex items-center justify-center mb-2">
                  <span className="text-lg font-bold text-gray-600">Anthem</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="px-6 py-20 max-w-6xl mx-auto bg-gray-50">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Get in Touch</h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Ready to find the perfect insurance coverage for your needs? We're here to help. Reach out today.
            </p>
          </div>
          <ContactForm />
        </section>
      </main>
      <Footer />
    </>
  );
}