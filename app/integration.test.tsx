import { fireEvent, render, screen, waitFor } from '@testing-library/react'
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

describe('Application Integration', () => {
  beforeEach(() => {
    global.fetch = jest.fn()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('renders navigable sections from top to bottom', () => {
    const { container } = render(<HomePage />)

    expect(screen.getAllByRole('link', { name: /^services$/i })[0]).toHaveAttribute('href', '#services')
    expect(screen.getAllByRole('link', { name: /^partners$/i })[0]).toHaveAttribute('href', '#partners')
    expect(container.querySelector('main > #services')).toBeInTheDocument()
    expect(container.querySelector('main > #about')).toBeInTheDocument()
    expect(container.querySelector('main > #partners')).toBeInTheDocument()
    expect(container.querySelector('main > #contact')).toBeInTheDocument()
  })

  it('submits the contact form to the contact API and resets on success', async () => {
    const fetchMock = jest.mocked(global.fetch)
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    } as Response)

    render(<HomePage />)

    fireEvent.change(screen.getByLabelText('Full name'), {
      target: { value: 'Ada Lovelace' },
    })
    fireEvent.change(screen.getByLabelText('Company name'), {
      target: { value: 'Analytical Engines LLC' },
    })
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'ada@example.com' },
    })
    fireEvent.change(screen.getByLabelText('Phone'), {
      target: { value: '555-123-4567' },
    })
    fireEvent.change(screen.getByLabelText('Number of Employees'), {
      target: { value: '11-50' },
    })
    fireEvent.change(screen.getByLabelText('How can we help?'), {
      target: { value: 'Please review our current benefits package.' },
    })

    fireEvent.click(screen.getByRole('button', { name: /request a quote/i }))

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: 'Ada Lovelace',
          company_name: 'Analytical Engines LLC',
          email: 'ada@example.com',
          phone: '555-123-4567',
          number_of_employees: '11-50',
          message: 'Please review our current benefits package.',
        }),
      })
    })

    expect(await screen.findByText('Thanks. We will be in touch.')).toBeInTheDocument()
    expect(screen.getByLabelText('Full name')).toHaveValue('')
  })

  it('keeps validation client-side for messages that are too short', async () => {
    const fetchMock = jest.mocked(global.fetch)

    render(<HomePage />)

    fireEvent.change(screen.getByLabelText('How can we help?'), {
      target: { value: 'Hi' },
    })
    fireEvent.click(screen.getByRole('button', { name: /request a quote/i }))

    expect(await screen.findByText('Please enter a more detailed message.')).toBeInTheDocument()
    expect(fetchMock).not.toHaveBeenCalled()
  })
})
