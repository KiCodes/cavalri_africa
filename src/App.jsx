import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import CollectionPage from './pages/CollectionPage';
import OurStory from './pages/OurStory';
import Mission from './pages/Mission';
import Ethos from './pages/Ethos';
import Login from './pages/Login';
import Register from './pages/Register';
import AccountPage from './pages/AccountPage';
import SearchResultsPage from './pages/SearchResultsPage';
import './App.css';

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<CollectionPage />} />
        <Route path="/pages/our-story" element={<OurStory />} />
        <Route path="/pages/mission" element={<Mission />} />
        <Route path="/pages/ethos" element={<Ethos />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/account/login" element={<Login />} />
        <Route path="/account/register" element={<Register />} />
        <Route path="/search" element={<SearchResultsPage />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
