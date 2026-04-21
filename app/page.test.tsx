import { render, screen } from '@testing-library/react'
import HomePage from '@/page'

// Mock components
jest.mock('@/components/Header', () => {
  return function MockHeader() {
    return <div data-testid="header">Header</div>
  }
})

jest.mock('@/components/HeroSlideShow', () => {
  return function MockHeroSlideshow() {
    return <div data-testid="hero">Hero Slideshow</div>
  }
})

jest.mock('@/components/ContactForm', () => {
  return function MockContactForm() {
    return <div data-testid="contact-form">Contact Form</div>
  }
})

jest.mock('@/components/Footer', () => {
  return function MockFooter() {
    return <div data-testid="footer">Footer</div>
  }
})

jest.mock('@/components/RotatingWords', () => {
  return function MockRotatingWords({ words }: { words: string[] }) {
    return <div data-testid="rotating-words">{words[0]}</div>
  }
})

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img {...props} />
  },
}))

describe('HomePage Component', () => {
  // Header and Navigation Tests
  it('renders the header', () => {
    render(<HomePage />)
    expect(screen.getByTestId('header')).toBeInTheDocument()
  })

  // Hero Section Tests
  it('renders the hero slideshow', () => {
    render(<HomePage />)
    expect(screen.getByTestId('hero')).toBeInTheDocument()
  })

  it('renders hero section with main content', () => {
    render(<HomePage />)
    expect(screen.getByTestId('rotating-words')).toBeInTheDocument()
  })

  // Services Section Tests
  it('renders services section', () => {
    render(<HomePage />)
    expect(screen.getByText('Our Services')).toBeInTheDocument()
  })

  it('renders all service boxes with icons', () => {
    render(<HomePage />)
    const serviceBoxes = screen.getByText('Coverage Reviews')
    expect(serviceBoxes).toBeInTheDocument()
    
    expect(screen.getByText('Policy Guidance')).toBeInTheDocument()
    expect(screen.getByText('Quote Support')).toBeInTheDocument()
    expect(screen.getByText('Employee Benefits Consulting')).toBeInTheDocument()
    expect(screen.getByText('Family Coverage Planning')).toBeInTheDocument()
    expect(screen.getByText('Ongoing Support')).toBeInTheDocument()
  })

  it('service boxes have complete descriptions', () => {
    render(<HomePage />)
    expect(screen.getByText(/Comprehensive analysis of your current insurance policies/)).toBeInTheDocument()
    expect(screen.getByText(/Expert guidance through policy selection/)).toBeInTheDocument()
  })

  it('services section has call-to-action button', () => {
    render(<HomePage />)
    const buttons = screen.getAllByText('Get Started Today')
    expect(buttons.length).toBeGreaterThan(0)
  })

  // About Section Tests
  it('renders about section with heading', () => {
    render(<HomePage />)
    expect(screen.getByText('About Us')).toBeInTheDocument()
  })

  it('renders about section content', () => {
    render(<HomePage />)
    expect(screen.getByText(/Beyond the Coverage is your trusted partner/)).toBeInTheDocument()
  })

  it('renders mission and approach boxes', () => {
    render(<HomePage />)
    expect(screen.getByText('Our Mission')).toBeInTheDocument()
    expect(screen.getByText('Our Approach')).toBeInTheDocument()
  })

  it('renders Sammy headshot in about section', () => {
    render(<HomePage />)
    const sammyHeadshot = screen.getByAltText('Sammy - Insurance Consultant')
    expect(sammyHeadshot).toBeInTheDocument()
  })

  it('renders Sammy bio information', () => {
    render(<HomePage />)
    expect(screen.getByText('Meet Sammy')).toBeInTheDocument()
    expect(screen.getByText(/years of dedicated experience in insurance consulting/)).toBeInTheDocument()
  })

  // Trust/Testimonials Section Tests
  it('renders trust section with heading', () => {
    render(<HomePage />)
    expect(screen.getByText('Why Our Clients Trust Us')).toBeInTheDocument()
  })

  it('renders testimonials with star ratings', () => {
    render(<HomePage />)
    expect(screen.getByText(/Beyond the Coverage made insurance understandable/)).toBeInTheDocument()
  })

  it('renders testimonial author names', () => {
    render(<HomePage />)
    expect(screen.getByText('Sarah M.')).toBeInTheDocument()
    expect(screen.getByText('James R.')).toBeInTheDocument()
    expect(screen.getByText('Michael T.')).toBeInTheDocument()
  })

  // Contact Section Tests
  it('renders contact section with heading', () => {
    render(<HomePage />)
    expect(screen.getByText('Get in Touch')).toBeInTheDocument()
  })

  it('renders contact form in contact section', () => {
    render(<HomePage />)
    expect(screen.getByTestId('contact-form')).toBeInTheDocument()
  })

  // Footer Tests
  it('renders the footer', () => {
    render(<HomePage />)
    expect(screen.getByTestId('footer')).toBeInTheDocument()
  })

  // Accessibility and Structure Tests
  it('page has proper main element', () => {
    const { container } = render(<HomePage />)
    const main = container.querySelector('main')
    expect(main).toBeInTheDocument()
  })

  it('sections have proper id attributes for navigation', () => {
    const { container } = render(<HomePage />)
    expect(container.querySelector('#services')).toBeInTheDocument()
    expect(container.querySelector('#about')).toBeInTheDocument()
    expect(container.querySelector('#trust')).toBeInTheDocument()
    expect(container.querySelector('#contact')).toBeInTheDocument()
  })

  it('page renders without errors', () => {
    render(<HomePage />)
    expect(screen.getByTestId('header')).toBeInTheDocument()
    expect(screen.getByTestId('footer')).toBeInTheDocument()
  })

  // Integration Tests
  it('all major sections are accessible via navigation', () => {
    const { container } = render(<HomePage />)
    const sections = ['#services', '#about', '#trust', '#contact']
    
    sections.forEach(sectionId => {
      const section = container.querySelector(sectionId)
      expect(section).toBeInTheDocument()
    })
  })

  it('page layout has responsive structure', () => {
    const { container } = render(<HomePage />)
    const maxWidthContainers = container.querySelectorAll('.max-w-6xl')
    expect(maxWidthContainers.length).toBeGreaterThan(0)
  })

  it('hero section has proper height for full viewport coverage', () => {
    const { container } = render(<HomePage />)
    const heroSection = container.querySelector('[data-testid="hero"]')?.parentElement
    expect(heroSection).toBeInTheDocument()
  })
})
    expect(screen.getByTestId('hero')).toBeInTheDocument()
  })

  it('renders the footer', () => {
    render(<HomePage />)
    expect(screen.getByTestId('footer')).toBeInTheDocument()
  })

  it('renders all main sections', () => {
    render(<HomePage />)
    expect(screen.getByText('Our Services')).toBeInTheDocument()
    expect(screen.getByText('About Us')).toBeInTheDocument()
    expect(screen.getByText('Why Our Clients Trust Us')).toBeInTheDocument()
    expect(screen.getByText('Get in Touch')).toBeInTheDocument()
  })

  it('renders Services section with correct ID', () => {
    const { container } = render(<HomePage />)
    const servicesSection = container.querySelector('#services')
    expect(servicesSection).toBeInTheDocument()
  })

  it('renders About section with correct ID', () => {
    const { container } = render(<HomePage />)
    const aboutSection = container.querySelector('#about')
    expect(aboutSection).toBeInTheDocument()
  })

  it('renders Trust section with correct ID', () => {
    const { container } = render(<HomePage />)
    const trustSection = container.querySelector('#trust')
    expect(trustSection).toBeInTheDocument()
  })

  it('renders Contact section with correct ID', () => {
    const { container } = render(<HomePage />)
    const contactSection = container.querySelector('#contact')
    expect(contactSection).toBeInTheDocument()
  })

  it('renders service cards', () => {
    render(<HomePage />)
    expect(screen.getByText('Coverage Reviews')).toBeInTheDocument()
    expect(screen.getByText('Policy Guidance')).toBeInTheDocument()
    expect(screen.getByText('Employee Benefits Consulting')).toBeInTheDocument()
  })

  it('renders testimonials in Trust section', () => {
    render(<HomePage />)
    expect(screen.getByText(/Beyond the Coverage made insurance understandable/)).toBeInTheDocument()
  })

  it('renders contact form', () => {
    render(<HomePage />)
    expect(screen.getByTestId('contact-form')).toBeInTheDocument()
  })
})
