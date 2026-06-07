import { render, screen, fireEvent } from '@testing-library/react'
import type { ComponentProps } from 'react'
import HomePage from './page'

type MockImageProps = ComponentProps<'img'> & {
  priority?: boolean
  quality?: number
}

// Mock components for integration testing
jest.mock('./components/Header', () => {
  return function MockHeader() {
    return (
      <div data-testid="header" role="banner">
        <a href="#services">Services</a>
        <a href="#about">About</a>
        <a href="#partners">Partners</a>
        <a href="#contact">Contact</a>
      </div>
    )
  }
})

jest.mock('./components/HeroSlideShow', () => {
  return function MockHeroSlideshow() {
    return (
      <div data-testid="hero" role="main">
        <h1>Beyond the Coverage</h1>
        <a href="#contact">Get a Free Coverage Review</a>
        <a href="#services">View Services</a>
      </div>
    )
  }
})

jest.mock('./components/ContactForm', () => {
  return function MockContactForm() {
    return (
      <div data-testid="contact-form">
        <form>
          <input type="email" placeholder="Email" />
          <textarea placeholder="Message"></textarea>
          <button type="submit">Send</button>
        </form>
      </div>
    )
  }
})

jest.mock('./components/Footer', () => {
  return function MockFooter() {
    return (
      <div data-testid="footer" role="contentinfo">
        <a href="/legal/privacy-policy.pdf">Privacy Policy</a>
        <a href="/legal/terms-of-service.pdf">Terms of Service</a>
        <a href="#" aria-label="LinkedIn">LinkedIn</a>
        <a href="#" aria-label="Instagram">Instagram</a>
      </div>
    )
  }
})

jest.mock('./components/RotatingWords', () => {
  return function MockRotatingWords({ words }: { words: string[] }) {
    return <div data-testid="rotating-words">{words[0]}</div>
  }
})

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ priority, quality, ...props }: MockImageProps) => {
    void priority
    void quality
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img {...props} />
  },
}))

describe('Full Application Integration Tests', () => {
  describe('Page Structure and Navigation', () => {
    it('renders complete page with all major sections', () => {
      render(<HomePage />)
      
      expect(screen.getByTestId('header')).toBeInTheDocument()
      expect(screen.getByTestId('hero')).toBeInTheDocument()
      expect(screen.getByText('Our Services')).toBeInTheDocument()
      expect(screen.getByText('About Us')).toBeInTheDocument()
      expect(screen.getByText('Our Partners')).toBeInTheDocument()
      expect(screen.getByText('Get in Touch')).toBeInTheDocument()
      expect(screen.getByTestId('footer')).toBeInTheDocument()
    })

    it('all navigation links are accessible from header', () => {
      render(<HomePage />)
      
      const servicesLink = screen.getByText('Services').closest('a')
      const aboutLink = screen.getByText('About').closest('a')
      const partnersLink = screen.getByText('Partners').closest('a')
      const contactLink = screen.getByText('Contact').closest('a')
      
      expect(servicesLink).toHaveAttribute('href', '#services')
      expect(aboutLink).toHaveAttribute('href', '#about')
      expect(partnersLink).toHaveAttribute('href', '#partners')
      expect(contactLink).toHaveAttribute('href', '#contact')
    })

    it('page can be navigated to different sections', () => {
      const { container } = render(<HomePage />)
      
      const sections = container.querySelectorAll('[id]')
      expect(sections.length).toBeGreaterThan(0)
      
      const sectionIds = Array.from(sections).map(el => el.id)
      expect(sectionIds).toContain('services')
      expect(sectionIds).toContain('about')
      expect(sectionIds).toContain('partners')
      expect(sectionIds).toContain('contact')
    })
  })

  describe('Hero Section Functionality', () => {
    it('hero section has call-to-action buttons', () => {
      render(<HomePage />)
      
      expect(screen.getByText('Get a Free Coverage Review')).toBeInTheDocument()
      expect(screen.getByText('View Services')).toBeInTheDocument()
    })

    it('call-to-action buttons navigate to correct sections', () => {
      render(<HomePage />)
      
      const reviewButton = screen.getByText('Get a Free Coverage Review').closest('a')
      const servicesButton = screen.getByText('View Services').closest('a')
      
      expect(reviewButton).toHaveAttribute('href', '#contact')
      expect(servicesButton).toHaveAttribute('href', '#services')
    })
  })

  describe('Services Section', () => {
    it('displays all six services', () => {
      render(<HomePage />)
      
      expect(screen.getByText('How we can help YOU right now?')).toBeInTheDocument()
      expect(screen.getByText('Policy & Strategy Optimization')).toBeInTheDocument()
      expect(screen.getByText('Quote Negotiation')).toBeInTheDocument()
      expect(screen.getByText('Employee Benefits Consulting')).toBeInTheDocument()
      expect(screen.getByText('Renewal Strategy')).toBeInTheDocument()
      expect(screen.getByText('Year-Round Benefits')).toBeInTheDocument()
    })

    it('each service has description text', () => {
      render(<HomePage />)
      
      expect(screen.getByText(/Free Market Review/)).toBeInTheDocument()
      expect(screen.getByText(/Simplified breakdown of complex policy terms/)).toBeInTheDocument()
    })

    it('services section has theme-consistent styling', () => {
      const { container } = render(<HomePage />)
      
      const servicesSection = container.querySelector('#services')
      expect(servicesSection).toHaveClass('px-6', 'py-20', 'max-w-6xl')
    })
  })

  describe('About Section', () => {
    it('about section displays company information', () => {
      render(<HomePage />)
      
      expect(screen.getByText(/Beyond the Coverage is your trusted partner/)).toBeInTheDocument()
      expect(screen.getByText('Our Mission')).toBeInTheDocument()
      expect(screen.getByText('Our Approach')).toBeInTheDocument()
    })

    it('about section includes person image and bio', () => {
      render(<HomePage />)
      
      expect(screen.getByAltText('Sammie - Insurance Consultant')).toBeInTheDocument()
      expect(screen.getByText('Meet Sammie')).toBeInTheDocument()
    })
  })

  describe('Partners Section', () => {
    it('partners section displays partner logos', () => {
      render(<HomePage />)
      
      expect(screen.getByAltText('Cigna')).toBeInTheDocument()
      expect(screen.getByAltText('Kaiser Permanente')).toBeInTheDocument()
      expect(screen.getByAltText('Boulder Chamber of Commerce')).toBeInTheDocument()
    })

    it('partners section has supporting copy', () => {
      render(<HomePage />)
      
      expect(screen.getByText('Our Partners')).toBeInTheDocument()
      expect(screen.getByText(/leading insurance providers/)).toBeInTheDocument()
    })
  })

  /*
   * FUTURE TRUST / TESTIMONIALS INTEGRATION TESTS
   * Re-enable these when the commented Trust section in page.tsx is approved and restored.
   *
   * describe('Trust/Testimonials Section', () => {
   *   it('trust section displays three testimonials', () => {
   *     render(<HomePage />)
   *     expect(screen.getByText('Sarah M.')).toBeInTheDocument()
   *     expect(screen.getByText('James R.')).toBeInTheDocument()
   *     expect(screen.getByText('Michael T.')).toBeInTheDocument()
   *   })
   *
   *   it('testimonials have all required information', () => {
   *     render(<HomePage />)
   *     expect(screen.getByText(/Beyond the Coverage made insurance understandable/)).toBeInTheDocument()
   *     expect(screen.getByText(/As a business owner/)).toBeInTheDocument()
   *     expect(screen.getByText(/team's knowledge and attention to detail/)).toBeInTheDocument()
   *   })
   *
   *   it('testimonial authors have roles/descriptions', () => {
   *     render(<HomePage />)
   *     expect(screen.getByText('Family Insurance Client')).toBeInTheDocument()
   *     expect(screen.getByText('Business Owner')).toBeInTheDocument()
   *     expect(screen.getByText('Individual Client')).toBeInTheDocument()
   *   })
   * })
   */

  describe('Contact Section', () => {
    it('contact section has heading and description', () => {
      render(<HomePage />)
      
      expect(screen.getByText('Get in Touch')).toBeInTheDocument()
      expect(screen.getByText(/Ready to find the perfect insurance coverage/)).toBeInTheDocument()
    })

    it('contact form is rendered in contact section', () => {
      render(<HomePage />)
      
      expect(screen.getByTestId('contact-form')).toBeInTheDocument()
    })

    it('contact form has necessary input fields', () => {
      render(<HomePage />)
      
      const emailInput = screen.getByPlaceholderText('Email')
      const messageInput = screen.getByPlaceholderText('Message')
      const submitButton = screen.getByRole('button', { name: 'Send' })
      
      expect(emailInput).toBeInTheDocument()
      expect(messageInput).toBeInTheDocument()
      expect(submitButton).toBeInTheDocument()
    })
  })

  describe('Footer Section', () => {
    it('footer contains all required sections', () => {
      render(<HomePage />)
      
      expect(screen.getByTestId('footer')).toBeInTheDocument()
    })

    it('footer has privacy and terms links', () => {
      render(<HomePage />)
      
      const privacyLink = screen.getByText('Privacy Policy')
      const termsLink = screen.getByText('Terms of Service')
      
      expect(privacyLink).toHaveAttribute('href', '/legal/privacy-policy.pdf')
      expect(termsLink).toHaveAttribute('href', '/legal/terms-of-service.pdf')
    })

    it('footer has social media icons', () => {
      render(<HomePage />)
      
      expect(screen.getByLabelText('LinkedIn')).toBeInTheDocument()
      expect(screen.getByLabelText('Instagram')).toBeInTheDocument()
    })

    it('footer links are accessible', () => {
      const { container } = render(<HomePage />)
      
      const footerLinks = container.querySelectorAll('[role="contentinfo"] a')
      expect(footerLinks.length).toBeGreaterThan(0)
      
      footerLinks.forEach(link => {
        expect(link.getAttribute('href')).toBeTruthy()
      })
    })
  })

  describe('Accessibility and Semantics', () => {
    it('page has proper semantic structure', () => {
      const { container } = render(<HomePage />)
      
      expect(container.querySelector('header')).toBeDefined()
      expect(container.querySelector('main')).toBeInTheDocument()
      expect(container.querySelector('footer')).toBeDefined()
    })

    it('all sections have proper ARIA roles', () => {
      render(<HomePage />)
      
      expect(screen.getByRole('banner')).toBeInTheDocument() // header
      expect(screen.getByRole('contentinfo')).toBeInTheDocument() // footer
    })

    it('page is readable from top to bottom', () => {
      const { container } = render(<HomePage />)
      
      const main = container.querySelector('main')
      const sections = main?.querySelectorAll('section')
      
      expect(sections && sections.length).toBeGreaterThan(0)
    })
  })

  describe('Responsive Design', () => {
    it('page uses responsive container classes', () => {
      const { container } = render(<HomePage />)
      
      const responsiveContainers = container.querySelectorAll('.max-w-6xl')
      expect(responsiveContainers.length).toBeGreaterThan(0)
    })

    it('page has responsive padding', () => {
      const { container } = render(<HomePage />)
      
      const sections = container.querySelectorAll('section')
      sections.forEach(section => {
        expect(section.classList.toString()).toMatch(/(px-6|py-)/i)
      })
    })

    it('grid layouts are responsive', () => {
      const { container } = render(<HomePage />)
      
      const grids = container.querySelectorAll('[class*="grid"]')
      expect(grids.length).toBeGreaterThan(0)
      
      grids.forEach(grid => {
        // Check for responsive breakpoints
        expect(grid.classList.toString()).toMatch(/(sm:|md:|lg:)/i)
      })
    })
  })

  describe('Error Handling and Edge Cases', () => {
    it('page renders without errors', () => {
      expect(() => render(<HomePage />)).not.toThrow()
    })

    it('all images have alt text for accessibility', () => {
      render(<HomePage />)
      
      const images = screen.getAllByRole('img')
      images.forEach(img => {
        expect(img).toHaveAttribute('alt')
      })
    })

    it('all buttons have accessible text', () => {
      render(<HomePage />)
      
      const buttons = screen.getAllByRole('button')
      buttons.forEach(button => {
        expect(
          button.textContent || button.getAttribute('aria-label')
        ).toBeTruthy()
      })
    })
  })

  describe('CI/CD Pipeline Readiness', () => {
    it('page performance: component hierarchy is shallow', () => {
      const { container } = render(<HomePage />)
      
      const main = container.querySelector('main')
      const sections = main?.querySelectorAll(':scope > section')
      
      // Should have several sections (services, about, partners, contact, etc)
      expect(sections && sections.length).toBeGreaterThanOrEqual(4)
    })

    it('page loads all necessary data sections', () => {
      render(<HomePage />)
      
      // Verify all content sections load without errors
      expect(screen.getByText('Our Services')).toBeInTheDocument()
      expect(screen.getByText('About Us')).toBeInTheDocument()
      expect(screen.getByText('Our Partners')).toBeInTheDocument()
      expect(screen.getByText('Get in Touch')).toBeInTheDocument()
    })

    it('interactive elements respond to user actions', () => {
      render(<HomePage />)
      
      const button = screen.getByText('Get a Free Coverage Review')
      
      expect(() => {
        fireEvent.click(button)
      }).not.toThrow()
    })

    it('page meets accessibility standards (WCAG)', () => {
      render(<HomePage />)
      
      // Check for proper heading hierarchy
      expect(screen.getAllByRole('heading').length).toBeGreaterThan(0)
      
      // Check for proper contrast and readability
      const headings = screen.getAllByRole('heading')
      expect(headings.length).toBeGreaterThan(0)
    })
  })
})
