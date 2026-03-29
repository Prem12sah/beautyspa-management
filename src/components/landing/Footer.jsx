import { Link } from 'react-router-dom'


export default function Footer() {
  const scrollTo = (e, id) => {
    e.preventDefault()
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-column">
            <h4 className="footer-title">Contact Us</h4>
            <div className="footer-contact">
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <span>Kathmandu, Nepal</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <span>+977 98xxxxxxx</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">✉️</span>
                <span>tgeekbeautyspa@gmail.com</span>
              </div>
            </div>
          </div>
          <div className="footer-column">
            <h4 className="footer-title">Quick Link</h4>
            <ul className="footer-links">
              <li><a href="#home" onClick={(e) => scrollTo(e, '#home')}>Home</a></li>
              <li><a href="#about" onClick={(e) => scrollTo(e, '#about')}>About Us</a></li>
              <li><a href="#services" onClick={(e) => scrollTo(e, '#services')}>Services</a></li>
              <li><a href="#pricing" onClick={(e) => scrollTo(e, '#pricing')}>Pricing</a></li>
              <li><a href="#contact" onClick={(e) => scrollTo(e, '#contact')}>Contact</a></li>
              <li><Link to="/admin" style={{ color: 'var(--white)', textDecoration: 'none' }}>Admin</Link></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4 className="footer-title">Follow Us</h4>
            <div className="social-links">
              <a href="#" className="social-link facebook">f</a>
              <a href="#" className="social-link instagram">📷</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>©2026 Geek Beauty Spa. All rights reserved. Powered By Geek Tech Solutions</p>
        </div>
      </div>
    </footer>
  )
}
