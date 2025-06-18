import OrderedItem from "./OrderedItem";
import Modal from "../modal/Modal";
import PaymentModal from "../../pages/paymentModal/PaymentModal";

const OrderedItemList = ({ orders }) => {
  return (
    <>
      {orders.map((order) => (
        <OrderedItem key={order._id} order={order} />
      ))}
    </>
  );
};

export default OrderedItemList;
