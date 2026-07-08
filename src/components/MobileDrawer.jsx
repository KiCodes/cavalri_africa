import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MEGA_MENUS } from '../data/megaMenus';
import './MobileDrawer.css';

const NAV_ITEMS = ['Shop', 'About', 'Collections', 'Skate', 'Journal'];

const SOCIAL_LINKS = [
  {
    name: 'Facebook',
    path: 'M13 21v-8h3l1-4h-4V7c0-1.1.3-2 2-2h2V1.1C16.6 1 15.3 1 13.9 1 10.9 1 9 2.8 9 6.2V9H6v4h3v8h4z',
  },
  {
    name: 'Twitter',
    path: 'M22 5.9c-.7.3-1.5.6-2.3.7.8-.5 1.5-1.3 1.8-2.3-.8.5-1.7.8-2.6 1a4.1 4.1 0 0 0-7 3.7A11.6 11.6 0 0 1 3.4 4.6a4.1 4.1 0 0 0 1.3 5.5c-.6 0-1.3-.2-1.8-.5v.1c0 2 1.4 3.6 3.3 4a4.2 4.2 0 0 1-1.8.1c.5 1.6 2 2.8 3.8 2.8A8.3 8.3 0 0 1 2 18.6 11.6 11.6 0 0 0 8.3 20.5c7.5 0 11.7-6.3 11.7-11.7v-.5c.8-.6 1.5-1.3 2-2.1z',
  },
  {
    name: 'Instagram',
    path: 'M12 2c2.7 0 3.1 0 4.1.1 1.1 0 1.8.2 2.3.4a4.6 4.6 0 0 1 2.7 2.7c.2.5.4 1.2.4 2.3.1 1 .1 1.4.1 4.1s0 3.1-.1 4.1c0 1.1-.2 1.8-.4 2.3a4.6 4.6 0 0 1-2.7 2.7c-.5.2-1.2.4-2.3.4-1 .1-1.4.1-4.1.1s-3.1 0-4.1-.1c-1.1 0-1.8-.2-2.3-.4a4.6 4.6 0 0 1-2.7-2.7c-.2-.5-.4-1.2-.4-2.3C2 15.1 2 14.7 2 12s0-3.1.1-4.1c0-1.1.2-1.8.4-2.3a4.6 4.6 0 0 1 2.7-2.7c.5-.2 1.2-.4 2.3-.4C8.9 2 9.3 2 12 2zm0 3.6a6.4 6.4 0 1 0 0 12.8 6.4 6.4 0 0 0 0-12.8zm0 10.6a4.2 4.2 0 1 1 0-8.4 4.2 4.2 0 0 1 0 8.4zm6.6-10.8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z',
  },
  {
    name: 'Vimeo',
    path: 'M22 7.4c-.1 2-1.5 4.6-4.2 8-2.8 3.5-5.2 5.3-7.1 5.3-1.2 0-2.2-1.1-3-3.3C6.9 14 6 9.6 4.8 9.6c-.3 0-1.1.5-2.5 1.6L1 9.7c1.6-1.4 3.1-2.9 4.6-4.4 2-1.8 3.6-2.8 4.6-2.9 2.4-.2 3.9 1.4 4.4 4.9.6 3.7 1 6 1.3 6.9.7 1.7 1.5 1.2 2.4-1.4.6-1.7.9-3 .8-3.9-.1-1.5-1.1-1.4-2.9-.7 1-3.4 3-5.1 5.8-5C21.4 3.2 22.2 4.7 22 7.4z',
  },
];

function MobileDrawer({ open, onClose, onOpenSearch }) {
  const [expanded, setExpanded] = useState(null);

  if (!open) return null;

  return (
    <div className="MobileDrawer__Overlay" onClick={onClose}>
      <aside className="MobileDrawer" onClick={(e) => e.stopPropagation()}>
        <div className="MobileDrawer__Header">
          <button
            className="MobileDrawer__Close"
            aria-label="Close menu"
            onClick={onClose}
          >
            <svg viewBox="0 0 16 14">
              <path d="M15 0L1 14m14 0L1 0" stroke="currentColor" fill="none" />
            </svg>
          </button>
        </div>

        <ul className="MobileDrawer__Nav">
          {NAV_ITEMS.map((label) => {
            const menu = MEGA_MENUS[label];
            const isExpanded = expanded === label;
            return (
              <li key={label} className="MobileDrawer__NavItem">
                <button
                  className="MobileDrawer__NavButton"
                  onClick={() => setExpanded(isExpanded ? null : label)}
                >
                  <span className="Heading u-h6">{label}</span>
                  <span className={'MobileDrawer__Toggle' + (isExpanded ? ' is-open' : '')}>
                    +
                  </span>
                </button>

                {menu && isExpanded && (
                  <ul className="MobileDrawer__Submenu">
                    {menu.columns.flatMap((col) => [
                      <li key={col.title} className="MobileDrawer__SubmenuTitle">
                        {col.title}
                      </li>,
                      ...col.links.map((link) => (
                        <li key={link.label}>
                          <Link to={link.href || '#'} onClick={onClose}>
                            {link.label}
                          </Link>
                        </li>
                      )),
                    ])}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>

        <ul className="MobileDrawer__SecondaryNav">
          <li>
            <Link to="/account" className="Text--subdued" onClick={onClose}>
              Account
            </Link>
          </li>
          <li>
            <button
              type="button"
              className="Text--subdued"
              onClick={() => {
                onClose();
                onOpenSearch();
              }}
            >
              Search
            </button>
          </li>
        </ul>

        <div className="MobileDrawer__Footer">
          <div className="Select Select--transparent">
            <select className="CurrencySelector__Select u-h8" defaultValue="NGN">
              <option value="NGN">NGN</option>
              <option value="USD">USD</option>
              <option value="CAD">CAD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>
          </div>
          <div className="MobileDrawer__Social">
            {SOCIAL_LINKS.map((social) => (
              <a href="#" key={social.name} aria-label={social.name}>
                <svg viewBox="0 0 24 24">
                  <path d={social.path} fill="currentColor" />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}

export default MobileDrawer;
