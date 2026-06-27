import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useAuth } from '../context/AuthContext.jsx';
import axios from 'axios';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = ({ clientSecret, gymClass }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;
    setIsProcessing(true);
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    });
    if (error) {
      setMessage(error.message || 'Payment failed');
      setIsProcessing(false);
      return;
    }
    await axios.post(`${import.meta.env.VITE_API_BASE_URL}/payments/confirm`, { paymentIntentId: paymentIntent.id }, { headers: { Authorization: `Bearer ${localStorage.getItem('fitmeister_token')}` } });
    navigate('/dashboard');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-[2rem] border border-zinc-800 bg-zinc-950 p-8">
      <div>
        <h2 className="text-2xl font-bold text-white">Complete payment</h2>
        <p className="mt-2 text-sm text-zinc-400">{gymClass.name} with {gymClass.trainer} — ${gymClass.price}</p>
      </div>
      <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5">
        <CardElement options={{ style: { base: { color: '#f8fafc', fontSize: '16px', '::placeholder': { color: '#9ca3af' } }, invalid: { color: '#f87171' } } }} />
      </div>
      {message && <p className="text-sm text-red-400">{message}</p>}
      <button type="submit" disabled={!stripe || isProcessing} className="w-full rounded-full bg-brand-500 px-6 py-4 text-sm font-semibold text-zinc-950 transition hover:bg-brand-400">{isProcessing ? 'Processing...' : 'Pay now'}</button>
    </form>
  );
};

const PaymentPage = () => {
  const location = useLocation();
  const { authHeaders } = useAuth();
  const [gymClass, setGymClass] = useState(null);
  const [clientSecret, setClientSecret] = useState('');
  const navigate = useNavigate();
  const classId = location.state?.classId;

  useEffect(() => {
    if (!classId) {
      navigate('/classes');
      return;
    }
    const prepare = async () => {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/payments/create-payment-intent`, { classId }, { headers: authHeaders });
      setClientSecret(response.data.clientSecret);
      setGymClass(response.data.class);
    };
    prepare();
  }, [classId]);

  if (!gymClass || !clientSecret) return <div className="mx-auto max-w-4xl px-4 py-20 text-center text-zinc-400">Preparing payment...</div>;

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <CheckoutForm clientSecret={clientSecret} gymClass={gymClass} />
      </Elements>
    </div>
  );
};

export default PaymentPage;
