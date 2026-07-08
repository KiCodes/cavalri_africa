import { useSearchParams } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';
import { usePageTitle } from '../hooks/usePageTitle';
import products from '../data/products.json';

function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  usePageTitle(query ? `Search: ${query}` : 'Search');

  const trimmed = query.trim().toLowerCase();
  const results = trimmed
    ? products.filter((p) => p.title.toLowerCase().includes(trimmed))
    : [];

  return (
    <>
      <section className="PageHeader">
        <div className="Container">
          <div className="SectionHeader SectionHeader--center">
            <h1 className="SectionHeader__Heading Heading u-h1">
              Search results for &quot;{query}&quot;
            </h1>
            <p className="SectionHeader__Description Text--subdued">
              {results.length} {results.length === 1 ? 'result' : 'results'}
            </p>
          </div>
        </div>
      </section>

      <div className="CollectionMain">
        {results.length > 0 ? (
          <ProductGrid products={results} mobileColumns={2} desktopColumns={4} />
        ) : (
          <div className="Container" style={{ textAlign: 'center', padding: '40px 0' }}>
            <p className="Text--subdued">
              No products found matching &quot;{query}&quot;.
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default SearchResultsPage;
