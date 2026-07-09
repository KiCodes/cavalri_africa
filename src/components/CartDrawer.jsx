import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatNaira } from '../utils/currency';
import './CartDrawer.css';

function CartDrawer() {
  const { items, isOpen, subtotal, close, removeItem, updateQuantity } = useCart();
  const [noteOpen, setNoteOpen] = useState(false);
  const [note, setNote] = useState('');
  const navigate = useNavigate();

  function handleCheckout() {
    close();
    navigate('/checkout');
  }

  return (
    <>
      <div
        className={`CartDrawer__Overlay${isOpen ? ' is-open' : ''}`}
        onClick={close}
        aria-hidden="true"
      />
      <aside className={`CartDrawer${isOpen ? ' is-open' : ''}`} aria-hidden={!isOpen}>
        <div className="CartDrawer__Header">
          <h2 className="CartDrawer__Title Heading u-h4">Cart</h2>
          <button type="button" className="CartDrawer__Close" aria-label="Close cart" onClick={close}>
            <svg viewBox="0 0 16 14">
              <path d="M15 0L1 14m14 0L1 0" stroke="currentColor" fill="none" />
            </svg>
          </button>
        </div>

        {items.length > 0 && (
          <p className="CartDrawer__ShippingNote Text--subdued">
            You are eligible to free shipping!
          </p>
        )}

        <div className="CartDrawer__Items">
          {items.length === 0 ? (
            <p className="CartDrawer__Empty Text--subdued">Your cart is empty.</p>
          ) : (
            items.map((item) => (
              <div className="CartDrawer__Item" key={item.key}>
                <div className="CartDrawer__ItemImage AspectRatio">
                  <img src={item.image} alt={item.title} />
                </div>
                <div className="CartDrawer__ItemInfo">
                  <p className="CartDrawer__ItemTitle Heading u-h6">{item.title}</p>
                  <p className="CartDrawer__ItemVariant Text--subdued u-h7">{item.size}</p>
                  <p className="CartDrawer__ItemPrice u-h7">{item.price}</p>
                  <div className="CartDrawer__ItemFooter">
                    <div className="QuantitySelector QuantitySelector--small">
                      <button
                        type="button"
                        className="QuantitySelector__Button"
                        aria-label="Decrease quantity"
                        onClick={() => updateQuantity(item.key, item.quantity - 1)}
                      >
                        −
                      </button>
                      <span className="QuantitySelector__Value">{item.quantity}</span>
                      <button
                        type="button"
                        className="QuantitySelector__Button"
                        aria-label="Increase quantity"
                        onClick={() => updateQuantity(item.key, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      className="CartDrawer__Remove Link--secondary u-h8"
                      onClick={() => removeItem(item.key)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="CartDrawer__Footer">
            <div className="CartDrawer__Note">
              <button
                type="button"
                className="CartDrawer__NoteToggle Heading u-h7"
                onClick={() => setNoteOpen((value) => !value)}
              >
                <span className={`CartDrawer__NoteIcon${noteOpen ? ' is-open' : ''}`}>+</span>
                Add Order Note
              </button>
              {noteOpen && (
                <textarea
                  className="Form__Input CartDrawer__NoteInput"
                  rows={3}
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                  placeholder="How can we help you?"
                />
              )}
            </div>

            <p className="CartDrawer__ShippingText Text--subdued u-h8">
              Shipping &amp; taxes calculated at checkout
            </p>
            <button type="button" className="Button Button--sweep Button--full" onClick={handleCheckout}>
              <span className="Button__Label">Checkout · {formatNaira(subtotal)}</span>
            </button>
          </div>
        )}
      </aside>
    </>
  );
}

export default CartDrawer;
