import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import Layout from '@/components/Layout';
import CartItem from '@/components/CartItem';
import { useCart } from '@/context/CartContext';

const Cart = () => {
  const { cart, totalPrice, clearCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const shippingCost = totalPrice >= 5000 ? 0 : 299;
  const finalTotal = totalPrice + shippingCost;

  if (cart.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 lg:py-24">
          <div className="max-w-md mx-auto text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
              <ShoppingBag className="text-muted-foreground" size={32} />
            </div>
            <h1 className="font-display text-2xl lg:text-3xl font-semibold text-foreground mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added any items to your cart yet. Start shopping to discover our curated collection.
            </p>
            <Link to="/products" className="btn-primary inline-flex items-center gap-2">
              Start Shopping
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display text-3xl lg:text-4xl font-semibold text-foreground">
            Shopping Cart
          </h1>
          <button
            onClick={clearCart}
            className="text-sm text-muted-foreground hover:text-destructive transition-fast"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="divide-y divide-border">
              {cart.map((item) => (
                <CartItem key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`} item={item} />
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-lg p-6 shadow-soft sticky top-24">
              <h2 className="font-display text-xl font-semibold text-foreground mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 pb-6 border-b border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground font-medium">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-foreground font-medium">
                    {shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}
                  </span>
                </div>
                {totalPrice < 5000 && (
                  <p className="text-xs text-gold">
                    Add {formatPrice(5000 - totalPrice)} more for free shipping
                  </p>
                )}
              </div>

              <div className="flex justify-between py-6">
                <span className="font-medium text-foreground">Total</span>
                <span className="text-xl font-semibold text-foreground">
                  {formatPrice(finalTotal)}
                </span>
              </div>

              <Link
                to="/checkout"
                className="w-full btn-gold flex items-center justify-center gap-2"
              >
                Proceed to Checkout
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/products"
                className="w-full mt-4 btn-secondary flex items-center justify-center gap-2"
              >
                Continue Shopping
              </Link>

              {/* Promo Code */}
              <div className="mt-6 pt-6 border-t border-border">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Promo Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="flex-1 input-styled text-sm"
                  />
                  <button className="px-4 py-2 bg-secondary text-secondary-foreground text-sm font-medium rounded-md hover:bg-muted transition-fast">
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
