import { useState } from 'react';
import './CollectionToolbar.css';

const SORT_OPTIONS = [
  { value: 'manual', label: 'Featured' },
  { value: 'price-ascending', label: 'Price: Low to High' },
  { value: 'price-descending', label: 'Price: High to Low' },
  { value: 'title-ascending', label: 'Alphabetically: A-Z' },
  { value: 'title-descending', label: 'Alphabetically: Z-A' },
  { value: 'created-ascending', label: 'Oldest to Newest' },
  { value: 'created-descending', label: 'Newest to Oldest' },
  { value: 'best-selling', label: 'Best Selling' },
];

function CollectionToolbar({
  mobileColumns,
  onMobileColumnsChange,
  desktopColumns,
  onDesktopColumnsChange,
  sortValue,
  onSortChange,
}) {
  const [sortOpen, setSortOpen] = useState(false);

  return (
    <div className="CollectionToolbar">
      <div className="CollectionToolbar__Group">
        <button
          type="button"
          className="CollectionToolbar__Item CollectionToolbar__Item--sort Heading Text--subdued u-h6"
          aria-expanded={sortOpen}
          onClick={() => setSortOpen((open) => !open)}
        >
          Sort
          <svg className="Icon Icon--select-arrow" viewBox="0 0 19 12">
            <polyline
              fill="none"
              stroke="currentColor"
              points="17 2 9.5 10 2 2"
              strokeWidth="2"
              strokeLinecap="square"
            />
          </svg>
        </button>

        {sortOpen && (
          <ul className="CollectionToolbar__SortMenu">
            {SORT_OPTIONS.map((opt) => (
              <li key={opt.value}>
                <button
                  type="button"
                  className={
                    'Heading Link--primary u-h6' +
                    (sortValue === opt.value ? ' is-selected' : '')
                  }
                  onClick={() => {
                    onSortChange(opt.value);
                    setSortOpen(false);
                  }}
                >
                  {opt.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="CollectionToolbar__Item CollectionToolbar__Item--layout">
        <div className="CollectionToolbar__LayoutSwitch CollectionToolbar__LayoutSwitch--mobile">
          <button
            aria-label="Show one product per row"
            className={
              'CollectionToolbar__LayoutType' + (mobileColumns === 1 ? ' is-active' : '')
            }
            onClick={() => onMobileColumnsChange(1)}
          >
            <svg className="Icon Icon--wall-1" viewBox="0 0 36 36">
              <rect fill="currentColor" width="36" height="36" />
            </svg>
          </button>
          <button
            aria-label="Show two products per row"
            className={
              'CollectionToolbar__LayoutType' + (mobileColumns === 2 ? ' is-active' : '')
            }
            onClick={() => onMobileColumnsChange(2)}
          >
            <svg className="Icon Icon--wall-2" viewBox="0 0 36 36">
              <path
                fill="currentColor"
                d="M21 36V21h15v15H21zm0-36h15v15H21V0zM0 21h15v15H0V21zM0 0h15v15H0V0z"
              />
            </svg>
          </button>
        </div>

        <div className="CollectionToolbar__LayoutSwitch CollectionToolbar__LayoutSwitch--desktop">
          <button
            aria-label="Show two products per row"
            className={
              'CollectionToolbar__LayoutType' + (desktopColumns === 2 ? ' is-active' : '')
            }
            onClick={() => onDesktopColumnsChange(2)}
          >
            <svg className="Icon Icon--wall-2" viewBox="0 0 36 36">
              <path
                fill="currentColor"
                d="M21 36V21h15v15H21zm0-36h15v15H21V0zM0 21h15v15H0V21zM0 0h15v15H0V0z"
              />
            </svg>
          </button>
          <button
            aria-label="Show four products per row"
            className={
              'CollectionToolbar__LayoutType' + (desktopColumns === 4 ? ' is-active' : '')
            }
            onClick={() => onDesktopColumnsChange(4)}
          >
            <svg className="Icon Icon--wall-4" viewBox="0 0 36 36">
              <path
                fill="currentColor"
                d="M28 36v-8h8v8h-8zm0-22h8v8h-8v-8zm0-14h8v8h-8V0zM14 28h8v8h-8v-8zm0-14h8v8h-8v-8zm0-14h8v8h-8V0zM0 28h8v8H0v-8zm0-14h8v8H0v-8zM0 0h8v8H0V0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CollectionToolbar;
