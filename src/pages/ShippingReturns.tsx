const ShippingReturns = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Shipping & Returns</h1>
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Shipping Information</h2>
          <p className="text-muted-foreground mb-4">
            We offer fast and reliable shipping worldwide. All orders are processed within 1-2 business days.
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Standard shipping: 5-7 business days</li>
            <li>Express shipping: 2-3 business days</li>
            <li>Free shipping on orders over ₹1500 </li>
            <li>International shipping available</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Return Policy</h2>
          <p className="text-muted-foreground mb-4">
            We want you to be completely satisfied with your purchase. If you're not happy with your order, you can return it within 15 days.
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>15-days return window</li>
            <li>Items must be unused and in original packaging</li>
            <li>Free return shipping for defective items</li>
            <li>Refunds processed within 5-7 business days</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">How to Return</h2>
          <p className="text-muted-foreground mb-4">
            To initiate a return, please contact our customer service team or use our online return portal.
          </p>
          <div className="bg-muted p-4 rounded-lg">
            <p className="font-medium">Contact Information:</p>
            <p>Email: returns@auralane.com</p>
            <p>Phone: 1-800-AURALANE</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ShippingReturns;
