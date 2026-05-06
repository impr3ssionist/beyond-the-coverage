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
              Comprehensive employee insurance consulting services designed to help you navigate coverage options
              with confidence and clarity.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Coverage Reviews - How we can help YOU right now? */}
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-light rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">How we can help YOU right now?</h3>
              <p className="text-sm text-gray-600 mb-4">
                Free Market Review — Beyond The Coverage offers an analysis of the market based on industry, size and contribution to your current plans. We will break down your current plans and compare them to other comparable companies of size and industry. We will help identify gaps within your offered plan and contribution strategy.
              </p>
              <p className="text-sm text-gray-600">
                Free Compliance Review — There are many ways to become out of compliance as an employer. We have created a short checklist to review the basic ways to ensure you are in compliance. We are happy to review this with you at any time, client or not.
              </p>
              <p className="text-sm text-primary font-medium mt-3">
                Complete the form below and we will be in touch.
              </p>
            </div>

            

            {/* Policy & Strategy Optimization */}
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">Policy & Strategy Optimization</h3>
              <p className="text-sm text-gray-600 mb-3">
                We go beyond the basics—helping you evaluate your coverage, understand the fine print, and make smarter decisions at every stage.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Simplified breakdown of complex policy terms</li>
                <li>• Strategic support in plan selection and evaluation</li>
                <li>• Ongoing guidance through claims and real-world use</li>
              </ul>
            </div>

            {/* Quote Negotiation */}
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Quote Negotiation</h3>
              <p className="text-gray-600 mb-4">
                Get more than just quotes—get leverage. Beyond The Coverage compares, negotiates, and positions your plan for the best possible outcome.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Compare multiple carriers and plan designs</li>
                <li>• Negotiate competitive rates and terms</li>
                <li>• Optimize costs without sacrificing coverage</li>
              </ul>
            </div>

            {/* Employee Benefits Consulting */}
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Employee Benefits Consulting</h3>
              <p className="text-gray-600 mb-4">
                We help you evaluate your options, understand your coverage, and build a benefits plan that actually fits your team and budget.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Plan design and strategy</li>
                <li>• Coverage and network evaluation</li>
                <li>• Employee education and support</li>
                <li>• Personalized one-on-one support to help your employees confidently choose the coverage that's right for them</li>
              </ul>
            </div>

            {/* Renewal Strategy */}
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-light rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Renewal Strategy</h3>
              <p className="text-gray-600 mb-4">
                We don't wait until renewal to act. Our proactive mid-year review helps identify opportunities early—so you're prepared, informed, and in control when renewal arrives.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Mid-year review to prevent surprises</li>
                <li>• Early market evaluation and strategy planning</li>
                <li>• Support in selecting the best-fit plan at renewal</li>
              </ul>
            </div>

            {/* Year-Round Benefits */}
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Year-Round Benefits</h3>
              <p className="text-gray-600 mb-4">
                We help you stay ahead—not just react—by actively managing your benefits and supporting your team throughout the year.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Regular plan reviews and strategy reviews to ensure plan optimization</li>
                <li>• Claims support</li>
                <li>• Ongoing guidance</li>
                <li>• Renewal support and guidance</li>
                <li>• Year round compliance Support and Compliance reminders</li>
              </ul>
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
                alt="Sammie - Insurance Consultant"
                width={400}
                height={500}
                className="w-full h-auto object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Meet Sammie</h3>
              <p className="text-gray-600 text-sm">
                With 7+ years of dedicated experience in insurance consulting, Sammie is passionate about helping clients navigate complex coverage options with clarity and confidence.
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Partner 1 - Cigna */}
            <div className="flex items-center justify-center p-6 bg-gray-50 rounded-lg hover:shadow-md transition-all duration-300 md:grayscale md:hover:grayscale-0">
              <div className="text-center">
                <div className="h-16 w-40 flex items-center justify-center">
                  <Image
                    src="/images/Cigna_Healthcare_Icon_12.png"
                    alt="Cigna"
                    width={140}
                    height={64}
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Partner 2 - Kaiser */}
            <div className="flex items-center justify-center p-6 bg-gray-50 rounded-lg hover:shadow-md transition-all duration-300 md:grayscale md:hover:grayscale-0">
              <div className="text-center">
                <div className="h-16 w-40 flex items-center justify-center">
                  <Image
                    src="/images/Kaiser_Permanente_id620tjNzS_2.png"
                    alt="Kaiser Permanente"
                    width={140}
                    height={64}
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Partner 3 - Boulder Chamber */}
            <div className="flex items-center justify-center p-6 bg-gray-50 rounded-lg hover:shadow-md transition-all duration-300 md:grayscale md:hover:grayscale-0">
              <div className="text-center">
                <div className="h-16 w-40 flex items-center justify-center">
                  <Image
                    src="/images/bouldercoclogo.png"
                    alt="Boulder Chamber of Commerce"
                    width={140}
                    height={64}
                    className="w-full h-auto object-contain"
                  />
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