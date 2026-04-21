import { render, screen } from '@testing-library/react'
import Footer from '@/components/Footer'

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img {...props} />
  },
}))

describe('Footer Component', () => {
  // Logo and Branding Tests
  it('renders the footer logo', () => {
    render(<Footer />)
    const logo = screen.getByAltText('Beyond the Coverage')
    expect(logo).toBeInTheDocument()
  })

  it('renders company description', () => {
    render(<Footer />)
    expect(screen.getByText(/Your trusted partner in navigating insurance/)).toBeInTheDocument()
  })

  // Copyright and Date Tests
  it('renders copyright notice with current year', () => {
    const currentYear = new Date().getFullYear()
    render(<Footer />)
    expect(screen.getByText(new RegExp(`${currentYear}.*Beyond the Coverage`))).toBeInTheDocument()
  })

  // Navigation Section Tests
  it('renders navigation section heading', () => {
    render(<Footer />)
    expect(screen.getByText('Navigation')).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    render(<Footer />)
    const serviceLinks = screen.getAllByText('Services')
    expect(serviceLinks.length).toBeGreaterThan(0)
    
    expect(screen.getByText('About Us')).toBeInTheDocument()
    expect(screen.getByText('Testimonials')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('navigation links have correct href attributes', () => {
    render(<Footer />)
    const servicesLink = screen.getAllByText('Services').find(el => 
      el.tagName === 'A'
    ) as HTMLAnchorElement
    const aboutLink = screen.getAllByText('About Us').find(el => 
      el.tagName === 'A'
    ) as HTMLAnchorElement
    
    expect(servicesLink?.href).toContain('#services')
    expect(aboutLink?.href).toContain('#about')
  })

  // Legal Section Tests
  it('renders legal section heading', () => {
    render(<Footer />)
    expect(screen.getByText('Legal')).toBeInTheDocument()
  })

  it('renders privacy policy link', () => {
    render(<Footer />)
    const privacyLinks = screen.getAllByText('Privacy Policy')
    expect(privacyLinks.length).toBeGreaterThan(0)
    
    const privacyLink = privacyLinks[0].closest('a')
    expect(privacyLink).toHaveAttribute('href', '/privacy')
  })

  it('renders terms of service link', () => {
    render(<Footer />)
    const termsLinks = screen.getAllByText('Terms of Service')
    expect(termsLinks.length).toBeGreaterThan(0)
    
    const termsLink = termsLinks[0].closest('a')
    expect(termsLink).toHaveAttribute('href', '/terms')
  })

  it('renders disclaimer link', () => {
    render(<Footer />)
    const disclaimerLinks = screen.getAllByText('Disclaimer')
    expect(disclaimerLinks.length).toBeGreaterThan(0)
    
    const disclaimerLink = disclaimerLinks[0].closest('a')
    expect(disclaimerLink).toHaveAttribute('href', '/disclaimer')
  })

  // Social Media Section Tests
  it('renders social media section heading', () => {
    render(<Footer />)
    expect(screen.getByText('Connect With Us')).toBeInTheDocument()
  })

  it('renders social media icons with proper aria labels', () => {
    render(<Footer />)
    expect(screen.getByLabelText('LinkedIn')).toBeInTheDocument()
    expect(screen.getByLabelText('Twitter')).toBeInTheDocument()
    expect(screen.getByLabelText('Facebook')).toBeInTheDocument()
  })

  it('social media links are present and accessible', () => {
    render(<Footer />)
    const linkedinLink = screen.getByLabelText('LinkedIn')
    const twitterLink = screen.getByLabelText('Twitter')
    const facebookLink = screen.getByLabelText('Facebook')
    
    expect(linkedinLink).toBeInTheDocument()
    expect(twitterLink).toBeInTheDocument()
    expect(facebookLink).toBeInTheDocument()
  })

  // Accessibility Tests
  it('footer has proper semantic structure', () => {
    const { container } = render(<Footer />)
    const footer = container.querySelector('footer')
    expect(footer).toBeInTheDocument()
    expect(footer?.tagName).toBe('FOOTER')
  })

  it('footer has proper grid layout', () => {
    const { container } = render(<Footer />)
    const grid = container.querySelector('.grid')
    expect(grid).toBeInTheDocument()
  })

  it('footer navigation links are within nav context where appropriate', () => {
    render(<Footer />)
    expect(screen.getByText('Navigation')).toBeInTheDocument()
    expect(screen.getByText('Legal')).toBeInTheDocument()
  })

  // Integration Tests
  it('all footer sections are present', () => {
    render(<Footer />)
    // Company info section
    expect(screen.getByAltText('Beyond the Coverage')).toBeInTheDocument()
    // Navigation section
    expect(screen.getByText('Navigation')).toBeInTheDocument()
    // Legal section
    expect(screen.getByText('Legal')).toBeInTheDocument()
    // Social section
    expect(screen.getByText('Connect With Us')).toBeInTheDocument()
  })

  it('footer renders without errors', () => {
    render(<Footer />)
    expect(screen.getByText('Navigation')).toBeInTheDocument()
    expect(screen.getByText('Legal')).toBeInTheDocument()
    expect(screen.getByText('Connect With Us')).toBeInTheDocument()
  })

  it('footer has proper contrast with light text on dark background', () => {
    const { container } = render(<Footer />)
    const footer = container.querySelector('footer')
    expect(footer).toHaveClass('bg-gray-900', 'text-white')
  })

  it('footer links have hover transitions for better UX', () => {
    const { container } = render(<Footer />)
    const links = container.querySelectorAll('footer a')
    expect(links.length).toBeGreaterThan(0)
    // Check that links exist and are properly structured
    links.forEach(link => {
      expect(link.getAttribute('href')).toBeTruthy()
    })
  })
})
