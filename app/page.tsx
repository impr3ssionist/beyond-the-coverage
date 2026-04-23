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

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Coverage Reviews */}
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-light rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Coverage Reviews</h3>
              <p className="text-gray-600 mb-4">
                Comprehensive analysis of your current insurance policies to identify gaps,
                overlaps, and opportunities for better coverage.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Policy comparison and optimization</li>
                <li>• Coverage gap identification</li>
                <li>• Cost-benefit analysis</li>
              </ul>
            </div>

            {/* Policy Guidance */}
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Policy Guidance</h3>
              <p className="text-gray-600 mb-4">
                Expert guidance through policy selection, terms explanation, and
                decision-making support for all types of insurance needs.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Policy terms explanation</li>
                <li>• Decision-making support</li>
                <li>• Claims process guidance</li>
              </ul>
            </div>

            {/* Quote Support */}
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Quote Support</h3>
              <p className="text-gray-600 mb-4">
                Streamlined quote comparison and negotiation assistance to help you
                find the best rates and coverage for your budget.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Multi-carrier quote comparison</li>
                <li>• Rate negotiation support</li>
                <li>• Budget optimization</li>
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
                Specialized consulting for employee benefits packages, group insurance,
                and workplace coverage solutions.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Group policy analysis</li>
                <li>• Employee education</li>
                <li>• Benefits optimization</li>
              </ul>
            </div>

            {/* Family Coverage Planning */}
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-light rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Family Coverage Planning</h3>
              <p className="text-gray-600 mb-4">
                Comprehensive family insurance planning including life, health,
                disability, and long-term care coverage options.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Family needs assessment</li>
                <li>• Multi-policy coordination</li>
                <li>• Future planning support</li>
              </ul>
            </div>

            {/* Ongoing Support */}
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Ongoing Support</h3>
              <p className="text-gray-600 mb-4">
                Continuous support with policy reviews, claims assistance, and
                coverage adjustments as your needs evolve.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Annual policy reviews</li>
                <li>• Claims assistance</li>
                <li>• Coverage updates</li>
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

        {/* TRUST SECTION */}
        <section id="trust" className="px-6 py-20 max-w-6xl mx-auto bg-gray-50">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Why Our Clients Trust Us</h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our commitment to excellence and client success has built strong relationships with hundreds of satisfied clients.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Testimonial 1 */}
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-8 rounded-lg border border-primary/20 hover:border-primary/40 transition-colors">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "Beyond the Coverage made insurance understandable for the first time. Their personalized approach saved us thousands."
              </p>
              <p className="font-semibold text-gray-900">Sarah M.</p>
              <p className="text-sm text-gray-600">Family Insurance Client</p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-8 rounded-lg border border-primary/20 hover:border-primary/40 transition-colors">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "As a business owner, having expert benefits consulting support has been invaluable for our employees."
              </p>
              <p className="font-semibold text-gray-900">James R.</p>
              <p className="text-sm text-gray-600">Business Owner</p>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-8 rounded-lg border border-primary/20 hover:border-primary/40 transition-colors">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "The team's knowledge and attention to detail gave me confidence that I have the right coverage."
              </p>
              <p className="font-semibold text-gray-900">Michael T.</p>
              <p className="text-sm text-gray-600">Individual Client</p>
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