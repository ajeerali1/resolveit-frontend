import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import Button from '../components/ui/Button'

const services = [
  {
    name: 'Plumbing',
    price: 'PKR 500',
    description: 'Professional plumbing repair & installation.',
    image: 'https://picsum.photos/seed/plumbing/400/300',
  },
  {
    name: 'Carpenter',
    price: 'PKR 700',
    description: 'Furniture repair, woodwork & customization.',
    image: 'https://picsum.photos/seed/carpenter/400/300',
  },
  {
    name: 'Electrician',
    price: 'PKR 600',
    description: 'Wiring, appliances repair & electrical fixes.',
    image: 'https://picsum.photos/seed/electrician/400/300',
  },
  {
    name: 'AC Repair',
    price: 'PKR 1200',
    description: 'AC servicing, gas refill & cooling problem fix.',
    image: 'https://picsum.photos/seed/acrepair/400/300',
  },
  {
    name: 'Painter',
    price: 'PKR 1500',
    description: 'Indoor & outdoor painting services.',
    image: 'https://picsum.photos/seed/painter/400/300',
  },
  {
    name: 'Cleaning Services',
    price: 'PKR 1000',
    description: 'Deep cleaning for homes & offices.',
    image: 'https://picsum.photos/seed/cleaning/400/300',
  },
]

export default function Pricing() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 py-12">
        <section className="rounded-3xl bg-gradient-to-r from-sky-700 via-sky-600 to-sky-800 px-8 py-12 text-white shadow-lg">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">Pricing</p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight">Transparent & Affordable Service Pricing</h1>
          <p className="mt-4 max-w-3xl text-lg text-white/85">
            Choose from our trusted home services with fixed, reliable rates.
          </p>
        </section>

        <section className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.name}
              className="flex flex-col gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="overflow-hidden rounded-lg">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{service.name}</h3>
                  <p className="mt-1 text-sm text-slate-600">{service.description}</p>
                </div>
                <p className="text-sm font-bold text-sky-700">{service.price}</p>
              </div>
              <Button className="mt-auto w-full">Book Now</Button>
            </div>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  )
}

