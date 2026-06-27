import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import axios from 'axios';

const ClassDetailsPage = () => {
  const { id } = useParams();
  const { authHeaders } = useAuth();
  const [gymClass, setGymClass] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/classes/${id}`);
      setGymClass(response.data.class);
    };
    load();
  }, [id]);

  if (!gymClass) return <div className="mx-auto max-w-4xl px-4 py-20 text-center text-zinc-400">Loading class details...</div>;

  const handleBook = () => {
    navigate('/payment', { state: { classId: id } });
  };

  const handleFavorite = async () => {
    await axios.post(`${import.meta.env.VITE_API_BASE_URL}/classes/${id}/favorite`, {}, { headers: authHeaders });
    alert('Favorite updated.');
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr]">
        <div>
          <img src={gymClass.image} alt={gymClass.name} className="w-full rounded-[2rem] object-cover shadow-2xl shadow-black/20" />
          <div className="mt-8 rounded-[2rem] border border-zinc-800 bg-zinc-950 p-8">
            <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-400">
              <span className="rounded-full bg-zinc-900 px-3 py-2">{gymClass.category}</span>
              <span className="rounded-full bg-zinc-900 px-3 py-2">{gymClass.difficulty}</span>
              <span className="rounded-full bg-zinc-900 px-3 py-2">{gymClass.schedule}</span>
            </div>
            <h1 className="mt-6 text-4xl font-bold text-white">{gymClass.name}</h1>
            <p className="mt-5 text-zinc-300">{gymClass.description}</p>
          </div>
        </div>
        <aside className="space-y-6 rounded-[2rem] border border-zinc-800 bg-zinc-950 p-8 shadow-2xl shadow-black/20">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.3em] text-brand-300">Class Info</p>
            <div className="grid gap-3">
              <div className="rounded-3xl bg-zinc-900 p-4">
                <p className="text-sm text-zinc-400">Trainer</p>
                <p className="mt-2 text-lg font-semibold text-white">{gymClass.trainer}</p>
              </div>
              <div className="rounded-3xl bg-zinc-900 p-4">
                <p className="text-sm text-zinc-400">Duration</p>
                <p className="mt-2 text-lg font-semibold text-white">{gymClass.duration}</p>
              </div>
              <div className="rounded-3xl bg-zinc-900 p-4">
                <p className="text-sm text-zinc-400">Price</p>
                <p className="mt-2 text-lg font-semibold text-white">${gymClass.price}</p>
              </div>
            </div>
          </div>
          <button onClick={handleBook} className="w-full rounded-full bg-brand-500 px-6 py-4 text-sm font-semibold text-zinc-950 transition hover:bg-brand-400">Book Now</button>
          <button onClick={handleFavorite} className="w-full rounded-full border border-zinc-700 px-6 py-4 text-sm font-semibold text-zinc-200 transition hover:border-brand-500">Add to Favorites</button>
        </aside>
      </div>
    </div>
  );
};

export default ClassDetailsPage;
