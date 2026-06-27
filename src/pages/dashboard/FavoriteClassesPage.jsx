import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext.jsx';

const FavoriteClassesPage = () => {
  const { authHeaders } = useAuth();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const load = async () => {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/users/favorites`, { headers: authHeaders });
      setFavorites(response.data.favorites);
    };
    load();
  }, [authHeaders]);

  return (
    <div className="rounded-[2rem] border border-zinc-800 bg-zinc-950 p-8 shadow-2xl shadow-black/20">
      <h1 className="text-3xl font-bold text-white">Favorite Classes</h1>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {!favorites.length && <p className="text-zinc-400">You don't have any favorite classes yet.</p>}
        {favorites.map((item) => (
          <div key={item._id} className="rounded-[1.75rem] border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="text-xl font-semibold text-white">{item.name}</h2>
            <p className="mt-2 text-sm text-zinc-400">{item.category} — ${item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteClassesPage;
