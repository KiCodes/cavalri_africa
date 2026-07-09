import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { usePageTitle } from '../hooks/usePageTitle';
import { useCart } from '../context/CartContext';
import products from '../data/products.json';
import './ProductPage.css';

const SIZES = ['S', 'M', 'L', 'XL', 'XXL'];

function buildSrc(product, width) {
  return `https:${product.imageBase}${width}x${product.imageExt}${
    product.v ? `?v=${product.v}` : ''
  }`;
}

function ProductPage() {
  const location = useLocation();
  const product = products.find((item) => item.handle === location.pathname);
  const { addItem } = useCart();

  usePageTitle(product ? product.title : 'Product not found');

  const [size, setSize] = useState(SIZES[0]);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <section className="PageHeader">
        <div className="Container">
          <div className="SectionHeader SectionHeader--center">
            <h1 className="SectionHeader__Heading Heading u-h1">Product not found</h1>
            <p className="SectionHeader__Description Text--subdued">
              <Link to="/" className="Link--secondary">Return to shop</Link>
            </p>
          </div>
        </div>
      </section>
    );
  }

  function handleAddToCart() {
    addItem(product, size, quantity, buildSrc(product, 300));
  }

  return (
    <section className="ProductSection">
      <div className="Container ProductSection__Inner">
        <div className="ProductSection__Gallery">
          <div className="AspectRatio">
            <img
              className="ProductSection__Image"
              src={buildSrc(product, 1200)}
              srcSet={`${buildSrc(product, 600)} 1x, ${buildSrc(product, 1200)} 2x`}
              alt={product.title}
            />
          </div>
        </div>

        <div className="ProductSection__Info">
          <h1 className="ProductSection__Title Heading u-h3">{product.title}</h1>
          <p className="ProductSection__Price Heading u-h5 Text--subdued">{product.price}</p>

          <div className="ProductSection__Option">
            <label className="ProductSection__OptionLabel Heading u-h7" htmlFor="product-size">
              Size: {size}
            </label>
            <select
              id="product-size"
              className="Form__Input ProductSection__Select"
              value={size}
              onChange={(event) => setSize(event.target.value)}
            >
              {SIZES.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="ProductSection__Option">
            <span className="ProductSection__OptionLabel Heading u-h7">Quantity</span>
            <div className="QuantitySelector">
              <button
                type="button"
                className="QuantitySelector__Button"
                aria-label="Decrease quantity"
                onClick={() => setQuantity((value) => Math.max(1, value - 1))}
              >
                −
              </button>
              <span className="QuantitySelector__Value">{quantity}</span>
              <button
                type="button"
                className="QuantitySelector__Button"
                aria-label="Increase quantity"
                onClick={() => setQuantity((value) => value + 1)}
              >
                +
              </button>
            </div>
          </div>

          <button
            type="button"
            className="Button Button--sweep Button--full ProductSection__AddToCart"
            onClick={handleAddToCart}
          >
            <span className="Button__Label">Add to Cart · {product.price}</span>
          </button>

          <Link to="/" className="ProductSection__Back Link--secondary">
            ← Back to all products
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ProductPage;
