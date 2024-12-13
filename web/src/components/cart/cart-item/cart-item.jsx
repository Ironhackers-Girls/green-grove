function CartItem({ product, onDeleteCart }) {
  return (
    <div className="card mb-3">
      <div className="row g-0">
        <div className="col-md-4">
          <img
            src={product.image}
            className="img-fluid rounded-start"
            alt="cart image"
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{product.name}</h5>
            <p className="card-text">
              {product.description}.
            </p>
            <p className="card-text">
              <small className="text-body-secondary">
                Last updated 3 mins ago
              </small>
            </p>
          </div>
        </div>
        <button  className="btn btn-secondary">
          fav
        </button>
        <button  className="btn btn-danger" onClick={() => onDeleteCart(product)}>
          delete
        </button>
      </div>
    </div>
  );
}

export default CartItem;