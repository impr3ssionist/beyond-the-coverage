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
                href="https://instagram.com"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-primary/10 hover:bg-primary hover:scale-110 transition-all duration-300 flex items-center justify-center group border border-primary/20 hover:border-primary"
              >
                <svg className="w-5 h-5 text-primary group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.137 18.163 20 14.418 20 10c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
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
          <p className="text-xs text-gray-600 mt-2">
            Built by <span className="text-primary/80">The Human Algorithm</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
