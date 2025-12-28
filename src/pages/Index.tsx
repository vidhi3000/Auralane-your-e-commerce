import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Truck, RefreshCw } from 'lucide-react';
import Layout from '@/components/Layout';
import ProductGrid from '@/components/ProductGrid';
import { products } from '@/data/products';
import ProfileList from "@/pages/ProfileList";

const Index = () => {
  const featuredProducts = products.slice(0, 4);
  const womenProducts = products.filter(p => p.category === 'women').slice(0, 4);

  return (
    <Layout>
      
      
      
      
      {/* Hero Section */}
      
   <section 
   className="relative min-h-[90vh] lg:min-h-screen overflow-hidden bg-[hsl(0,72%,45%)]">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-black/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-black/5 rounded-full translate-x-1/3 translate-y-1/3" />
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-white/5 rounded-full" />
        
        <div className="container mx-auto px-4 h-full">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center min-h-[90vh] lg:min-h-screen py-20">
            {/* Left Image - Woman */}
            <div className="hidden lg:flex justify-center items-end relative z-10">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=80"
                  alt="Women's fashion"
                  className="w-full max-w-sm h-[500px] object-cover rounded-lg shadow-2xl animate-fade-in"
                  style={{ animationDelay: '100ms' }}
                />
                <div className="absolute -bottom-4 -right-4 bg-white text-[hsl(0,72%,45%)] px-5 py-2.5 rounded-full font-bold uppercase text-xs tracking-wider animate-fade-in hover:bg-black hover:text-white" style={{ animationDelay: '400ms' }}>
                  For Her
                </div>
              </div>
            </div>
            
            {/* Center Text Content */}
            <div className="text-center z-10 order-first lg:order-none">
              <p className="text-white/80 font-medium tracking-[0.3em] uppercase text-xs mb-6 animate-fade-in">
                New Drop 2025
              </p>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[0.9] mb-8 animate-fade-in" style={{ animationDelay: '100ms' }}>
                MAKE YOUR
                <br />
                <span className="text-black">STATEMENT</span>
              </h1>
               <p className="text-white/90 text-lg md:text-xl mb-10 max-w-md mx-auto animate-fade-in" style={{ animationDelay: '200ms' }}>
                Bold designs for those who dare to stand out. Streetwear redefined.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '300ms' }}>
                <Link to="/products?category=women" className="group inline-flex items-center justify-center gap-3 bg-white
                 text-[hsl(0,72%,45%)] px-8 py-4 font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-all duration-300">
                  Shop Women
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                 <Link to="/products?category=men" className="group inline-flex items-center justify-center gap-3 bg-white
                 text-[hsl(0,72%,45%)] px-8 py-4 font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-all duration-300">
                  Shop Men
                </Link>
              </div>
            </div>
             {/* Right Image - Man */}
            <div className="hidden lg:flex justify-center items-end relative z-10">
              <div className="relative">
                <img
                   src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=600&q=80"
                  alt="Men's fashion"
                  className="w-full max-w-sm h-[500px] object-cover rounded-lg shadow-2xl animate-fade-in"
                  style={{ animationDelay: '150ms' }}
                />
                <div className="absolute -bottom-4 -left-4 bg-white text-red-700 px-5 py-2.5 rounded-full font-bold uppercase text-xs tracking-wider animate-fade-in hover:bg-black hover:text-white" style={{ animationDelay: '450ms' }}>
                  For Him
                </div>
              </div>
            </div>

            {/* Mobile Images */}
            <div className="lg:hidden flex justify-center gap-4 mt-8">
              <Link to="/products?category=women" className="relative flex-1 max-w-[160px] group">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80"
                  alt="Women's fashion"
                  className="w-full h-48 object-cover rounded-lg shadow-xl group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white text-[hsl(0,72%,45%)] px-3 py-1 rounded-full font-bold uppercase text-[10px] tracking-wider hover:bg-black hover:text-white transition-colors">Her</span>
              </Link>
              <Link to="/products?category=men" className="relative flex-1 max-w-[160px] group">
                <img
                  src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=400&q=80"
                  alt="Men's fashion"
                  className="w-full h-48 object-cover rounded-lg shadow-xl group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-black text-white px-3 py-1 rounded-full font-bold uppercase text-[10px] tracking-wider hover:bg-black hover:text-white transition-colors">Him</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
         {/* Profile List Section */}
  <section className="py-16 lg:py-24 bg-gray-50">
    <div className="container mx-auto px-4">
      <h2 className="text-2xl lg:text-3xl font-display font-semibold text-foreground mb-6">
        User Profiles
      </h2>
      <ProfileList />
    </div>
  </section>

      {/* Features */}
      <section className="py-12 lg:py-16 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4 justify-center">
              <div className="p-3 bg-gold/10 rounded-full">
                <Truck className="text-gold" size={24} />
              </div>
              <div>
                <h3 className="font-medium text-foreground">Free Shipping</h3>
                <p className="text-sm text-muted-foreground">On orders over ₹1500</p>
              </div>
            </div>
            <div className="flex items-center gap-4 justify-center">
              <div className="p-3 bg-gold/10 rounded-full">
                <RefreshCw className="text-gold" size={24} />
              </div>
              <div>
                <h3 className="font-medium text-foreground">Easy Returns</h3>
                <p className="text-sm text-muted-foreground">15-day return policy</p>
              </div>
            </div>
            <div className="flex items-center gap-4 justify-center">
              <div className="p-3 bg-gold/10 rounded-full">
                <Sparkles className="text-gold" size={24} />
              </div>
              <div>
                <h3 className="font-medium text-foreground">Premium Quality</h3>
                <p className="text-sm text-muted-foreground">Handpicked materials</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-gold font-medium tracking-widest uppercase text-sm mb-2">Curated Selection</p>
              <h2 className="font-display text-3xl lg:text-4xl font-semibold text-foreground">
                Featured Pieces
              </h2>
            </div>
            <Link to="/products" className="hidden sm:flex items-center gap-2 text-sm font-medium text-foreground hover:text-gold transition-fast">
              View All
              <ArrowRight size={16} />
            </Link>
          </div>
          <ProductGrid products={featuredProducts} />
          <div className="mt-8 text-center sm:hidden">
            <Link to="/products" className="btn-secondary inline-flex items-center gap-2">
              View All Products
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Category Banner */}
      <section className="py-16 lg:py-24 bg-cream-dark">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Women */}
            <Link to="/products?category=women" className="group relative h-96 lg:h-[500px] overflow-hidden rounded-lg">
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 to-transparent z-10" />
              <img
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80"
                alt="Women's collection"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-8 left-8 z-20">
                <h3 className="font-display text-3xl lg:text-4xl font-semibold text-cream mb-2">
                  Women
                </h3>
                <span className="flex items-center gap-2 text-cream/80 group-hover:text-gold transition-fast">
                  Explore Collection
                  <ArrowRight size={18} />
                </span>
              </div>
            </Link>

            {/* Men */}
            <Link to="/products?category=men" className="group relative h-96 lg:h-[500px] overflow-hidden rounded-lg">
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 to-transparent z-10" />
              <img
                src="https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&q=80"
                alt="Men's collection"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-8 left-8 z-20">
                <h3 className="font-display text-3xl lg:text-4xl font-semibold text-cream mb-2">
                  Men
                </h3>
                <span className="flex items-center gap-2 text-cream/80 group-hover:text-gold transition-fast">
                  Explore Collection
                  <ArrowRight size={18} />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Women's Edit */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-gold font-medium tracking-widest uppercase text-sm mb-2">For Her</p>
              <h2 className="font-display text-3xl lg:text-4xl font-semibold text-foreground">
                Women's Edit
              </h2>
            </div>
            <Link to="/products?category=women" className="hidden sm:flex items-center gap-2 text-sm font-medium text-foreground hover:text-gold transition-fast">
              Shop Women
              <ArrowRight size={16} />
            </Link>
          </div>
          <ProductGrid products={womenProducts} />
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl lg:text-4xl font-semibold mb-4">
            Join the Auralane Community
          </h2>
          <p className="text-primary-foreground/70 max-w-md mx-auto mb-8">
            Subscribe to receive exclusive offers, early access to new collections, and styling inspiration.
          </p>
          <form className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-primary-foreground/10 border border-primary-foreground/20 rounded-md text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:border-gold"
            />
            <button type="submit" className="btn-gold">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
