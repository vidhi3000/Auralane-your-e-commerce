import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";

import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { ThemeProvider } from "@/context/ThemeContext";

import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Wishlist from "./pages/Wishlist";
import HelpCenter from "./pages/HelpCenter";
import ContactUs from "./pages/ContactUs";
import ShippingReturns from "./pages/ShippingReturns";
import SizeGuide from "./pages/SizeGuide";
import Auth from "./pages/Auth";
import AuthCallback from "./pages/Callback";
import Profile from "./pages/Profile";
import ProfileEdit from "./pages/ProfileEdit";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="auralane-theme">
        <TooltipProvider>
          <AuthProvider>
            <CartProvider>
              <WishlistProvider>
                <Toaster />
                <Sonner />

                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/product/:id" element={<ProductDetails />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                   <Route path="/help-center" element={<HelpCenter />} />
                   <Route path="/contact-us" element={<ContactUs />} />
                   <Route path="/shipping-returns" element={<ShippingReturns />} />
                   <Route path="/size-guide" element={<SizeGuide />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/auth/callback" element={<AuthCallback />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/profile/edit" element={<ProfileEdit />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>

              </WishlistProvider>
            </CartProvider>
          </AuthProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
