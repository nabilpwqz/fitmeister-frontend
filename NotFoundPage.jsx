import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-3xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6">
      <p className="text-sm uppercase tracking-[0.3em] text-brand-300">404 error</p>
      <h1 className="mt-6 text-5xl font-bold text-white">Page not found</h1>
      <p className="mt-4 max-w-xl text-sm text-zinc-400">The route you requested does not exist or you may have entered the wrong URL. Return to the home page and continue exploring.</p>
      <Link to="/" className="mt-8 inline-flex rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-brand-400">Back to Home</Link>
    </div>
  );
};

export default NotFoundPage;
