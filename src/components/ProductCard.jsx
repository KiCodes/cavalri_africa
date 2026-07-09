import { Link } from 'react-router-dom';
import './ProductCard.css';

function buildSrc(product, width) {
  return `https:${product.imageBase}${width}x${product.imageExt}${
    product.v ? `?v=${product.v}` : ''
  }`;
}

function ProductCard({ product }) {
  return (
    <div className="ProductItem">
      <div className="ProductItem__Wrapper">
        <Link to={product.handle} className="ProductItem__ImageWrapper">
          <div className="AspectRatio">
            <img
              className="ProductItem__Image"
              src={buildSrc(product, 600)}
              srcSet={`${buildSrc(product, 600)} 1x, ${buildSrc(product, 1200)} 2x`}
              alt={product.title}
              loading="lazy"
            />
          </div>
        </Link>
        <div className="ProductItem__Info">
          <h2 className="ProductItem__Title Heading u-h6">
            <Link to={product.handle}>{product.title}</Link>
          </h2>
          <div className="ProductItem__PriceList Heading u-h6">
            <span className="ProductItem__Price Text--subdued">{product.price}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
