import Navbar from '../../components/layout/Navbar'
import Sidebar from '../../components/layout/Sidebar'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'

export default function BookService() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6 lg:px-0">
        <Sidebar />
        <main className="flex-1">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h1 className="text-2xl font-bold text-slate-900">Book a Service</h1>
            <p className="mt-2 text-sm text-slate-600">Select a service, choose a date, and confirm booking.</p>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <Card>
                <h3 className="font-semibold text-slate-900">Choose a service</h3>
                <p className="mt-2 text-sm text-slate-600">Plumbing, electrician, AC, and more.</p>
              </Card>
              <Card>
                <h3 className="font-semibold text-slate-900">Select schedule</h3>
                <p className="mt-2 text-sm text-slate-600">Pick a time that works for you.</p>
              </Card>
            </div>

            <div className="mt-6">
              <Button>Continue</Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
