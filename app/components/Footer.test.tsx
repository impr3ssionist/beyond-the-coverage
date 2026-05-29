import { render, screen } from '@testing-library/react'
import Footer from './Footer'

type MockImageProps = React.ImgHTMLAttributes<HTMLImageElement>

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ alt = '', ...props }: MockImageProps) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt={alt} {...props} />
  },
}))

describe('Footer Component', () => {
  it('renders company identity and description', () => {
    render(<Footer />)

    expect(screen.getByAltText('Beyond the Coverage')).toBeInTheDocument()
    expect(screen.getByText(/trusted partner in navigating insurance/i)).toBeInTheDocument()
  })

  it('renders current section navigation links', () => {
    render(<Footer />)

    expect(screen.getByRole('link', { name: /services/i })).toHaveAttribute('href', '#services')
    expect(screen.getByRole('link', { name: /about us/i })).toHaveAttribute('href', '#about')
    expect(screen.getByRole('link', { name: /partners/i })).toHaveAttribute('href', '#partners')
    expect(screen.getByRole('link', { name: /^contact$/i })).toHaveAttribute('href', '#contact')
  })

  it('renders legal PDF links', () => {
    render(<Footer />)

    expect(screen.getAllByRole('link', { name: /privacy policy/i })[0]).toHaveAttribute(
      'href',
      '/legal/privacy-policy.pdf'
    )
    expect(screen.getAllByRole('link', { name: /terms of service/i })[0]).toHaveAttribute(
      'href',
      '/legal/terms-of-service.pdf'
    )
    expect(screen.getAllByRole('link', { name: /website disclaimer/i })[0]).toHaveAttribute(
      'href',
      '/legal/website-disclaimer.pdf'
    )
  })

  it('renders available social links', () => {
    render(<Footer />)

    expect(screen.getByLabelText('LinkedIn')).toHaveAttribute('href', 'https://linkedin.com')
    expect(screen.getByLabelText('Instagram')).toHaveAttribute('href', 'https://instagram.com')
  })

  it('renders copyright with the current year', () => {
    const { container } = render(<Footer />)

    expect(container.querySelector('footer')).toHaveTextContent(
      `${new Date().getFullYear()} Beyond the Coverage`
    )
  })

  it('uses the expected footer layout shell', () => {
    const { container } = render(<Footer />)

    expect(container.querySelector('footer')).toHaveClass('text-white', 'py-16')
    expect(container.querySelector('.grid')).toHaveClass('md:grid-cols-4')
  })
})
