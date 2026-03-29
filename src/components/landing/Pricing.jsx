import { PRICING_SERVICES } from '../../constants'

export default function Pricing() {
  const scrollToContact = (e, serviceId) => {
    e.preventDefault()
    const contact = document.querySelector('#contact')
    contact?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setTimeout(() => {
      const select = document.getElementById('service')
      if (select && serviceId) select.value = serviceId
    }, 500)
  }

  return (
    <section id="pricing" className="pricing">
      <div className="container">
        <h2 className="pricing-title">Pricing</h2>
        <div className="pricing-cards-container">
          <div className="pricing-cards">
            {PRICING_SERVICES.map((p) => (
              <div key={p.id} className="pricing-card">
                <div className="pricing-icon-wrapper">
                  <div className="pricing-icon">{p.icon}</div>
                </div>
                <h3 className="pricing-card-title">{p.name}</h3>
                <p className="pricing-card-description">{p.desc}</p>
                <div className="pricing-info">
                  <span className="pricing-price">Rs. {p.price.toLocaleString()}</span>
                  <div className="pricing-duration">
                    <span className="clock-icon-small">🕐</span>
                    <span>{p.duration}</span>
                  </div>
                </div>
                <a href="#contact" className="btn btn-pricing" onClick={(e) => scrollToContact(e, p.id)}>
                  Book Now
                </a>
              </div>
            ))}
          </div>
        </div>
        <div className="pricing-decorative">
          <div className="pricing-circle-1"></div>
          <div className="pricing-circle-2"></div>
        </div>
      </div>
    </section>
  )
}
