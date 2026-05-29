import { render, screen } from '@testing-library/react'
import HomePage from './page'

type MockImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  fill?: boolean
  priority?: boolean
  quality?: number
}

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ alt = '', fill, priority, quality, ...props }: MockImageProps) => {
    void fill
    void priority
    void quality
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt={alt} {...props} />
  },
}))

describe('HomePage Component', () => {
  it('renders the page shell', () => {
    const { container } = render(<HomePage />)

    expect(container.querySelector('main')).toBeInTheDocument()
    expect(screen.getAllByAltText('Beyond the Coverage')).toHaveLength(2)
    expect(screen.getByText('Get in Touch')).toBeInTheDocument()
  })

  it('renders current service cards', () => {
    render(<HomePage />)

    expect(screen.getByText('How we can help YOU right now?')).toBeInTheDocument()
    expect(screen.getByText('Policy & Strategy Optimization')).toBeInTheDocument()
    expect(screen.getByText('Quote Negotiation')).toBeInTheDocument()
    expect(screen.getByText('Employee Benefits Consulting')).toBeInTheDocument()
    expect(screen.getByText('Renewal Strategy')).toBeInTheDocument()
    expect(screen.getByText('Year-Round Benefits')).toBeInTheDocument()
  })

  it('renders service details and calls to action', () => {
    render(<HomePage />)

    expect(screen.getAllByText(/Free Market Review/i).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText(/Free Compliance Review/i).length).toBeGreaterThanOrEqual(1)
    expect(screen.getByRole('link', { name: /get started today/i })).toHaveAttribute('href', '#contact')
  })

  it('renders about content and Sammie bio', () => {
    render(<HomePage />)

    expect(screen.getByRole('heading', { name: 'About Us' })).toBeInTheDocument()
    expect(screen.getByText(/Beyond the Coverage is your trusted partner/i)).toBeInTheDocument()
    expect(screen.getByText('Our Mission')).toBeInTheDocument()
    expect(screen.getByText('Our Approach')).toBeInTheDocument()
    expect(screen.getByAltText('Sammie - Insurance Consultant')).toBeInTheDocument()
    expect(screen.getByText('Meet Sammie')).toBeInTheDocument()
  })

  it('renders partner logos for the current partners section', () => {
    render(<HomePage />)

    expect(screen.getByText('Our Partners')).toBeInTheDocument()
    expect(screen.getByAltText('Cigna')).toBeInTheDocument()
    expect(screen.getByAltText('Kaiser Permanente')).toBeInTheDocument()
    expect(screen.getByAltText('Boulder Chamber of Commerce')).toBeInTheDocument()
  })

  it('renders contact form fields', () => {
    render(<HomePage />)

    expect(screen.getByRole('heading', { name: /get a free market review/i })).toBeInTheDocument()
    expect(screen.getByLabelText('Full name')).toBeInTheDocument()
    expect(screen.getByLabelText('Company name')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Phone')).toBeInTheDocument()
    expect(screen.getByLabelText('Number of Employees')).toBeInTheDocument()
    expect(screen.getByLabelText('How can we help?')).toBeInTheDocument()
  })

  it('exposes section ids used by navigation', () => {
    const { container } = render(<HomePage />)

    expect(container.querySelector('#services')).toBeInTheDocument()
    expect(container.querySelector('#about')).toBeInTheDocument()
    expect(container.querySelector('#partners')).toBeInTheDocument()
    expect(container.querySelector('#contact')).toBeInTheDocument()
  })
})
