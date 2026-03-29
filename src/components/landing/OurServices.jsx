const services = [
  { icon: '✂️', title: 'Haircut and Styling', desc: 'Expert haircuts designed to suit you.' },
  { icon: '💄', title: 'MakeUp', desc: 'Flawless makeup, fast look your best in just 30 minutes.' },
  { icon: '💅', title: 'Manicure & Pedicure', desc: 'Pamper yourself with our manicure & pedicure services that will bring sensational results.' },
  { icon: '✨', title: 'Skin Care', desc: 'We offer a full range of relaxing skin care services, including all types of facials.' },
  { icon: '🌿', title: 'Body Treatment', desc: 'Relax, refresh, and renew with our professional body treatments.' },
  { icon: '💆', title: 'Massage', desc: 'Relax your body and mind after a long, busy day with our massage services.' },
]

export default function OurServices() {
  return (
    <section id="services" className="our-services">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title-center">Our Services</h2>
          <p className="section-subtitle-center">Discover expert hair, skin, and spa treatments in one perfect place.</p>
        </div>
        <div className="services-grid">
          {services.map((s, i) => (
            <div key={i} className="service-card">
              <div className="service-icon">{s.icon}</div>
              <h3 className="service-title">{s.title}</h3>
              <p className="service-description">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
