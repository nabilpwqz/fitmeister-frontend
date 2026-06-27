import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ForumPage = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    const load = async () => {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/forum?page=${page}&limit=8`);
      setPosts(response.data.posts);
      setPages(response.data.pages);
    };
    load();
  }, [page]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.3em] text-brand-300">Community Forum</p>
        <h1 className="mt-3 text-3xl font-bold text-white">Explore expert posts and trainer insights</h1>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {posts.map((post) => (
          <article key={post._id} className="rounded-[1.75rem] border border-zinc-800 bg-zinc-950 p-6 transition hover:border-brand-500">
            {post.image && <img src={post.image} alt={post.title} className="h-44 w-full rounded-3xl object-cover" />}
            <div className="mt-5">
              <p className="text-xs uppercase tracking-[0.3em] text-brand-300">{post.authorName}</p>
              <h3 className="mt-3 text-xl font-semibold text-white">{post.title}</h3>
              <p className="mt-3 text-sm text-zinc-400 line-clamp-4">{post.description}</p>
            </div>
            <Link to={`/forum/${post._id}`} className="mt-6 inline-flex rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-brand-400">Read More</Link>
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

export default ForumPage;
