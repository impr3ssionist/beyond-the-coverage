import { fireEvent, render, screen } from '@testing-library/react'
import Header from './Header'

type MockImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  priority?: boolean
  quality?: number
}

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ alt = '', priority, quality, ...props }: MockImageProps) => {
    void priority
    void quality
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt={alt} {...props} />
  },
}))

describe('Header Component', () => {
  it('renders the logo as a home link', () => {
    render(<Header />)

    const logoLink = screen.getByAltText('Beyond the Coverage').closest('a')

    expect(logoLink).toHaveAttribute('href', '/')
  })

  it('renders desktop navigation links to current page sections', () => {
    render(<Header />)

    expect(screen.getAllByText('Services')[0].closest('a')).toHaveAttribute('href', '#services')
    expect(screen.getAllByText('About')[0].closest('a')).toHaveAttribute('href', '#about')
    expect(screen.getAllByText('Partners')[0].closest('a')).toHaveAttribute('href', '#partners')
    expect(screen.getAllByText('Contact')[0].closest('a')).toHaveAttribute('href', '#contact')
  })

  it('renders the desktop call to action', () => {
    render(<Header />)

    expect(screen.getAllByText('Get Started')[0].closest('a')).toHaveAttribute('href', '#contact')
  })

  it('opens and closes the mobile menu', () => {
    render(<Header />)

    fireEvent.click(screen.getByLabelText('Open navigation menu'))
    expect(screen.getByLabelText('Close navigation menu')).toBeInTheDocument()
    expect(screen.getAllByText('Partners')).toHaveLength(2)

    fireEvent.click(screen.getByLabelText('Close navigation menu'))
    expect(screen.queryByLabelText('Close navigation menu')).not.toBeInTheDocument()
  })

  it('closes the mobile menu when a mobile link is clicked', () => {
    render(<Header />)

    fireEvent.click(screen.getByLabelText('Open navigation menu'))
    fireEvent.click(screen.getAllByText('Services')[1])

    expect(screen.queryByLabelText('Close navigation menu')).not.toBeInTheDocument()
  })

  it('updates header state on scroll without losing navigation', () => {
    render(<Header />)

    Object.defineProperty(window, 'scrollY', {
      value: 50,
      configurable: true,
    })
    fireEvent.scroll(window)

    expect(screen.getByLabelText('Open navigation menu')).toBeInTheDocument()
    expect(screen.getAllByText('Contact')[0]).toBeInTheDocument()
  })
})
