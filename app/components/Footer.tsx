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
                src="/images/beyondtc_logo.png"
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
                <a href="#partners" className="text-gray-400 hover:text-primary transition-all duration-200 inline-flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Partners
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
                <a href="/legal/privacy-policy.pdf" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-all duration-200 inline-flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/legal/terms-of-service.pdf" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-all duration-200 inline-flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/legal/website-disclaimer.pdf" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-all duration-200 inline-flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Website Disclaimer
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
                href="https://instagram.com"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-primary/10 hover:bg-primary hover:scale-110 transition-all duration-300 flex items-center justify-center group border border-primary/20 hover:border-primary"
              >
                <svg className="w-5 h-5 text-primary group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
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
              <a href="/legal/privacy-policy.pdf" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors duration-200">
                Privacy Policy
              </a>
              <span className="text-gray-600">•</span>
              <a href="/legal/terms-of-service.pdf" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors duration-200">
                Terms of Service
              </a>
              <span className="text-gray-600">•</span>
              <a href="/legal/website-disclaimer.pdf" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors duration-200">
                Website Disclaimer
              </a>
            </div>
          </div>
        </div>

        {/* Optional: Back to top button or newsletter signup could go here */}
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-xs text-gray-500">
            Designed with care for your insurance peace of mind.
          </p>
          <p className="text-xs text-gray-600 mt-2">
            Built by <span className="text-primary/80">The Human Algorithm</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
