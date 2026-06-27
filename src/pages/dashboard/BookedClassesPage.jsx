import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext.jsx';

const BookedClassesPage = () => {
  const { user, authHeaders } = useAuth();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const load = async () => {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/users/bookings`, { headers: authHeaders });
      setBookings(response.data.bookings);
    };
    load();
  }, [authHeaders]);

  return (
    <div className="rounded-[2rem] border border-zinc-800 bg-zinc-950 p-8 shadow-2xl shadow-black/20">
      <h1 className="text-3xl font-bold text-white">Booked Classes</h1>
      <div className="mt-8 overflow-x-auto">
        <table className="min-w-full divide-y divide-zinc-800 text-left text-sm text-zinc-300">
          <thead>
            <tr>
              <th className="px-4 py-3">Class</th>
              <th className="px-4 py-3">Trainer</th>
              <th className="px-4 py-3">Schedule</th>
              <th className="px-4 py-3">Price</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td className="px-4 py-4">{booking.className}</td>
                <td className="px-4 py-4">{booking.trainerName}</td>
                <td className="px-4 py-4">{booking.schedule}</td>
                <td className="px-4 py-4">${booking.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!bookings.length && <p className="mt-6 text-sm text-zinc-500">No booked classes yet.</p>}
    </div>
  );
};

export default BookedClassesPage;
