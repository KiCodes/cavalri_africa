import './Pagination.css';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="Pagination Text--subdued">
      <div className="Pagination__Nav">
        {pages.map((page) => (
          <button
            key={page}
            className={
              'Pagination__NavItem' + (page === currentPage ? ' is-active' : '')
            }
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}
        {currentPage < totalPages && (
          <button
            className="Pagination__NavItem"
            aria-label="Next page"
            onClick={() => onPageChange(currentPage + 1)}
          >
            <svg viewBox="0 0 11 18">
              <path
                d="M1.5 1.5l8 7.5-8 7.5"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="square"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

export default Pagination;
