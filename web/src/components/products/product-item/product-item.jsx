import { Link } from "react-router-dom";

function ProductItem({ product, onAddCart }) {
  return (
    <Link key={product.id} to={`/products/${product.id}`}>
      <div className="card">
        <img src={product.image} className="card-img-top" alt="product image" />
        <div className="card-body">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text">{product.price}</p>
          <button  className="btn btn-primary" onClick={() => onAddCart(product)}>
            carrito
          </button>
          <button  className="btn btn-secondary">
            fav
          </button>
        </div>
      </div>
    </Link>
  );
}

export default ProductItem;
