import { Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/Layout.jsx';
import HomePage from './pages/HomePage.jsx';
import AllClassesPage from './pages/AllClassesPage.jsx';
import ForumPage from './pages/ForumPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import ClassDetailsPage from './pages/ClassDetailsPage.jsx';
import ForumPostDetailsPage from './pages/ForumPostDetailsPage.jsx';
import DashboardPage from './pages/dashboard/DashboardPage.jsx';
import PaymentPage from './pages/PaymentPage.jsx';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <AuthProvider>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="classes" element={<AllClassesPage />} />
            <Route path="classes/:id" element={<ProtectedRoute><ClassDetailsPage /></ProtectedRoute>} />
            <Route path="forum" element={<ForumPage />} />
            <Route path="forum/:id" element={<ProtectedRoute><ForumPostDetailsPage /></ProtectedRoute>} />
            <Route path="payment" element={<ProtectedRoute><PaymentPage /></ProtectedRoute>} />
            <Route path="dashboard/*" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </AuthProvider>
  );
};

export default App;
