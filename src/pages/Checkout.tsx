import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Lock, CreditCard, CheckCircle } from 'lucide-react';
import Layout from '@/components/Layout';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, totalPrice, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const shippingCost = totalPrice >= 5000 ? 0 : 299;
  const finalTotal = totalPrice + shippingCost;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsProcessing(false);
    setIsComplete(true);
    clearCart();

    toast.success ("Order placed successfully!",{
      description: "Thank you for your purchase. You will receive a confirmation email shortly.",
    });
  };

  if (cart.length === 0 && !isComplete) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="font-display text-2xl font-semibold text-foreground mb-4">
            Your cart is empty
          </h1>
          <Link to="/products" className="btn-primary">
            Continue Shopping
          </Link>
        </div>
      </Layout>
    );
  }

  if (isComplete) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 lg:py-24">
          <div className="max-w-md mx-auto text-center animate-fade-in">
            <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="text-green-600" size={40} />
            </div>
            <h1 className="font-display text-3xl font-semibold text-foreground mb-4">
              Order Confirmed!
            </h1>
            <p className="text-muted-foreground mb-8">
              Thank you for shopping with Auralane. Your order has been placed successfully. 
              A confirmation email has been sent to your email address.
            </p>
            <div className="space-y-4">
              <Link to="/products" className="block btn-primary">
                Continue Shopping
              </Link>
              <Link to="/" className="block btn-secondary">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <button
          onClick={() => navigate('/cart')}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-fast mb-8"
        >
          <ArrowLeft size={16} />
          Back to Cart
        </button>

        <h1 className="font-display text-3xl lg:text-4xl font-semibold text-foreground mb-8">
          Checkout
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Contact Information */}
              <div className="bg-card rounded-lg p-6 shadow-soft">
                <h2 className="font-display text-xl font-semibold text-foreground mb-6">
                  Contact Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="input-styled"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="input-styled"
                      required
                     pattern="[0-9]{10}"
                  title="Enter a valid 10-digit phone number"  
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-card rounded-lg p-6 shadow-soft">
                <h2 className="font-display text-xl font-semibold text-foreground mb-6">
                  Shipping Address 
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      First Name  <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="input-styled"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Last Name  <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="input-styled"
                      required
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Street Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="input-styled"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      City  <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className="input-styled"
                      required
                      pattern="[0-9]{6}"
                      title="Please enter a valid 6-digit PIN code"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      State <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="input-styled"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      PIN Code  <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className="input-styled"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-card rounded-lg p-6 shadow-soft">
                <div className="flex items-center gap-2 mb-6">
                  <CreditCard className="text-gold" size={20} />
                  <h2 className="font-display text-xl font-semibold text-foreground">
                    Payment Information 
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Card Number   <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      className="input-styled"
                      required
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Name on Card    <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="nameOnCard"
                      value={formData.nameOnCard}
                      onChange={handleInputChange}
                      className="input-styled"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Expiry Date    <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                      className="input-styled"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      CVV    <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      placeholder="123"
                      className="input-styled"
                      required
                      pattern="[0-9]{3}"
                    title="Enter a valid 3-digit CVV"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-lg p-6 shadow-soft sticky top-24">
                <h2 className="font-display text-xl font-semibold text-foreground mb-6">
                  Order Summary 
                </h2>

                {/* Items */}
                <div className="space-y-4 pb-6 border-b border-border max-h-64 overflow-y-auto">
                  {cart.map((item) => (
                    <div key={`${item.product.id}-${item.selectedSize}`} className="flex gap-4">
                      <div className="w-16 h-20 rounded overflow-hidden bg-cream-dark flex-shrink-0">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-foreground truncate">
                          {item.product.name}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {item.selectedSize} / {item.selectedColor}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="text-sm font-medium text-foreground">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="space-y-4 py-6 border-b border-border">
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
                </div>

                <div className="flex justify-between py-6">
                  <span className="font-medium text-foreground">Total</span>
                  <span className="text-xl font-semibold text-foreground">
                    {formatPrice(finalTotal)}
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full btn-gold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Lock size={16} />
                      Place Order
                    </>
                  )}
                </button>

                <p className="mt-4 text-xs text-center text-muted-foreground">
                  Your payment is secured with 256-bit SSL encryption
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Checkout;
