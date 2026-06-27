import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const Layout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-[#06090b] text-white">
      <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-5 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-brand-500 text-zinc-950 shadow-brand-500/20">
              ⚡
            </div>
            <div>
              <p className="font-extrabold tracking-[0.24em] text-white">FITMEISTER</p>
              <p className="text-[11px] uppercase text-brand-300 tracking-[0.24em]">Fitness | Coaching | Community</p>
            </div>
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-semibold md:flex">
            <Link className={location.pathname === '/' ? 'text-brand-300' : 'text-zinc-400 hover:text-brand-300'} to="/">Home</Link>
            <Link className={location.pathname.startsWith('/classes') ? 'text-brand-300' : 'text-zinc-400 hover:text-brand-300'} to="/classes">All Classes</Link>
            <Link className={location.pathname.startsWith('/forum') ? 'text-brand-300' : 'text-zinc-400 hover:text-brand-300'} to="/forum">Community Forum</Link>
            {user && <Link className={location.pathname.startsWith('/dashboard') ? 'text-brand-300' : 'text-zinc-400 hover:text-brand-300'} to="/dashboard">Dashboard</Link>}
          </nav>
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <span className="rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-xs uppercase tracking-[0.18em] text-brand-300">{user.role}</span>
                <button onClick={logout} className="rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-brand-400">Logout</button>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link className="rounded-full border border-zinc-700 px-4 py-2 text-sm text-zinc-200 transition hover:border-brand-500 hover:text-brand-300" to="/login">Login</Link>
                <Link className="rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-brand-400" to="/register">Register</Link>
              </div>
            )}
          </div>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t border-zinc-800 bg-zinc-950 text-zinc-400">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="font-semibold text-white">FITMEISTER</p>
            <p className="mt-2 text-sm text-zinc-500">A premium fitness and gym management experience for members, trainers, and admins.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Quick Links</p>
              <ul className="mt-3 space-y-2 text-sm">
                <li><Link className="hover:text-brand-300" to="/">Home</Link></li>
                <li><Link className="hover:text-brand-300" to="/classes">All Classes</Link></li>
                <li><Link className="hover:text-brand-300" to="/forum">Community Forum</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Connect</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <a className="rounded-2xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs hover:border-brand-300" href="#">X</a>
                <a className="rounded-2xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs hover:border-brand-300" href="#">Instagram</a>
                <a className="rounded-2xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs hover:border-brand-300" href="#">LinkedIn</a>
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Contact</p>
              <p className="mt-3 text-sm">support@fitmeister.com</p>
              <p className="text-sm text-zinc-500">Mon–Sun • 7:00 AM–10:00 PM</p>
            </div>
          </div>
        </div>
        <div className="border-t border-zinc-800 py-4 text-center text-xs text-zinc-600">&copy; 2026 FitMeister — Secure access • Always on.</div>
      </footer>
    </div>
  );
};

export default Layout;
