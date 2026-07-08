import ProductCard from './ProductCard';
import './ProductGrid.css';

function ProductGrid({ products, mobileColumns, desktopColumns }) {
  return (
    <div
      className="ProductList"
      style={{ '--mobile-columns': mobileColumns, '--desktop-columns': desktopColumns }}
    >
      {products.map((product) => (
        <div className="Grid__Cell" key={product.handle}>
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}

export default ProductGrid;
