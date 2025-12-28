import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import Layout from '@/components/Layout';
import ProductGrid from '@/components/ProductGrid';
import { products } from '@/data/products';
import { useWishlist } from '@/context/WishlistContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';

const Wishlist = () => {
  const { wishlist } = useWishlist();
  const { user } = useAuth();

  const wishlistProducts = useMemo(() => {
    return products.filter(product => wishlist.includes(String(product.id)));
  }, [wishlist]);

  if (!user) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <Heart className="mx-auto mb-6 text-muted-foreground" size={64} strokeWidth={1} />
          <h1 className="font-display text-3xl font-semibold text-foreground mb-4">Your Wishlist</h1>
          <p className="text-muted-foreground mb-8">
            Please sign in to view and manage your wishlist
          </p>
          <Link to="/auth">
            <Button className="bg-primary text-primary-foreground hover:bg-charcoal">
              Sign In
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  if (wishlistProducts.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <Heart className="mx-auto mb-6 text-muted-foreground" size={64} strokeWidth={1} />
          <h1 className="font-display text-3xl font-semibold text-foreground mb-4">Your Wishlist is Empty</h1>
          <p className="text-muted-foreground mb-8">
            Save your favorite items by clicking the heart icon on any product
          </p>
          <Link to="/products">
            <Button className="bg-primary text-primary-foreground hover:bg-charcoal">
              Explore Products
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="mb-8">
          <h1 className="font-display text-3xl lg:text-4xl font-semibold text-foreground mb-2">
            Your Wishlist
          </h1>
          <p className="text-muted-foreground">
            {wishlistProducts.length} {wishlistProducts.length === 1 ? 'item' : 'items'} saved
          </p>
        </div>

        <ProductGrid products={wishlistProducts} />
      </div>
    </Layout>
  );
};

export default Wishlist;
