import "./productModal.css"

const ProductModal = ({product, onAddToCart}) => {
    
  return (
    <div className="product-modal">
        <div className="product-modal-content">

      <img src={product.imageUrl} alt={product.name} className="product-modal-img" />
      <h3 className="product-modal-title">{product.name}</h3>
      <div className="product-modal-weight">{product.weight}g</div>
      <div className="product-modal-desc">{product.description}</div>
      <div className="product-modal-price">{product.price} lei</div>
        </div>
      <button className="product-modal-add" onClick={() => onAddToCart(product, 1)}>
        Adaugă în coș
      </button>
    </div>
  )}

export default ProductModal
