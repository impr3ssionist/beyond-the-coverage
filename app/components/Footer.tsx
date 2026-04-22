import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16 border-t border-primary/20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Main Grid Section */}
        <div className="grid gap-12 md:grid-cols-4 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/images/BeyondTC_Logo_White.webp"
                alt="Beyond the Coverage"
                width={80}
                height={80}
                className="h-12 w-auto"
              />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your trusted partner in navigating insurance with confidence and clarity.
            </p>
            <p className="text-xs text-gray-500 pt-2 border-t border-gray-700">
              Making insurance simple, one conversation at a time.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-primary to-secondary rounded"></span>
              Navigation
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#services" className="text-gray-400 hover:text-primary transition-all duration-200 inline-flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Services
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-400 hover:text-primary transition-all duration-200 inline-flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  About Us
                </a>
              </li>
              <li>
                <a href="#trust" className="text-gray-400 hover:text-primary transition-all duration-200 inline-flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-primary transition-all duration-200 inline-flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-accent to-primary rounded"></span>
              Legal
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="/privacy" className="text-gray-400 hover:text-primary transition-all duration-200 inline-flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-gray-400 hover:text-primary transition-all duration-200 inline-flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/disclaimer" className="text-gray-400 hover:text-primary transition-all duration-200 inline-flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Disclaimer
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-secondary to-accent rounded"></span>
              Connect With Us
            </h3>
            <div className="flex gap-4">
              <a
                href="https://linkedin.com"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-primary/10 hover:bg-primary hover:scale-110 transition-all duration-300 flex items-center justify-center group border border-primary/20 hover:border-primary"
              >
                <svg className="w-5 h-5 text-primary group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M16.337 0H3.663A3.667 3.667 0 000 3.663v12.674A3.667 3.667 0 003.663 20h12.674A3.667 3.667 0 0020 16.337V3.663A3.667 3.667 0 0016.337 0zM6.017 15.5H3.633V7.5h2.384v8zm-1.192-9.284a1.384 1.384 0 110-2.768 1.384 1.384 0 010 2.768zM16.5 15.5h-2.384v-3.768c0-.9-.016-2.057-1.253-2.057-1.254 0-1.447.98-1.447 1.991v3.834h-2.384V7.5h2.291v.977h.031c.32-.605 1.1-1.242 2.265-1.242 2.422 0 2.87 1.594 2.87 3.672v4.593z" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                aria-label="Twitter"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-primary/10 hover:bg-primary hover:scale-110 transition-all duration-300 flex items-center justify-center group border border-primary/20 hover:border-primary"
              >
                <svg className="w-5 h-5 text-primary group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M18.244 2.478c.646.477.965 1.229.965 2.027 0 .138-.003.277-.01.414.678.498 1.272 1.081 1.777 1.74-1.242-.547-2.58-.916-3.997-1.107 1.694 1.017 2.97 2.614 3.61 4.563-.808-.505-1.693-.884-2.647-1.137 1.192 1.412 1.894 3.233 1.894 5.277 0 4.824-3.92 8.744-8.744 8.744-1.526 0-2.976-.386-4.236-1.069 1.38.167 2.783-.047 4.124-.641-2.322-.715-4.243-2.63-5.3-5.09 1.009.305 2.06.254 3.138-.148-2.506-.77-4.417-3.227-4.417-6.155 0-.028.001-.056.003-.084 1.025.568 2.154.888 3.372.937C2.854 5.86 1.738 3.826 1.738 1.53 1.738.76 1.859.013 2.082.012 4.246 0 6.19 1.124 7.28 2.893 8.39 1.47 9.777.54 11.338.54c1.21 0 2.35.398 3.279 1.069-.208-1.12-.78-2.124-1.569-2.877.789.119 1.56.317 2.306.591z" />
                </svg>
              </a>
              <a
                href="https://facebook.com"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-primary/10 hover:bg-primary hover:scale-110 transition-all duration-300 flex items-center justify-center group border border-primary/20 hover:border-primary"
              >
                <svg className="w-5 h-5 text-primary group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M20 10.063C20 4.51 15.523 0 10 0S0 4.51 0 10.063c0 5.025 3.679 9.18 8.472 9.901v-7.02h-2.55V10.06h2.55V7.853c0-2.521 1.5-3.915 3.804-3.915 1.101 0 2.255.196 2.255.196v2.48h-1.27c-1.252 0-1.64.777-1.64 1.576v1.893h2.793l-.446 2.884h-2.347v7.02C16.321 19.243 20 15.088 20 10.063z" />
                </svg>
              </a>
            </div>
            <p className="text-xs text-gray-500 mt-4 pt-4 border-t border-gray-700">
              Follow us on social media for industry insights and updates.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p className="text-gray-400">
              &copy; {currentYear} <span className="text-primary font-semibold">Beyond the Coverage</span>. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="/privacy" className="text-gray-400 hover:text-primary transition-colors duration-200">
                Privacy Policy
              </a>
              <span className="text-gray-600">•</span>
              <a href="/terms" className="text-gray-400 hover:text-primary transition-colors duration-200">
                Terms of Service
              </a>
              <span className="text-gray-600">•</span>
              <a href="/disclaimer" className="text-gray-400 hover:text-primary transition-colors duration-200">
                Disclaimer
              </a>
            </div>
          </div>
        </div>

        {/* Optional: Back to top button or newsletter signup could go here */}
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-xs text-gray-500">
            Designed with care for your insurance peace of mind.
          </p>
        </div>
      </div>
    </footer>
  );
}
