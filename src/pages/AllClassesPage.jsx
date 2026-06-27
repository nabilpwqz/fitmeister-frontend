import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const categories = ['Yoga', 'Cardio', 'Weights', 'Gymnastics'];

const AllClassesPage = () => {
  const [classes, setClasses] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    const load = async () => {
      const params = new URLSearchParams({ page, limit: 8 });
      if (search) params.set('search', search);
      if (category) params.set('category', category);
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/classes?${params}`);
      setClasses(response.data.classes);
      setPages(response.data.pages);
    };
    load();
  }, [search, category, page]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-brand-300">Browse Classes</p>
          <h1 className="mt-3 text-3xl font-bold text-white">Approved classes for every fitness goal</h1>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search classes..." className="w-full rounded-3xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white outline-none focus:border-brand-500" />
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full rounded-3xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white outline-none focus:border-brand-500">
            <option value="">All categories</option>
            {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {classes.map((item) => (
          <article key={item._id} className="overflow-hidden rounded-[1.75rem] border border-zinc-800 bg-zinc-950 transition hover:border-brand-500">
            <img src={item.image} alt={item.name} className="h-52 w-full object-cover" />
            <div className="p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">{item.category}</p>
              <h3 className="mt-3 text-xl font-semibold text-white">{item.name}</h3>
              <p className="mt-3 text-sm text-zinc-400 line-clamp-3">{item.description}</p>
              <div className="mt-5 flex items-center justify-between text-sm text-zinc-300">
                <span>{item.duration}</span>
                <span>${item.price}</span>
              </div>
              <Link to={`/classes/${item._id}`} className="mt-5 inline-flex rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-brand-400">View Details</Link>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-10 flex items-center justify-center gap-3 text-sm text-zinc-400">
        <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} className="rounded-full border border-zinc-800 px-4 py-2 hover:border-brand-500">Previous</button>
        <span>Page {page} of {pages}</span>
        <button onClick={() => setPage((prev) => Math.min(prev + 1, pages))} className="rounded-full border border-zinc-800 px-4 py-2 hover:border-brand-500">Next</button>
      </div>
    </div>
  );
};

export default AllClassesPage;
