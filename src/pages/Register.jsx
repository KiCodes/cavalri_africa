import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { usePageTitle } from '../hooks/usePageTitle';

function Register() {
  usePageTitle('Register');
  const { isLoggedIn, login } = useAuth();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (isLoggedIn) {
    return <Navigate to="/account" replace />;
  }

  function handleSubmit(e) {
    e.preventDefault();
    login({ firstName, lastName, email });
    navigate('/account');
  }

  return (
    <div className="PageContent PageContent--fitScreen">
      <div className="PageContent--extraNarrow">
        <form className="Form Form--spacingTight" onSubmit={handleSubmit}>
          <header className="Form__Header">
            <h1 className="Form__Title Heading u-h1">Register</h1>
            <p className="Form__Legend">Please fill in the information below:</p>
          </header>

          <div className="Form__Item">
            <input
              type="text"
              className="Form__Input"
              placeholder="First name"
              aria-label="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label className="Form__FloatingLabel">First name</label>
          </div>

          <div className="Form__Item">
            <input
              type="text"
              className="Form__Input"
              placeholder="Last name"
              aria-label="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <label className="Form__FloatingLabel">Last name</label>
          </div>

          <div className="Form__Item">
            <input
              type="email"
              className="Form__Input"
              placeholder="Email"
              aria-label="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="Form__FloatingLabel">Email</label>
          </div>

          <div className="Form__Item">
            <input
              type="password"
              className="Form__Input"
              placeholder="Password"
              aria-label="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="Form__FloatingLabel">Password</label>
          </div>

          <button type="submit" className="Form__Submit Button Button--primary Button--full">
            Create my account
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
