import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to login.');
    }
  };

  return (
    <div className="mx-auto max-w-md px-4 py-20 sm:px-6">
      <div className="rounded-[2rem] border border-zinc-800 bg-zinc-950 p-10 shadow-2xl shadow-black/20">
        <h1 className="text-3xl font-bold text-white">Login</h1>
        <p className="mt-3 text-sm text-zinc-400">Access your FitMeister dashboard and member tools.</p>
        {error && <div className="mt-6 rounded-3xl bg-red-500/10 border border-red-500 px-4 py-3 text-sm text-red-300">{error}</div>}
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <label className="block text-sm font-semibold text-zinc-300">
            Email
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required className="mt-2 w-full rounded-3xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-brand-500" />
          </label>
          <label className="block text-sm font-semibold text-zinc-300">
            Password
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required className="mt-2 w-full rounded-3xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-brand-500" />
          </label>
          <button type="submit" className="w-full rounded-full bg-brand-500 px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-brand-400">Login</button>
        </form>
        <p className="mt-6 text-center text-sm text-zinc-500">Don't have an account? <Link className="text-brand-300 hover:text-white" to="/register">Register</Link></p>
      </div>
    </div>
  );
};

export default LoginPage;
