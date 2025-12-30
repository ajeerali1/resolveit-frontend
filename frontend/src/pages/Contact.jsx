import { useState } from 'react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState(null)

  const handleChange = (e) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }))

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'Name is required.'
    if (!form.email.trim()) next.email = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email.'
    if (!form.message.trim()) next.message = 'Please enter a message.'
    return next
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus(null)
    const next = validate()
    if (Object.keys(next).length) return setErrors(next)
    setErrors({})
    try {
      // Placeholder: wire to real API when available
      await new Promise((r) => setTimeout(r, 700))
      setStatus({ ok: true, message: 'Message sent — we will reply shortly.' })
      setForm({ name: '', email: '', message: '' })
    } catch (err) {
      setStatus({ ok: false, message: 'Failed to send message. Try again later.' })
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="mx-auto max-w-4xl px-6 py-16">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-slate-900">Contact Us</h1>
          <p className="mt-2 text-sm text-slate-600">
            Have a question or need help? Send us a message and our support team will get back to you.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Send us a message</h2>
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div>
                <Input label="Name" name="name" value={form.name} onChange={handleChange} />
                {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
              </div>

              <div>
                <Input label="Email" name="email" type="email" value={form.email} onChange={handleChange} />
                {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={6}
                  className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
                {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message}</p>}
              </div>

              <div>
                <Button type="submit" className="w-full">Send message</Button>
              </div>

              {status && (
                <div className={`mt-2 rounded-md p-3 text-sm ${status.ok ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-700'}`}>
                  {status.message}
                </div>
              )}
            </form>
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-900">Contact details</h3>
              <p className="mt-2 text-sm text-slate-600">For general inquiries and support:</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                <li>
                  <strong>Email:</strong> support@resolveit.com
                </li>
                <li>
                  <strong>Phone:</strong> +1 (555) 123-4567
                </li>
                <li>
                  <strong>Address:</strong> 123 Main St, Suite 400, Anytown, USA
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-900">Support hours</h3>
              <p className="mt-2 text-sm text-slate-600">Mon–Fri: 9:00 AM — 6:00 PM</p>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  )
}
