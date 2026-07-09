import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import CollectionPage from './pages/CollectionPage';
import ProductPage from './pages/ProductPage';
import CheckoutPage from './pages/CheckoutPage';
import CollaborationsPage from './pages/CollaborationsPage';
import CollaborationDetailPage from './pages/CollaborationDetailPage';
import OurStory from './pages/OurStory';
import Mission from './pages/Mission';
import Ethos from './pages/Ethos';
import Login from './pages/Login';
import Register from './pages/Register';
import AccountPage from './pages/AccountPage';
import SearchResultsPage from './pages/SearchResultsPage';
import './App.css';

function App() {
  const location = useLocation();
  const isCheckout = location.pathname === '/checkout';

  return (
    <>
      {!isCheckout && <Header />}

      <Routes>
        <Route path="/" element={<CollectionPage />} />
        <Route path="/collections/all/products/:handle" element={<ProductPage />} />
        <Route path="/collections/:category" element={<CollectionPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/collaborations" element={<CollaborationsPage />} />
        <Route path="/collaborations/:slug" element={<CollaborationDetailPage />} />
        <Route path="/pages/our-story" element={<OurStory />} />
        <Route path="/pages/mission" element={<Mission />} />
        <Route path="/pages/ethos" element={<Ethos />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/account/login" element={<Login />} />
        <Route path="/account/register" element={<Register />} />
        <Route path="/search" element={<SearchResultsPage />} />
      </Routes>

      {!isCheckout && <Footer />}
    </>
  );
}

export default App;
