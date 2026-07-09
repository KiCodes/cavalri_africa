import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { usePageTitle } from '../hooks/usePageTitle';
import { formatNaira, parsePrice } from '../utils/currency';
import { NIGERIAN_STATES } from '../data/nigerianStates';
import { saveOrder } from '../utils/orders';
import './CheckoutPage.css';

const PAYMENT_OPTIONS = [
  { id: 'card', label: 'Card Payment' },
  { id: 'transfer', label: 'Bank Transfer' },
  { id: 'delivery', label: 'Pay on Delivery' },
];

function CheckoutPage() {
  usePageTitle('Checkout');
  const { items, subtotal, clear } = useCart();

  const [state, setState] = useState('Lagos');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [billingSame, setBillingSame] = useState(true);
  const [orderNumber, setOrderNumber] = useState(null);

  const shippingCost = state === 'Lagos' ? 5000 : 7500;
  const total = subtotal + shippingCost;
  const estimatedTax = total - total / 1.075;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  function handlePlaceOrder(event) {
    event.preventDefault();
    const number = `CA${Date.now().toString().slice(-6)}`;
    saveOrder({
      orderNumber: number,
      date: new Date().toISOString(),
      items: items.map((item) => ({
        title: item.title,
        size: item.size,
        quantity: item.quantity,
        price: item.price,
      })),
      total,
      paymentMethod,
    });
    setOrderNumber(number);
    clear();
  }

  if (orderNumber) {
    return (
      <div className="Checkout Checkout--confirmation">
        <div className="Checkout__ConfirmationCard">
          <p className="Text--subdued u-h7">Order #{orderNumber}</p>
          <h1 className="Heading u-h2">Thank you for your order</h1>
          <p className="Text--subdued">
            We've received your order and will reach out with delivery details shortly.
          </p>
          <Link to="/" className="Button Button--sweep Button--full">
            <span className="Button__Label">Continue Shopping</span>
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="Checkout Checkout--empty">
        <p className="Heading u-h4">Your cart is empty</p>
        <Link to="/" className="Link--secondary">Return to shop</Link>
      </div>
    );
  }

  return (
    <div className="Checkout">
      <Link to="/" className="Checkout__Logo Heading">Cavalri Africa</Link>

      <div className="Checkout__Layout">
        <form className="Checkout__Form" onSubmit={handlePlaceOrder}>
          <section className="Checkout__Section">
            <p className="Checkout__SectionLabel Text--subdued u-h7">Express checkout</p>
            <button type="button" className="Button Button--sweep Button--full">
              <span className="Button__Label">Express Checkout</span>
            </button>
            <div className="Checkout__Divider">
              <span>OR</span>
            </div>
          </section>

          <section className="Checkout__Section">
            <h2 className="Heading u-h5">Contact</h2>
            <div className="Form__Item">
              <input
                type="text"
                className="Form__Input"
                placeholder="Email or mobile phone number"
                required
              />
              <label className="Form__FloatingLabel">Email or mobile phone number</label>
            </div>
            <label className="Checkout__Checkbox">
              <input type="checkbox" defaultChecked />
              Email me with news and offers
            </label>
          </section>

          <section className="Checkout__Section">
            <h2 className="Heading u-h5">Delivery</h2>
            <div className="Form__Item">
              <select className="Form__Input" defaultValue="Nigeria" disabled>
                <option>Nigeria</option>
              </select>
              <label className="Form__FloatingLabel">Country/Region</label>
            </div>
            <div className="Checkout__Row">
              <div className="Form__Item">
                <input type="text" className="Form__Input" placeholder="First name" required />
                <label className="Form__FloatingLabel">First name</label>
              </div>
              <div className="Form__Item">
                <input type="text" className="Form__Input" placeholder="Last name" required />
                <label className="Form__FloatingLabel">Last name</label>
              </div>
            </div>
            <div className="Form__Item">
              <input type="text" className="Form__Input" placeholder="Address" required />
              <label className="Form__FloatingLabel">Address</label>
            </div>
            <div className="Checkout__Row">
              <div className="Form__Item">
                <input type="text" className="Form__Input" placeholder="City" required />
                <label className="Form__FloatingLabel">City</label>
              </div>
              <div className="Form__Item">
                <select
                  className="Form__Input"
                  value={state}
                  onChange={(event) => setState(event.target.value)}
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
              <input type="tel" className="Form__Input" placeholder="Phone" required />
              <label className="Form__FloatingLabel">Phone</label>
            </div>
          </section>

          <section className="Checkout__Section">
            <h2 className="Heading u-h5">Shipping method</h2>
            <div className="Checkout__ShippingMethod">
              <span>{state} State · DHL</span>
              <span>{formatNaira(shippingCost)}</span>
            </div>
          </section>

          <section className="Checkout__Section">
            <h2 className="Heading u-h5">Payment</h2>
            <p className="Text--subdued u-h8">All transactions are secure and encrypted.</p>
            <div className="Checkout__PaymentOptions">
              {PAYMENT_OPTIONS.map((option) => (
                <label
                  key={option.id}
                  className={`Checkout__PaymentOption${
                    paymentMethod === option.id ? ' is-selected' : ''
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={option.id}
                    checked={paymentMethod === option.id}
                    onChange={() => setPaymentMethod(option.id)}
                  />
                  {option.label}
                </label>
              ))}
            </div>

            {paymentMethod === 'card' && (
              <div className="Checkout__CardFields">
                <div className="Form__Item">
                  <input type="text" className="Form__Input" placeholder="Card number" required />
                  <label className="Form__FloatingLabel">Card number</label>
                </div>
                <div className="Checkout__Row">
                  <div className="Form__Item">
                    <input type="text" className="Form__Input" placeholder="Expiry (MM/YY)" required />
                    <label className="Form__FloatingLabel">Expiry</label>
                  </div>
                  <div className="Form__Item">
                    <input type="text" className="Form__Input" placeholder="CVC" required />
                    <label className="Form__FloatingLabel">CVC</label>
                  </div>
                </div>
              </div>
            )}
            {paymentMethod === 'transfer' && (
              <p className="Checkout__PaymentNote Text--subdued">
                Bank details will be sent to your email once your order is placed.
              </p>
            )}
            {paymentMethod === 'delivery' && (
              <p className="Checkout__PaymentNote Text--subdued">
                Pay in cash when your order arrives.
              </p>
            )}
          </section>

          <section className="Checkout__Section">
            <h2 className="Heading u-h5">Billing address</h2>
            <label className="Checkout__RadioRow">
              <input
                type="radio"
                name="billing"
                checked={billingSame}
                onChange={() => setBillingSame(true)}
              />
              Same as shipping address
            </label>
            <label className="Checkout__RadioRow">
              <input
                type="radio"
                name="billing"
                checked={!billingSame}
                onChange={() => setBillingSame(false)}
              />
              Use a different billing address
            </label>
          </section>

          <button type="submit" className="Button Button--sweep Button--full">
            <span className="Button__Label">Place Order · {formatNaira(total)}</span>
          </button>
        </form>

        <aside className="Checkout__Summary">
          <div className="Checkout__SummaryItems">
            {items.map((item) => (
              <div className="Checkout__SummaryItem" key={item.key}>
                <div className="Checkout__SummaryImageWrap">
                  <div className="Checkout__SummaryImage AspectRatio">
                    <img src={item.image} alt={item.title} />
                  </div>
                  <span className="Checkout__SummaryQty">{item.quantity}</span>
                </div>
                <div className="Checkout__SummaryInfo">
                  <p className="Heading u-h7">{item.title}</p>
                  <p className="Text--subdued u-h8">{item.size}</p>
                </div>
                <p className="u-h7">{formatNaira(parsePrice(item.price) * item.quantity)}</p>
              </div>
            ))}
          </div>

          <div className="Checkout__GiftCard">
            <input type="text" className="Form__Input" placeholder="Gift card" />
            <button type="button" className="Checkout__GiftCardApply" disabled>
              Apply
            </button>
          </div>

          <div className="Checkout__Totals">
            <div className="Checkout__TotalsRow">
              <span>
                Subtotal · {itemCount} item{itemCount !== 1 ? 's' : ''}
              </span>
              <span>{formatNaira(subtotal)}</span>
            </div>
            <div className="Checkout__TotalsRow">
              <span>Shipping</span>
              <span>{formatNaira(shippingCost)}</span>
            </div>
            <div className="Checkout__TotalsRow Checkout__TotalsRow--total">
              <span>Total</span>
              <span>NGN {formatNaira(total)}</span>
            </div>
            <p className="Checkout__TaxNote Text--subdued u-h8">
              Including {formatNaira(estimatedTax)} in taxes
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default CheckoutPage;
