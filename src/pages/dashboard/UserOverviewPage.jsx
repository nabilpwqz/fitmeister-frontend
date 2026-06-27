import { useAuth } from '../../context/AuthContext.jsx';

const UserOverviewPage = () => {
  const { user } = useAuth();

  return (
    <div className="rounded-[2rem] border border-zinc-800 bg-zinc-950 p-8 shadow-2xl shadow-black/20">
      <h1 className="text-3xl font-bold text-white">Overview</h1>
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="rounded-[1.75rem] bg-zinc-900 p-6">
          <p className="text-sm uppercase tracking-[0.3em] text-brand-300">Booked Classes</p>
          <p className="mt-4 text-4xl font-bold text-white">0</p>
        </div>
        <div className="rounded-[1.75rem] bg-zinc-900 p-6">
          <p className="text-sm uppercase tracking-[0.3em] text-brand-300">Favorites</p>
          <p className="mt-4 text-4xl font-bold text-white">0</p>
        </div>
        <div className="rounded-[1.75rem] bg-zinc-900 p-6">
          <p className="text-sm uppercase tracking-[0.3em] text-brand-300">Application</p>
          <p className="mt-4 text-4xl font-bold text-white">{user.appStatus || 'None'}</p>
        </div>
      </div>
      <div className="mt-10 rounded-[1.75rem] border border-zinc-800 bg-zinc-900 p-6">
        <h2 className="text-xl font-semibold text-white">Profile</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-3xl bg-zinc-950 p-5">
            <p className="text-sm text-zinc-400">Name</p>
            <p className="mt-2 text-lg font-semibold text-white">{user.name}</p>
          </div>
          <div className="rounded-3xl bg-zinc-950 p-5">
            <p className="text-sm text-zinc-400">Email</p>
            <p className="mt-2 text-lg font-semibold text-white">{user.email}</p>
          </div>
          <div className="rounded-3xl bg-zinc-950 p-5">
            <p className="text-sm text-zinc-400">Role</p>
            <p className="mt-2 text-lg font-semibold text-white">{user.role}</p>
          </div>
        </div>
        {user.appStatus === 'Rejected' && (
          <div className="mt-6 rounded-3xl bg-red-500/10 border border-red-500 p-5 text-sm text-red-200">
            Admin feedback: {user.appFeedback || 'No feedback provided.'}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserOverviewPage;
