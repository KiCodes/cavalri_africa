import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CollectionToolbar from '../components/CollectionToolbar';
import ProductGrid from '../components/ProductGrid';
import Pagination from '../components/Pagination';
import { usePageTitle } from '../hooks/usePageTitle';
import products from '../data/products.json';

const PAGE_SIZE = 48;

function categoryLabel(slug) {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('-');
}

function CollectionPage() {
  const { category } = useParams();
  const isFiltered = category && category !== 'all';
  const heading = isFiltered ? categoryLabel(category) : 'All';

  usePageTitle(heading);

  const [mobileColumns, setMobileColumns] = useState(2);
  const [desktopColumns, setDesktopColumns] = useState(4);
  const [sortValue, setSortValue] = useState('manual');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [category]);

  const filteredProducts = isFiltered
    ? products.filter((product) => product.category.toLowerCase() === category)
    : products;

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));
  const pageProducts = filteredProducts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <>
      <section className="PageHeader">
        <div className="Container">
          <div className="SectionHeader SectionHeader--center">
            <h1 className="SectionHeader__Heading Heading u-h1">{heading}</h1>
          </div>
        </div>
      </section>

      <CollectionToolbar
        mobileColumns={mobileColumns}
        onMobileColumnsChange={setMobileColumns}
        desktopColumns={desktopColumns}
        onDesktopColumnsChange={setDesktopColumns}
        sortValue={sortValue}
        onSortChange={setSortValue}
      />

      <div className="CollectionMain">
        {pageProducts.length > 0 ? (
          <ProductGrid
            products={pageProducts}
            mobileColumns={mobileColumns}
            desktopColumns={desktopColumns}
          />
        ) : (
          <p className="Text--subdued" style={{ textAlign: 'center', padding: '40px 0' }}>
            No products found in this category.
          </p>
        )}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  );
}

export default CollectionPage;
