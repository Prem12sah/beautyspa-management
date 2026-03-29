import { useState } from 'react'
import { STORAGE_KEYS, SERVICE_NAMES, SERVICE_IDS, MOCK_SERVICES } from '../../constants'

const serviceOptions = [
  { value: 'haircut', label: 'Haircut and Styling' },
  { value: 'makeup', label: 'MakeUp' },
  { value: 'manicure-pedicure', label: 'Manicure & Pedicure' },
  { value: 'skincare', label: 'Skin Care' },
  { value: 'body-treatment', label: 'Body Treatment' },
  { value: 'massage', label: 'Massage' },
]

export default function BookService() {
  const [form, setForm] = useState({ service: '', fullName: '', email: '', phone: '', date: '', notes: '' })

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { service, fullName, email, phone, date, notes } = form
    if (!service || !fullName || !email || !phone || !date) {
      alert('Please fill in all required fields.')
      return
    }
    const svc = MOCK_SERVICES.find((s) => s.id === (SERVICE_IDS[service] || service))
    const booking = {
      id: 'b_' + Date.now(),
      serviceId: SERVICE_IDS[service] || service,
      serviceName: SERVICE_NAMES[service] || service,
      amount: svc?.price || 0,
      date,
      time: '',
      notes: notes || '',
      customerName: fullName,
      customerEmail: email,
      customerPhone: phone,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    }
    const stored = localStorage.getItem(STORAGE_KEYS.bookings)
    const bookings = stored ? JSON.parse(stored) : []
    bookings.unshift(booking)
    localStorage.setItem(STORAGE_KEYS.bookings, JSON.stringify(bookings))
    localStorage.setItem(STORAGE_KEYS.profile, JSON.stringify({ name: fullName, email, phone }))
    alert('Thank you! Your booking has been submitted. View it in your dashboard.')
    setForm({ service: '', fullName: '', email: '', phone: '', date: '', notes: '' })
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <section id="contact" className="book-service">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title-center">Book a Service</h2>
          <p className="section-subtitle-center">Fill out the form below to book your appointment</p>
        </div>
        <form className="booking-form" id="bookingForm" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group full-width">
              <label htmlFor="service">Select Service</label>
              <select id="service" name="service" required value={form.service} onChange={handleChange}>
                <option value="">Choose a service</option>
                {serviceOptions.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input type="text" id="fullName" name="fullName" required value={form.fullName} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required value={form.email} onChange={handleChange} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input type="tel" id="phone" name="phone" required value={form.phone} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="date">Preferred Date</label>
              <input type="date" id="date" name="date" required min={today} value={form.date} onChange={handleChange} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group full-width">
              <label htmlFor="notes">Additional Notes</label>
              <textarea id="notes" name="notes" rows="4" placeholder="Any Special requirements or notes...." value={form.notes} onChange={handleChange} />
            </div>
          </div>
          <div className="form-submit">
            <button type="submit" className="btn btn-primary-large">Submit Booking</button>
          </div>
        </form>
      </div>
    </section>
  )
}
