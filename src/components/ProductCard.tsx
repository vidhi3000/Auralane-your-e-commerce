import { Link } from 'react-router-dom';
import { ShoppingBag, Heart } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useAuth } from '@/context/AuthContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { user } = useAuth();

  const inWishlist = isInWishlist(String(product.id));

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, product.sizes[0], product.colors[0]);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(String(product.id));
    } else {
      addToWishlist(String(product.id));
    }
  };

  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="card-product">
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-cream-dark">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          
          {/* Wishlist Button */}
          <button
            onClick={handleWishlistToggle}
            className={`absolute top-4 right-4 p-2 rounded-full transition-all duration-300 ${
              inWishlist 
                ? 'bg-gold text-primary' 
                : 'bg-background/80 text-foreground hover:bg-gold hover:text-primary'
            }`}
            aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart size={18} fill={inWishlist ? 'currentColor' : 'none'} />
          </button>
          
          {/* Quick Add Button */}
          <button
            onClick={handleQuickAdd}
            className="absolute bottom-4 left-4 right-4 py-3 bg-primary/90 text-primary-foreground text-sm font-medium tracking-wide uppercase flex items-center justify-center gap-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-gold"
          >
            <ShoppingBag size={16} />
            Quick Add
          </button>

          {/* Category Badge */}
          <span className="absolute top-4 left-4 px-3 py-1 bg-background/90 text-xs font-medium tracking-wide uppercase text-foreground">
            {product.category}
          </span>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="font-display text-lg font-medium text-foreground group-hover:text-gold transition-fast line-clamp-1">
            {product.name}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>
          <p className="mt-2 text-base font-medium text-foreground">
            {formatPrice(product.price)}
          </p>
          
          {/* Color Options */}
          <div className="mt-3 flex gap-2">
            {product.colors.slice(0, 3).map((color, index) => (
              <span
                key={index}
                className="text-xs text-muted-foreground"
              >
                {color}{index < Math.min(product.colors.length, 3) - 1 && ','}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
