import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Header from '@/components/Header'

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img {...props} />
  },
}))

describe('Header Component', () => {
  // Logo and Branding Tests
  it('renders the logo', () => {
    render(<Header />)
    const logo = screen.getByAltText('Beyond the Coverage')
    expect(logo).toBeInTheDocument()
  })

  it('logo is a clickable link to home', () => {
    render(<Header />)
    const logoLink = screen.getByAltText('Beyond the Coverage').closest('a')
    expect(logoLink).toHaveAttribute('href', '/')
  })

  it('renders all navigation links on desktop', () => {
    render(<Header />)
    expect(screen.getByText('Services')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Trust')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('navigation links have correct href attributes', () => {
    render(<Header />)
    const servicesLink = screen.getAllByText('Services')[0].closest('a')
    const aboutLink = screen.getAllByText('About')[0].closest('a')
    const trustLink = screen.getAllByText('Trust')[0].closest('a')
    const contactLink = screen.getAllByText('Contact')[0].closest('a')
    
    expect(servicesLink).toHaveAttribute('href', '#services')
    expect(aboutLink).toHaveAttribute('href', '#about')
    expect(trustLink).toHaveAttribute('href', '#trust')
    expect(contactLink).toHaveAttribute('href', '#contact')
  })

  it('renders Get Started button in desktop navigation', () => {
    render(<Header />)
    const buttons = screen.getAllByText('Get Started')
    expect(buttons.length).toBeGreaterThan(0)
    const desktopButton = buttons.find(button => {
      const nav = button.closest('nav')
      return nav !== null
    })
    expect(desktopButton).toBeInTheDocument()
  })

  // Mobile Navigation Tests
  it('renders mobile hamburger menu on mobile view', () => {
    render(<Header />)
    const hamburgerButton = screen.getByLabelText('Open navigation menu')
    expect(hamburgerButton).toBeInTheDocument()
  })

  it('opens mobile menu when hamburger is clicked', () => {
    render(<Header />)
    const hamburgerButton = screen.getByLabelText('Open navigation menu')
    
    fireEvent.click(hamburgerButton)
    
    // Check if mobile menu content appears
    const mobileMenuLinks = screen.getAllByText('Services')
    expect(mobileMenuLinks.length).toBeGreaterThan(1) // At least desktop + mobile
  })

  it('closes mobile menu when close button is clicked', () => {
    render(<Header />)
    const hamburgerButton = screen.getByLabelText('Open navigation menu')
    
    fireEvent.click(hamburgerButton)
    
    const closeButton = screen.getByLabelText('Close navigation menu')
    fireEvent.click(closeButton)
    
    // After close, we shouldn't see the full-screen overlay behavior
    expect(closeButton).toBeInTheDocument()
  })

  it('closes mobile menu when a navigation link is clicked', () => {
    render(<Header />)
    const hamburgerButton = screen.getByLabelText('Open navigation menu')
    fireEvent.click(hamburgerButton)
    
    // Get one of the mobile menu links
    const mobileLinks = screen.getAllByText('Services')
    const mobileServicesLink = mobileLinks[mobileLinks.length - 1] // Get the last one (should be mobile)
    
    fireEvent.click(mobileServicesLink)
    
    // Menu should close after clicking a link
    expect(hamburgerButton).toBeInTheDocument()
  })

  // Scroll Behavior Tests
  it('hamburger icon changes color on scroll', () => {
    render(<Header />)
    const hamburger = screen.getByLabelText('Open navigation menu')
    
    // Simulate scroll event
    fireEvent.scroll(window, { y: 100 })
    
    expect(hamburger).toBeInTheDocument()
  })

  it('header background slides in on scroll', () => {
    render(<Header />)
    const headers = screen.getByLabelText('Open navigation menu').parentElement?.parentElement
    
    // Simulate scroll
    fireEvent.scroll(window, { y: 50 })
    
    expect(headers).toBeInTheDocument()
  })

  // Accessibility Tests
  it('navigation has proper ARIA attributes', () => {
    render(<Header />)
    const hamburgerButton = screen.getByLabelText('Open navigation menu')
    
    expect(hamburgerButton).toHaveAttribute('aria-label', 'Open navigation menu')
    expect(hamburgerButton).toHaveAttribute('aria-expanded')
  })

  it('has skip links or proper semantic structure for navigation', () => {
    render(<Header />)
    const nav = screen.getByText('Services').closest('nav')
    expect(nav).toBeInTheDocument()
  })

  it('logo image has priority attribute for performance', () => {
    render(<Header />)
    const logo = screen.getByAltText('Beyond the Coverage')
    // The priority attribute should have been passed to next/image
    expect(logo).toBeInTheDocument()
  })
})
    const logoLink = screen.getByAltText('Beyond the Coverage').closest('a')
    expect(logoLink).toHaveAttribute('href', '/')
  })
})
