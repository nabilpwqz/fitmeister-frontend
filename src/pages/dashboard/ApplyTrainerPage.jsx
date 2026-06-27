import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext.jsx';

const ApplyTrainerPage = () => {
  const { user, authHeaders } = useAuth();
  const [experience, setExperience] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!experience || !specialty) {
      setMessage('Please provide your experience and specialty.');
      return;
    }
    await axios.post(`${import.meta.env.VITE_API_BASE_URL}/users/apply-trainer`, { experience, specialty }, { headers: authHeaders });
    setMessage('Application submitted. Please wait for admin review.');
  };

  return (
    <div className="rounded-[2rem] border border-zinc-800 bg-zinc-950 p-8 shadow-2xl shadow-black/20">
      <h1 className="text-3xl font-bold text-white">Apply as Trainer</h1>
      <p className="mt-3 text-sm text-zinc-400">Submit your experience and specialty to become a trainer.</p>
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <label className="block text-sm font-semibold text-zinc-300">
          Years of experience
          <input value={experience} onChange={(e) => setExperience(e.target.value)} type="text" className="mt-2 w-full rounded-3xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-brand-500" />
        </label>
        <label className="block text-sm font-semibold text-zinc-300">
          Specialty
          <input value={specialty} onChange={(e) => setSpecialty(e.target.value)} type="text" className="mt-2 w-full rounded-3xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-brand-500" />
        </label>
        <button type="submit" className="rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-brand-400">Submit Application</button>
      </form>
      {message && <p className="mt-6 text-sm text-zinc-300">{message}</p>}
    </div>
  );
};

export default ApplyTrainerPage;
