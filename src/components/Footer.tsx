import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground mt-auto">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h3 className="font-display text-2xl font-semibold mb-4">AURALANE</h3>
            <p className="text-primary-foreground/70 text-sm leading-relaxed mb-6">
              Timeless elegance meets modern sophistication. Discover curated fashion that transcends seasons.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-primary-foreground/70 hover:text-gold transition-fast">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-primary-foreground/70 hover:text-gold transition-fast">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-primary-foreground/70 hover:text-gold transition-fast">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-sm font-medium tracking-wide uppercase mb-4">Shop</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/products" className="text-sm text-primary-foreground/70 hover:text-gold transition-fast">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/products?category=women" className="text-sm text-primary-foreground/70 hover:text-gold transition-fast">
                  Women
                </Link>
              </li>
              <li>
                <Link to="/products?category=men" className="text-sm text-primary-foreground/70 hover:text-gold transition-fast">
                  Men
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-sm text-primary-foreground/70 hover:text-gold transition-fast">
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-sm font-medium tracking-wide uppercase mb-4">Help</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/shipping-returns" className="text-sm text-primary-foreground/70 hover:text-gold transition-fast">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link to="/size-guide" className="text-sm text-primary-foreground/70 hover:text-gold transition-fast">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link to="/contact-us" className="text-sm text-primary-foreground/70 hover:text-gold transition-fast">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/help-center" className="text-sm text-primary-foreground/70 hover:text-gold transition-fast">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-medium tracking-wide uppercase mb-4">Newsletter</h4>
            <p className="text-sm text-primary-foreground/70 mb-4">
              Subscribe for exclusive offers and updates.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 bg-primary-foreground/10 border border-primary-foreground/20 rounded-l-md text-sm text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:border-gold"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-gold text-accent-foreground rounded-r-md hover:bg-gold-dark transition-fast"
              >
                <Mail size={18} />
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-primary-foreground/50">
              © 2025 Auralane. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-xs text-primary-foreground/50 hover:text-gold transition-fast">
                Privacy Policy
              </a>
              <a href="#" className="text-xs text-primary-foreground/50 hover:text-gold transition-fast">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
