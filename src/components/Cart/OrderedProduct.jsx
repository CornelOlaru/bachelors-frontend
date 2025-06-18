const OrderedProduct = ({ product }) => {
  return (
    <div className="ordered-item">
      <div className="ordered-info">
        <span className="ordered-name">
          {product.product?.name || product.name}
        </span>
        <span className="ordered-qty">x{product.quantity}</span>
      </div>
      <div className="ordered-price">
        {product.price * product.quantity} lei
      </div>
    </div>
  );
};

export default OrderedProduct;
