import { Link } from 'react-router-dom'

const navItems = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#contact', label: 'Contact' },
]

export default function Header() {
  const handleNavClick = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      const el = document.querySelector(href)
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo" onClick={(e) => handleNavClick(e, '#home')}>
            <img src="/assets/images/logo1.png" alt="Geek Beauty Spa" className="logo-img" />
            <div className="logo-text"></div>
          </Link>
          <nav className="nav">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="nav-link"
                onClick={(e) => handleNavClick(e, item.href)}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="header-buttons">
            <Link to="/dashboard" className="btn btn-outline">Log In</Link>
            <Link to="/dashboard" className="btn btn-primary">Sign Up</Link>
          </div>
        </div>
      </div>
    </header>
  )
}
