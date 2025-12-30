import { Link } from 'react-router-dom'

const footerLinks = {
  company: [
    { label: 'About', to: '/' },
    { label: 'Services', to: '/services' },
    { label: 'Pricing', to: '/pricing' },
  ],
  support: [
    { label: 'Help Center', to: '/support' },
    { label: 'Contact', to: '/support' },
  ],
}

export default function Footer() {
  return (
    <footer className="border-t bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2 space-y-3">
            <p className="text-lg font-semibold text-white">ResolveIt</p>
            <p className="text-sm text-slate-400">
              Fast, reliable home and professional services. Book trusted pros in just a few taps.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Company</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="hover:text-sky-400">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Support</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="hover:text-sky-400">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 space-y-1 text-xs text-slate-500">
              <p>support@resolveit.app</p>
              <p>+92 300 0000000</p>
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-6 text-xs text-slate-500 md:flex-row">
          <p>© {new Date().getFullYear()} ResolveIt. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="hover:text-sky-400">Facebook</span>
            <span className="hover:text-sky-400">Instagram</span>
            <span className="hover:text-sky-400">LinkedIn</span>
          </div>
        </div>
      </div>
    </footer>
  )
}


