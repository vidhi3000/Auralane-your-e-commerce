import { Link } from 'react-router-dom';
import { Minus, Plus, X } from 'lucide-react';
import { CartItem as CartItemType } from '@/types';
import { useCart } from '@/context/CartContext';

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  const { updateQuantity, removeFromCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="flex gap-4 py-6 border-b border-border animate-fade-in">
      {/* Product Image */}
      <Link to={`/product/${item.product.id}`} className="flex-shrink-0">
        <div className="w-24 h-32 lg:w-32 lg:h-40 overflow-hidden rounded-lg bg-cream-dark">
          <img
            src={item.product.image}
            alt={item.product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>

      {/* Product Details */}
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between">
          <div>
            <Link to={`/product/${item.product.id}`}>
              <h3 className="font-display text-lg font-medium text-foreground hover:text-gold transition-fast">
                {item.product.name}
              </h3>
            </Link>
            <p className="text-sm text-muted-foreground mt-1">
              {item.selectedSize && `Size: ${item.selectedSize}`}
              {item.selectedSize && item.selectedColor && ' | '}
              {item.selectedColor && `Color: ${item.selectedColor}`}
            </p>
          </div>
          <button
            onClick={() => removeFromCart(item.product.id)}
            className="p-1 text-muted-foreground hover:text-destructive transition-fast"
            aria-label="Remove item"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mt-auto flex items-end justify-between">
          {/* Quantity Controls */}
          <div className="flex items-center border border-border rounded-md">
            <button
              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
              className="p-2 text-foreground hover:bg-muted transition-fast"
              aria-label="Decrease quantity"
            >
              <Minus size={16} />
            </button>
            <span className="w-12 text-center text-sm font-medium">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
              className="p-2 text-foreground hover:bg-muted transition-fast"
              aria-label="Increase quantity"
            >
              <Plus size={16} />
            </button>
          </div>

          {/* Price */}
          <div className="text-right">
            <p className="text-lg font-medium text-foreground">
              {formatPrice(item.product.price * item.quantity)}
            </p>
            {item.quantity > 1 && (
              <p className="text-xs text-muted-foreground">
                {formatPrice(item.product.price)} each
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
