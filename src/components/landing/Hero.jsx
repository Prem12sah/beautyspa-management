import { Link } from 'react-router-dom'

export default function Hero() {
  const scrollToServices = (e) => {
    e.preventDefault()
    document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              We are expert in <span className="highlight">Pedicure & Manicure</span>
            </h1>
            <p className="hero-description">
              From hairdressing and makeup to eyebrow, eyelash, and soothing massage services, our experts are dedicated to enhancing your beauty and relaxation.
            </p>
            <a href="#services" className="btn btn-outline-large" onClick={scrollToServices}>
              Explore Our Services
            </a>
          </div>
          <div className="hero-images">
            <div className="image-collage">
              <div className="image-circle image-1"></div>
              <div className="image-circle image-2"></div>
              <div className="image-circle image-3"></div>
              <div className="decorative-circle circle-1"></div>
              <div className="decorative-circle circle-2"></div>
              <div className="decorative-square square-1"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
