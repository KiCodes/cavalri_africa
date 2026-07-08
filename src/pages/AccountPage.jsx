import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { usePageTitle } from '../hooks/usePageTitle';

function AccountPage() {
  usePageTitle('Account');
  const { isLoggedIn, user, logout } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/account/login" replace />;
  }

  return (
    <div className="PageContent PageContent--fitScreen">
      <div className="PageContent--extraNarrow" style={{ textAlign: 'center' }}>
        <header className="Form__Header">
          <h1 className="Form__Title Heading u-h1">Account</h1>
          <p className="Form__Legend">
            Welcome back{user?.firstName ? `, ${user.firstName}` : ''}.
          </p>
        </header>

        <button type="button" className="Button Button--primary Button--full" onClick={logout}>
          Log out
        </button>
      </div>
    </div>
  );
}

export default AccountPage;
