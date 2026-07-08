import { useState } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { usePageTitle } from '../hooks/usePageTitle';

function Login() {
  usePageTitle('Login');
  const { isLoggedIn, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (isLoggedIn) {
    return <Navigate to="/account" replace />;
  }

  function handleSubmit(e) {
    e.preventDefault();
    login({ email, firstName: email.split('@')[0] });
    navigate('/account');
  }

  return (
    <div className="PageContent PageContent--fitScreen">
      <div className="PageContent--extraNarrow">
        <form className="Form Form--spacingTight" onSubmit={handleSubmit}>
          <header className="Form__Header">
            <h1 className="Form__Title Heading u-h1">Login</h1>
            <p className="Form__Legend">Please enter your e-mail and password:</p>
          </header>

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
            <button type="button" className="Form__ItemHelp Link Link--primary">
              Forgot password?
            </button>
          </div>

          <button type="submit" className="Form__Submit Button Button--primary Button--full">
            Login
          </button>

          <div className="Form__Hint Form__Hint--center">
            <span className="Text--subdued">Don't have an account? </span>
            <Link to="/account/register" className="Link Link--secondary">
              Create one
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
