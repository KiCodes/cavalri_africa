import { useState } from 'react';
import CollectionToolbar from '../components/CollectionToolbar';
import ProductGrid from '../components/ProductGrid';
import Pagination from '../components/Pagination';
import { usePageTitle } from '../hooks/usePageTitle';
import products from '../data/products.json';

const PAGE_SIZE = 48;
const TOTAL_PAGES = 3;

function CollectionPage() {
  usePageTitle('All');
  const [mobileColumns, setMobileColumns] = useState(2);
  const [desktopColumns, setDesktopColumns] = useState(4);
  const [sortValue, setSortValue] = useState('manual');
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <>
      <section className="PageHeader">
        <div className="Container">
          <div className="SectionHeader SectionHeader--center">
            <h1 className="SectionHeader__Heading Heading u-h1">All</h1>
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
        <ProductGrid
          products={products.slice(0, PAGE_SIZE)}
          mobileColumns={mobileColumns}
          desktopColumns={desktopColumns}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={TOTAL_PAGES}
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  );
}

export default CollectionPage;
