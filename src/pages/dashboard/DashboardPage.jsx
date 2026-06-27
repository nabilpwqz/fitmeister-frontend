import { NavLink, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import UserOverviewPage from './UserOverviewPage.jsx';
import BookedClassesPage from './BookedClassesPage.jsx';
import FavoriteClassesPage from './FavoriteClassesPage.jsx';
import ApplyTrainerPage from './ApplyTrainerPage.jsx';

const DashboardPage = () => {
  const { user } = useAuth();
  const base = '/dashboard';
  const navItems = [
    { label: 'Overview', to: `${base}` },
    { label: 'Booked Classes', to: `${base}/booked-classes` },
    { label: 'Favorites', to: `${base}/favorites` },
    { label: 'Apply Trainer', to: `${base}/apply-trainer` }
  ];

  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[280px_1fr] lg:px-8">
      <aside className="rounded-[2rem] border border-zinc-800 bg-zinc-950 p-6">
        <h2 className="text-xl font-bold text-white">Dashboard</h2>
        <nav className="mt-8 space-y-3">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} end className={({ isActive }) => `block rounded-3xl px-4 py-3 text-sm font-semibold transition ${isActive ? 'bg-brand-500 text-zinc-950' : 'text-zinc-300 hover:bg-zinc-900'}`}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <section className="space-y-6">
        <Routes>
          <Route index element={<UserOverviewPage />} />
          <Route path="booked-classes" element={<BookedClassesPage />} />
          <Route path="favorites" element={<FavoriteClassesPage />} />
          <Route path="apply-trainer" element={<ApplyTrainerPage />} />
          <Route path="*" element={<Navigate to={base} replace />} />
        </Routes>
      </section>
    </div>
  );
};

export default DashboardPage;
