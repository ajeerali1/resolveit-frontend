import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import Button from '../components/ui/Button'

const faqs = [
  {
    question: 'How do I submit a support request?',
    answer: 'Choose your category, add details and attachments, and submit. A specialist will respond quickly.',
  },
  {
    question: 'Do I need an account to get help?',
    answer: 'General support and pre-sales questions are public. Dashboard features require an account.',
  },
  {
    question: 'How fast do you respond?',
    answer: 'Most questions receive a first response within one business hour during support hours.',
  },
]

const categories = [
  { name: 'Account & Access', description: 'Login issues, invitations, and permissions.' },
  { name: 'Vendors', description: 'Onboarding, verification, and payouts.' },
  { name: 'Payments', description: 'Escrow questions, receipts, and refunds.' },
  { name: 'Product Help', description: 'How-to guidance for workflows and settings.' },
]

export default function Support() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 py-12">
        <section className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 px-8 py-12 text-white shadow-lg">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">Support</p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight">Support & Help Center</h1>
          <p className="mt-4 max-w-3xl text-lg text-white/85">
            Get answers, connect with our team, and find resources to keep your services running without friction.
          </p>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              {categories.map((category) => (
                <div key={category.name} className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                  <h3 className="text-lg font-semibold text-slate-900">{category.name}</h3>
                  <p className="mt-2 text-sm text-slate-600">{category.description}</p>
                  <img
                    src="https://picsum.photos/seed/smarthome/400/300"
                    alt={category.name}
                    className="mt-3 w-full h-48 object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <h2 className="text-xl font-semibold text-slate-900">FAQs</h2>
              <div className="mt-4 space-y-4">
                {faqs.map((faq) => (
                  <div key={faq.question} className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
                    <p className="text-sm font-semibold text-slate-900">{faq.question}</p>
                    <p className="mt-2 text-sm text-slate-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-xl font-semibold text-slate-900">Support</h2>
            <p className="mt-2 text-sm text-slate-600">Need help? Browse the categories or open a support ticket and our team will assist you.</p>

            <div className="mt-6 space-y-4">
              <Button className="w-full" onClick={() => (window.location.href = '/contact')}>Open a Support Ticket</Button>

              <div className="rounded-lg bg-slate-50 p-4">
                <p className="text-sm text-slate-700"><strong>Email:</strong> support@resolveit.com</p>
                <p className="mt-1 text-sm text-slate-700"><strong>Phone:</strong> +1 (555) 123-4567</p>
                <p className="mt-1 text-sm text-slate-700"><strong>Hours:</strong> Mon–Fri, 9:00am–6:00pm</p>
              </div>

              <img
                src="https://picsum.photos/seed/handyman/400/300"
                alt="Support team"
                className="mt-2 w-full h-48 rounded-lg object-cover"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

