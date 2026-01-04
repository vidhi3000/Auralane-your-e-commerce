import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, Menu, X, User, Heart, LogOut, Moon, Sun } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useWishlist } from '@/context/WishlistContext';
import { useTheme } from '@/context/ThemeContext';
import { supabase } from '@/integrations/supabase/client';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { totalItems } = useCart();
  const { user, signOut } = useAuth();
  const { wishlist } = useWishlist();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);



  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsSearchOpen(false);
    }
  };

  const categories = [
    { name: 'Home', href: '/' },
    { name: 'All', href: '/products' },
    { name: 'Women', href: '/products?category=women' },
    { name: 'Men', href: '/products?category=men' },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-background/98 backdrop-blur-lg shadow-soft' 
            : 'bg-background/80 backdrop-blur-sm'
        }`}
      >
        {/* Top announcement bar */}
        <div className="bg-primary text-primary-foreground text-center py-2 text-xs tracking-widest uppercase">
          <span className="animate-fade-in">Free Shipping on Orders Over ₹1500 | New Season Arrivals</span>
        </div>

        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 -ml-2 text-foreground hover:text-gold transition-base"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <span className={`w-full h-0.5 bg-current transform transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`w-full h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`w-full h-0.5 bg-current transform transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>

            {/* Left Navigation - Desktop */}
            <div className="hidden lg:flex items-center space-x-8 flex-1">
              {categories.map((category) => (
                <div 
                  key={category.name}
                  className="relative group"
                  onMouseEnter={() => setActiveDropdown(category.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    to={category.href}
                    className="flex items-center gap-1 py-1 px-1 text-l font-medium tracking-widest uppercase 
                     text-black transition-base rounded-2xl border-radius-0 overflow-hidden hover:text-gold"
                  >
                    {category.name}
                  </Link>
                </div>
              ))}
            </div>

            {/* Logo - Center */}
            <Link 
              to="/" 
              className="flex flex-col items-center group"
            >
              <span className="font-display text-2xl lg:text-3xl font-semibold tracking-[0.2em] text-foreground group-hover:text-gold transition-base">
                AURALANE
              </span>
              <span className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase hidden lg:block">
                Timeless Elegance
              </span>
            </Link>

            {/* Desktop Icons */}
            <div className="hidden lg:flex items-center justify-end space-x-4 flex-1">
              {/* Search */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-foreground hover:text-gold transition-base relative group"
                aria-label="Search"
              >
                <Search size={20} strokeWidth={1.5} />
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full" />
              </button>

              {/* Theme Toggle */}
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 text-foreground hover:text-gold transition-base relative group"
                aria-label="Toggle theme"
              >
                <Sun size={20} strokeWidth={1.5} className="absolute inset-0 m-auto rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon size={20} strokeWidth={1.5} className="absolute inset-0 m-auto rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full" />
              </button>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="relative p-2 text-foreground hover:text-gold transition-base group"
                aria-label="Wishlist"
              >
                <Heart size={20} strokeWidth={1.5} />
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-gold text-primary text-xs font-semibold rounded-full flex items-center justify-center animate-scale-in">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* User Profile */}
              <Link
                to="/profile"
                className="p-2 text-foreground hover:text-gold transition-base relative group"
                aria-label="User profile"
              >
                <User size={20} strokeWidth={1.5} />
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full" />
              </Link>

              {/* Cart */}
              <Link
                to="/cart"
                className="relative p-2 text-foreground hover:text-gold transition-base group"
                aria-label="Shopping cart"
              >
                <ShoppingBag size={20} strokeWidth={1.5} />
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-gold text-primary text-xs font-semibold rounded-full flex items-center justify-center animate-scale-in">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>

            {/* Mobile Icons - Touch-friendly layout */}
            <div className="flex lg:hidden items-center justify-center flex-1 max-w-[280px] mx-auto">
              <div className="flex items-center justify-between w-full px-2">
                {/* Search */}
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="flex items-center justify-center w-11 h-11 text-foreground hover:text-gold transition-base relative group touch-manipulation"
                  aria-label="Search"
                >
                  <Search size={22} strokeWidth={1.5} />
                </button>

                {/* Theme Toggle */}
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="flex items-center justify-center w-11 h-11 text-foreground hover:text-gold transition-base relative group touch-manipulation"
                  aria-label="Toggle theme"
                >
                  <Sun size={22} strokeWidth={1.5} className="absolute inset-0 m-auto rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon size={22} strokeWidth={1.5} className="absolute inset-0 m-auto rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                </button>

                {/* Wishlist */}
                <Link
                  to="/wishlist"
                  className="flex items-center justify-center w-11 h-11 text-foreground hover:text-gold transition-base relative group touch-manipulation"
                  aria-label="Wishlist"
                >
                  <Heart size={22} strokeWidth={1.5} />
                  {wishlist.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-gold text-primary text-xs font-semibold rounded-full flex items-center justify-center animate-scale-in min-w-[20px]">
                      {wishlist.length > 99 ? '99+' : wishlist.length}
                    </span>
                  )}
                </Link>

                {/* User Profile */}
                <Link
                  to="/profile"
                  className="flex items-center justify-center w-11 h-11 text-foreground hover:text-gold transition-base relative group touch-manipulation"
                  aria-label="User profile"
                >
                  <User size={22} strokeWidth={1.5} />
                </Link>

                {/* Cart */}
                <Link
                  to="/cart"
                  className="flex items-center justify-center w-11 h-11 text-foreground hover:text-gold transition-base relative group touch-manipulation"
                  aria-label="Shopping cart"
                >
                  <ShoppingBag size={22} strokeWidth={1.5} />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-gold text-primary text-xs font-semibold rounded-full flex items-center justify-center animate-scale-in min-w-[20px]">
                      {totalItems > 99 ? '99+' : totalItems}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="container mx-auto px-4 pb-6 border-t border-border bg-background">
            <div className="flex flex-col space-y-2 pt-6">
              {/* Navigation Categories */}
              <div className="space-y-1 mb-4">
                {categories.map((category, index) => (
                  <Link
                    key={category.name}
                    to={category.href}
                    className="block py-3 px-4 text-base font-medium tracking-widest uppercase text-foreground hover:text-gold hover:bg-muted/50 rounded-lg transition-all duration-300"
                    style={{ animationDelay: `${index * 50}ms` }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>

              {/* User Actions */}
              <div className="border-t border-border pt-4 space-y-2">
                <Link
                  to="/wishlist"
                  className="flex items-center justify-between py-3 px-4 text-base font-medium tracking-widest uppercase text-foreground hover:text-gold hover:bg-muted/50 rounded-lg transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center gap-3">
                    <Heart size={20} strokeWidth={1.5} />
                    <span>Wishlist</span>
                  </div>
                  <span className="bg-gold text-primary text-sm px-2 py-1 rounded-full font-semibold">
                    {wishlist.length}
                  </span>
                </Link>

                <Link
                  to="/cart"
                  className="flex items-center justify-between py-3 px-4 text-base font-medium tracking-widest uppercase text-foreground hover:text-gold hover:bg-muted/50 rounded-lg transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center gap-3">
                    <ShoppingBag size={20} strokeWidth={1.5} />
                    <span>Cart</span>
                  </div>
                  <span className="bg-gold text-primary text-sm px-2 py-1 rounded-full font-semibold">
                    {totalItems}
                  </span>
                </Link>

                {user ? (
                  <>
                    <Link
                      to="/profile"
                      className="flex items-center gap-3 py-3 px-4 text-base font-medium tracking-widest uppercase text-foreground hover:text-gold hover:bg-muted/50 rounded-lg transition-all duration-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User size={20} strokeWidth={1.5} />
                      <span>Profile</span>
                    </Link>
                    <button
                      onClick={() => {
                        signOut();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center gap-3 py-3 px-4 text-base font-medium tracking-widest uppercase text-foreground hover:text-gold hover:bg-muted/50 rounded-lg transition-all duration-300 w-full text-left"
                    >
                      <LogOut size={20} strokeWidth={1.5} />
                      <span>Sign Out</span>
                    </button>
                  </>
                ) : (
                  <Link
                    to="/auth"
                    className="flex items-center gap-3 py-3 px-4 text-base font-medium tracking-widest uppercase text-foreground hover:text-gold hover:bg-muted/50 rounded-lg transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User size={20} strokeWidth={1.5} />
                    <span>Sign In</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Search Overlay */}
      <div 
        className={`fixed inset-0 z-[60] transition-all duration-500 ${
          isSearchOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div 
          className="absolute inset-0 bg-charcoal/80 backdrop-blur-sm"
          onClick={() => setIsSearchOpen(false)}
        />
        <div className={`absolute top-0 left-0 right-0 bg-background p-6 lg:p-12 transform transition-all duration-500 ${
          isSearchOpen ? 'translate-y-0' : '-translate-y-full'
        }`}>
          <div className="container mx-auto max-w-3xl">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-display text-2xl font-semibold text-foreground">Search</h2>
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-2 text-foreground hover:text-gold transition-base"
              >
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products..."
                className="w-full px-0 py-4 bg-transparent border-b-2 border-border text-xl lg:text-2xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold transition-base font-display"
                autoFocus
              />
              <button 
                type="submit" 
                className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-muted-foreground hover:text-gold transition-base"
              >
                <Search size={24} strokeWidth={1.5} />
              </button>
            </form>
            <div className="mt-8">
              <p className="text-sm text-muted-foreground mb-3">Popular Searches</p>
              <div className="flex flex-wrap gap-2">
                {['Silk Dress', 'Blazer', 'Cashmere', 'Evening Gown'].map((term) => (
                  <button
                    key={term}
                    onClick={() => {
                      navigate(`/products?search=${encodeURIComponent(term)}`);
                      setIsSearchOpen(false);
                    }}
                    className="px-4 py-2 bg-secondary text-secondary-foreground text-sm rounded-full hover:bg-gold hover:text-primary transition-base"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer for fixed navbar */}
      <div className="h-[88px] lg:h-[1   08px]" />
    </>
  );
};

export default Navbar;
