import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext.jsx';

const ForumPostDetailsPage = () => {
  const { id } = useParams();
  const { authHeaders } = useAuth();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState('');

  useEffect(() => {
    const load = async () => {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/forum/${id}`);
      setPost(response.data.post);
    };
    load();
  }, [id]);

  const handleVote = async (type) => {
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/forum/${id}/vote`, { type }, { headers: authHeaders });
    setPost(response.data.post);
  };

  const handleComment = async (e) => {
    e.preventDefault();
    await axios.post(`${import.meta.env.VITE_API_BASE_URL}/forum/${id}/comments`, { text: comment }, { headers: authHeaders });
    const updated = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/forum/${id}`);
    setPost(updated.data.post);
    setComment('');
  };

  if (!post) return <div className="mx-auto max-w-4xl px-4 py-20 text-center text-zinc-400">Loading post...</div>;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-zinc-800 bg-zinc-950 p-8 shadow-2xl shadow-black/20">
        {post.image && <img src={post.image} alt={post.title} className="w-full rounded-[2rem] object-cover" />}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-brand-300">{post.authorRole}</p>
            <h1 className="mt-3 text-4xl font-bold text-white">{post.title}</h1>
          </div>
          <div className="flex gap-3">
            <button onClick={() => handleVote('like')} className="rounded-full border border-zinc-700 bg-zinc-900 px-5 py-3 text-sm font-semibold text-white hover:border-brand-500">Like ({post.likes.length})</button>
            <button onClick={() => handleVote('dislike')} className="rounded-full border border-zinc-700 bg-zinc-900 px-5 py-3 text-sm font-semibold text-white hover:border-brand-500">Dislike ({post.dislikes.length})</button>
          </div>
        </div>
        <p className="mt-8 leading-relaxed text-zinc-300">{post.description}</p>
        <section className="mt-12 rounded-[1.75rem] border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="text-2xl font-semibold text-white">Comments</h2>
          <form onSubmit={handleComment} className="mt-6 space-y-4">
            <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Write your comment..." required className="w-full rounded-3xl border border-zinc-800 bg-zinc-950 px-4 py-4 text-white outline-none focus:border-brand-500"></textarea>
            <button type="submit" className="rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-brand-400">Post Comment</button>
          </form>
          <div className="mt-8 space-y-4">
            {post.comments.map((commentItem) => (
              <div key={commentItem._id} className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5">
                <p className="text-sm font-semibold text-white">{commentItem.userName}</p>
                <p className="mt-2 text-sm text-zinc-400">{commentItem.text}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ForumPostDetailsPage;
