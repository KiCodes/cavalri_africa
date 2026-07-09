import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MEGA_MENUS, NAV_HREFS } from '../data/megaMenus';
import { useCart } from '../context/CartContext';
import MobileDrawer from './MobileDrawer';
import SearchOverlay from './SearchOverlay';
import CartDrawer from './CartDrawer';
import './Header.css';

const NAV_LINKS = ['Shop', 'About', 'Collections', 'Skate', 'Journal'];

function MegaMenu({ menu, onNavigate }) {
  return (
    <div className="MegaMenu">
      <div className="Container MegaMenu__Inner">
        <div className="MegaMenu__Columns">
          {menu.columns.map((col) => (
            <div className="MegaMenu__Column" key={col.title}>
              <Link
                to={col.titleHref || '#'}
                className="MegaMenu__Title Heading Text--subdued u-h7"
                onClick={onNavigate}
              >
                {col.title}
              </Link>
              {col.links.length > 0 && (
                <ul className="MegaMenu__Linklist">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link to={link.href || '#'} className="MegaMenu__Link" onClick={onNavigate}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <Link to={menu.push.href || '#'} className="MegaMenu__Push" onClick={onNavigate}>
          <div
            className="MegaMenu__PushImage"
            style={{ backgroundImage: `url(${menu.push.image})` }}
          />
          <p className="MegaMenu__PushHeading Heading u-h6">{menu.push.heading}</p>
          <p className="MegaMenu__PushSubHeading Heading Text--subdued u-h7">
            {menu.push.subheading}
          </p>
        </Link>
      </div>
    </div>
  );
}

function Header() {
  const [openMenu, setOpenMenu] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const cart = useCart();

  return (
    <header className="Header" onMouseLeave={() => setOpenMenu(null)}>
      <div className="Header__Wrapper">
        <div className="Header__FlexItem Header__FlexItem--fill">
          <button
            className="Header__Icon Header__MenuToggle"
            aria-label="Open navigation"
            onClick={() => setDrawerOpen(true)}
          >
            <svg viewBox="0 0 20 14">
              <path d="M0 14v-1h20v1H0zm0-7.5h20v1H0v-1zM0 0h20v1H0V0z" fill="currentColor" />
            </svg>
          </button>

          <nav className="Header__MainNav" aria-label="Main navigation">
            <ul className="HorizontalList HorizontalList--spacingExtraLoose">
              {NAV_LINKS.map((label) => {
                const menu = MEGA_MENUS[label];
                return (
                  <li
                    className="HorizontalList__Item"
                    key={label}
                    onMouseEnter={() => menu && setOpenMenu(label)}
                  >
                    <Link
                      to={NAV_HREFS[label] || '#'}
                      className={
                        'Heading u-h6' + (openMenu === label ? ' is-active' : '')
                      }
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        <div className="Header__FlexItem">
          <div className="Header__Logo">
            <Link to="/" className="Header__LogoLink">
              CAVALRI AFRICA
            </Link>
          </div>
        </div>

        <div className="Header__FlexItem Header__FlexItem--fill">
          <nav className="Header__SecondaryNav">
            <ul className="HorizontalList HorizontalList--spacingLoose">
              <li className="HorizontalList__Item">
                <div className="Select Select--transparent">
                  <select className="CurrencySelector__Select u-h8" defaultValue="NGN">
                    <option value="NGN">NGN</option>
                    <option value="USD">USD</option>
                    <option value="CAD">CAD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                  </select>
                </div>
              </li>
              <li className="HorizontalList__Item">
                <Link to="/account" className="Heading Link--primary Text--subdued u-h8">
                  Account
                </Link>
              </li>
              <li className="HorizontalList__Item">
                <button
                  type="button"
                  className="Heading Link--primary Text--subdued u-h8"
                  onClick={() => setSearchOpen(true)}
                >
                  Search
                </button>
              </li>
              <li className="HorizontalList__Item">
                <button type="button" className="Heading u-h6" onClick={cart.open}>
                  Cart (<span>{cart.count}</span>)
                </button>
              </li>
            </ul>
          </nav>

          <button
            className="Header__Icon Header__CartToggle"
            aria-label="Open cart"
            onClick={cart.open}
          >
            <svg viewBox="0 0 17 20">
              <path
                d="M0 20V4.995l1 .006v.015l4-.002V4c0-2.484 1.274-4 3.5-4C10.518 0 12 1.48 12 4v1.012l5-.003v.985H1V19h15V6.005h1V20H0zM11 4.49C11 2.267 10.507 1 8.5 1 6.5 1 6 2.27 6 4.49V5l5-.002V4.49z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
      </div>

      {openMenu && MEGA_MENUS[openMenu] && (
        <MegaMenu menu={MEGA_MENUS[openMenu]} onNavigate={() => setOpenMenu(null)} />
      )}

      <MobileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onOpenSearch={() => setSearchOpen(true)}
      />

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />

      <CartDrawer />
    </header>
  );
}

export default Header;
