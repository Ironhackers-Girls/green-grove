function CartItem({ product, onDeleteCart, onIncrement, onDecrement }) {
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
            <p className="card-text">{product.description}.</p>
            <p className="card-text">
              <small className="text-body-secondary">
                Quantity: {product.quantity}
              </small>
            </p>
            <div className="d-flex align-items-center gap-2">
              <button
                className="btn btn-outline-primary"
                onClick={() => onDecrement(product)}
                disabled={product.quantity <= 1}
              >
                -
              </button>
              <p>{product.quantity}</p>
              <button
                className="btn btn-outline-primary"
                onClick={() => onIncrement(product)}
              >
                +
              </button>
              <p>Price: ${product.price}</p>
              <p>Total: ${(product.price * product.quantity).toFixed(2)}</p>
            </div>
          </div>

          <button className="btn btn-secondary">fav</button>

          <button
            className="btn btn-danger"
            onClick={() => onDeleteCart(product)}
          >
            delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
