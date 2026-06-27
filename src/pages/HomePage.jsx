import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const HomePage = () => {
  const [featured, setFeatured] = useState([]);
  const [latestPosts, setLatestPosts] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const classesResponse = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/classes?limit=4&page=1`);
      const postsResponse = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/forum?limit=4&page=1`);
      setFeatured(classesResponse.data.classes);
      setLatestPosts(postsResponse.data.posts);
    };
    loadData();
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-8">
          <span className="inline-flex rounded-full bg-brand-500/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-brand-200">Fitness & Gym Management</span>
          <h1 className="max-w-2xl text-4xl font-extrabold leading-tight text-white sm:text-5xl">Build stronger routines, book premium trainer-led sessions, and join a fitness community that keeps you accountable.</h1>
          <p className="max-w-xl text-base text-zinc-400">FitMeister empowers members, trainers, and admins with role-based dashboards, class booking, forum posts, and a polished booking experience.</p>
          <div className="flex flex-wrap gap-4">
            <Link to="/classes" className="rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-zinc-950 shadow-xl shadow-brand-500/20 transition hover:bg-brand-400">Explore Classes</Link>
            <Link to="/forum" className="rounded-full border border-zinc-700 px-6 py-3 text-sm text-zinc-200 transition hover:border-brand-500 hover:text-brand-300">View Forum</Link>
          </div>
        </div>
        <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="rounded-[2rem] border border-zinc-800 bg-zinc-950/80 p-8 shadow-2xl shadow-black/20">
          <div className="mb-6 flex items-center justify-between rounded-3xl bg-zinc-900/80 p-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Fast support</p>
              <p className="text-lg font-semibold text-white">Community first, performance driven.</p>
            </div>
            <span className="rounded-full bg-brand-500 px-3 py-2 text-xs font-bold text-zinc-950">Live</span>
          </div>
          <div className="space-y-4">
            <div className="rounded-3xl bg-zinc-900 p-5">
              <p className="text-sm text-zinc-400">Member goal</p>
              <p className="mt-2 text-xl font-semibold text-white">Train smarter with dynamic class discovery.</p>
            </div>
            <div className="rounded-3xl bg-zinc-900 p-5">
              <p className="text-sm text-zinc-400">Trainer spotlight</p>
              <p className="mt-2 text-xl font-semibold text-white">Share classes, manage attendees, and grow your profile.</p>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="mt-16">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-brand-300">Featured Classes</p>
            <h2 className="mt-2 text-3xl font-bold text-white">Top-approved class picks</h2>
          </div>
          <Link to="/classes" className="text-sm font-semibold text-brand-300 hover:text-white">Browse all classes →</Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {featured.map((item) => (
            <article key={item._id} className="overflow-hidden rounded-[1.75rem] border border-zinc-800 bg-zinc-950 transition hover:-translate-y-1 hover:border-brand-500">
              <img src={item.image} alt={item.name} className="h-52 w-full object-cover" />
              <div className="p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">{item.category}</p>
                <h3 className="mt-3 text-xl font-semibold text-white">{item.name}</h3>
                <p className="mt-3 text-sm text-zinc-400 line-clamp-3">{item.description}</p>
                <div className="mt-5 flex items-center justify-between text-sm text-zinc-300">
                  <span>{item.duration}</span>
                  <span>${item.price}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-brand-300">Latest Forum Posts</p>
            <h2 className="mt-2 text-3xl font-bold text-white">Recent community insights</h2>
          </div>
          <Link to="/forum" className="text-sm font-semibold text-brand-300 hover:text-white">View all posts →</Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {latestPosts.map((post) => (
            <article key={post._id} className="rounded-[1.75rem] border border-zinc-800 bg-zinc-950 p-6 transition hover:border-brand-500">
              {post.image && <img src={post.image} alt={post.title} className="h-40 w-full rounded-3xl object-cover" />}
              <div className="mt-5">
                <p className="text-xs uppercase tracking-[0.3em] text-brand-300">{post.authorRole}</p>
                <h3 className="mt-3 text-xl font-semibold text-white">{post.title}</h3>
                <p className="mt-3 text-sm text-zinc-400 line-clamp-3">{post.description}</p>
              </div>
              <Link to={`/forum/${post._id}`} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-300 hover:text-white">Read more →</Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16 grid gap-8 lg:grid-cols-2">
        <div className="rounded-[2rem] border border-zinc-800 bg-zinc-950 p-8 shadow-2xl shadow-black/10">
          <h3 className="text-2xl font-bold text-white">Why FitMeister?</h3>
          <p className="mt-4 text-zinc-400">Our platform supports role-based access, secure JWT authentication, and a modern fitness management workflow for classes, forums, and bookings.</p>
          <ul className="mt-6 space-y-4 text-zinc-300">
            <li>• Discover quality classes by category.</li>
            <li>• Book secure sessions and manage favorites.</li>
            <li>• Join a community forum for trainers and admins.</li>
          </ul>
        </div>
        <div className="rounded-[2rem] border border-zinc-800 bg-zinc-950 p-8 shadow-2xl shadow-black/10">
          <h3 className="text-2xl font-bold text-white">Built for every role</h3>
          <p className="mt-4 text-zinc-400">Members, trainers, and admins get their own dashboard tools. Trainers can add classes and post to the forum. Admins can moderate users and approve content.</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-zinc-900 p-5">
              <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Members</p>
              <p className="mt-2 text-white">Book classes, favorite sessions, and participate in forum discussions.</p>
            </div>
            <div className="rounded-3xl bg-zinc-900 p-5">
              <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Trainers</p>
              <p className="mt-2 text-white">Create classes, manage attendees, and contribute expert content.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
