import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { usePageTitle } from '../hooks/usePageTitle';
import { NIGERIAN_STATES } from '../data/nigerianStates';
import { getAddress, saveAddress } from '../utils/address';
import { getOrders } from '../utils/orders';
import { formatNaira } from '../utils/currency';
import './AccountPage.css';

function formatOrderDate(iso) {
  return new Date(iso).toLocaleDateString('en-NG', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function AccountPage() {
  usePageTitle('Account');
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();

  const [orders] = useState(getOrders);
  const [address, setAddress] = useState(getAddress);
  const [editingAddress, setEditingAddress] = useState(false);
  const [form, setForm] = useState(
    address || {
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      state: 'Lagos',
      phone: '',
    }
  );

  if (!isLoggedIn) {
    return <Navigate to="/account/login" replace />;
  }

  function handleLogout() {
    logout();
    navigate('/');
  }

  function handleAddressSubmit(event) {
    event.preventDefault();
    saveAddress(form);
    setAddress(form);
    setEditingAddress(false);
  }

  return (
    <div className="Container AccountPage">
      <button type="button" className="AccountPage__Logout Text--subdued u-h7" onClick={handleLogout}>
        Logout
      </button>

      <h1 className="Heading u-h1">My Account</h1>
      <p className="AccountPage__Welcome">
        Welcome back{user?.firstName ? `, ${user.firstName}` : ''}!
      </p>

      <div className="AccountPage__Grid">
        <section className="AccountPage__Section">
          <h2 className="AccountPage__SectionTitle Heading Text--subdued u-h7">My Orders</h2>

          {orders.length === 0 ? (
            <p className="Text--subdued">You haven't placed any orders yet</p>
          ) : (
            <ul className="AccountPage__Orders">
              {orders.map((order) => (
                <li className="AccountPage__Order" key={order.orderNumber}>
                  <div className="AccountPage__OrderHeader">
                    <span className="Heading u-h6">Order #{order.orderNumber}</span>
                    <span className="Text--subdued u-h8">{formatOrderDate(order.date)}</span>
                  </div>
                  <ul className="AccountPage__OrderItems">
                    {order.items.map((item) => (
                      <li key={`${order.orderNumber}-${item.title}-${item.size}`}>
                        {item.title} ({item.size}) × {item.quantity}
                      </li>
                    ))}
                  </ul>
                  <p className="AccountPage__OrderTotal">{formatNaira(order.total)}</p>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="AccountPage__Section">
          <h2 className="AccountPage__SectionTitle Heading Text--subdued u-h7">Primary Address</h2>

          {!editingAddress ? (
            <>
              {address ? (
                <div className="AccountPage__Address">
                  <p>
                    {address.firstName} {address.lastName}
                  </p>
                  <p>{address.address}</p>
                  <p>
                    {address.city}, {address.state}
                  </p>
                  <p>{address.phone}</p>
                  <p>Nigeria</p>
                </div>
              ) : (
                <p>Nigeria</p>
              )}
              <button
                type="button"
                className="Button Button--sweep AccountPage__EditButton"
                onClick={() => setEditingAddress(true)}
              >
                <span className="Button__Label">Edit Addresses</span>
              </button>
            </>
          ) : (
            <form className="AccountPage__AddressForm" onSubmit={handleAddressSubmit}>
              <div className="AccountPage__Row">
                <div className="Form__Item">
                  <input
                    type="text"
                    className="Form__Input"
                    placeholder="First name"
                    required
                    value={form.firstName}
                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                  />
                  <label className="Form__FloatingLabel">First name</label>
                </div>
                <div className="Form__Item">
                  <input
                    type="text"
                    className="Form__Input"
                    placeholder="Last name"
                    required
                    value={form.lastName}
                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                  />
                  <label className="Form__FloatingLabel">Last name</label>
                </div>
              </div>

              <div className="Form__Item">
                <input
                  type="text"
                  className="Form__Input"
                  placeholder="Address"
                  required
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                />
                <label className="Form__FloatingLabel">Address</label>
              </div>

              <div className="AccountPage__Row">
                <div className="Form__Item">
                  <input
                    type="text"
                    className="Form__Input"
                    placeholder="City"
                    required
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                  />
                  <label className="Form__FloatingLabel">City</label>
                </div>
                <div className="Form__Item">
                  <select
                    className="Form__Input"
                    value={form.state}
                    onChange={(e) => setForm({ ...form, state: e.target.value })}
                  >
                    {NIGERIAN_STATES.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <label className="Form__FloatingLabel">State</label>
                </div>
              </div>

              <div className="Form__Item">
                <input
                  type="tel"
                  className="Form__Input"
                  placeholder="Phone"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
                <label className="Form__FloatingLabel">Phone</label>
              </div>

              <div className="AccountPage__AddressFormActions">
                <button type="submit" className="Button Button--sweep">
                  <span className="Button__Label">Save Address</span>
                </button>
                <button
                  type="button"
                  className="Link--secondary"
                  onClick={() => setEditingAddress(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </section>
      </div>
    </div>
  );
}

export default AccountPage;
