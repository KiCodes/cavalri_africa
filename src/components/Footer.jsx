import './Footer.css';

const CUSTOMER_CARE_LINKS = [
  'Sizing Chart',
  'Terms of Use',
  'Privacy Policy',
  'Return & Refund Policy',
  'Shipping Information',
  'Jobs',
];

function Footer() {
  return (
    <footer className="custom-footer" role="contentinfo">
      <div className="custom-footer__inner container">
        <div className="custom-footer__columns">
          <div className="custom-footer__col">
            <h3 className="custom-footer__title">Newsletter</h3>
            <p>Subscribe to receive updates, access to exclusive deals and more.</p>
            <form
              className="footer__newsletter-form"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                className="footer__newsletter-input"
                placeholder="Enter your email"
                required
              />
              <button type="submit" className="footer__newsletter-submit">
                Subscribe
              </button>
            </form>
          </div>

          <div className="custom-footer__col">
            <h3 className="custom-footer__title">CUSTOMER CARE</h3>
            <ul className="custom-footer__list">
              {CUSTOMER_CARE_LINKS.map((label) => (
                <li key={label}>
                  <a href="#">{label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="custom-footer__bottom">
          <p className="custom-footer__copyright">© 2025 Cavalri Africa.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
