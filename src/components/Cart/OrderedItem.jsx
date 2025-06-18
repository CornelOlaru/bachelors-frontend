import OrderedProduct from "./OrderedProduct";

const OrderedItem = ({ order }) => {
  const total =
    order.totalPrice ||
    (order.items?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0);

  return (
    <div className="ordered-order">
      <div className="ordered-header">
        <span>Total: {total} lei</span>
      </div>
      <div className="ordered-products">
        {order.items?.length > 0 ? (
          order.items.map((prod, idx) => (
            <OrderedProduct key={idx} product={prod} />
          ))
        ) : (
          <div className="empty-ordered">Fără produse în comandă.</div>
        )}
      </div>
    </div>
  );
};

export default OrderedItem;
