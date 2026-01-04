import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const HelpCenter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedQuery = searchParams.get('type');

  const faqRef = useRef<HTMLDivElement>(null);

  const queryTypes = [
    { id: 'orders', title: 'Order Related Queries' },
    { id: 'payment', title: 'Payment & Refund Issues' },
    { id: 'delivery', title: 'Delivery & Shipping' },
    { id: 'returns', title: 'Returns & Exchanges' },
    { id: 'account', title: 'Account & Login Issues' },
    { id: 'product', title: 'Product Information' },
  ];

  const faqs = [
    // Order Related Queries
    { id: 'orders', question: 'How do I track my order?', answer: 'You can track your order by logging into your account and visiting the Orders section. Tracking updates are also sent via email and SMS.' },
    { id: 'orders', question: 'Can I modify my order after placing it?', answer: 'Orders can be modified within 1 hour of placement. Please contact customer support immediately for assistance.' },
    { id: 'orders', question: 'What if my order is delayed?', answer: 'If your order is delayed beyond the estimated delivery time, please contact our support team for updates and possible compensation.' },
    { id: 'orders', question: 'How do I cancel my order?', answer: 'You can cancel your order within 1 hour of placement through your account or by contacting customer support.' },
    { id: 'orders', question: 'Can I add items to my existing order?', answer: 'Items cannot be added to an existing order. Please place a separate order for additional items.' },
    // Payment & Refund Issues
    { id: 'payment', question: 'What payment methods do you accept?', answer: 'We accept credit/debit cards, UPI, net banking, wallets, and cash on delivery for eligible orders.' },
    { id: 'payment', question: 'How long does a refund take?', answer: 'Refunds are processed within 3–5 business days after approval and credited to the original payment method.' },
    { id: 'payment', question: 'Why was my payment declined?', answer: 'Payment may be declined due to insufficient funds, incorrect card details, or bank restrictions. Please try again or use another method.' },
    { id: 'payment', question: 'Can I get a refund for a cancelled order?', answer: 'Yes, cancelled orders are refunded within 3-5 business days to the original payment method.' },
    { id: 'payment', question: 'What if I paid extra by mistake?', answer: 'Contact customer support immediately. Extra amounts will be refunded to your original payment method within 3-5 days.' },
    // Delivery & Shipping
    { id: 'delivery', question: 'How long does delivery take?', answer: 'Standard delivery takes 3–5 business days. Express delivery is available in select cities for 1-2 days.' },
    { id: 'delivery', question: 'Do you deliver to my area?', answer: 'We deliver across India. Check your pincode during checkout to confirm delivery availability.' },
    { id: 'delivery', question: 'What are the shipping charges?', answer: 'Shipping is free for orders above ₹999. For orders below, charges start from ₹49 based on location.' },
    { id: 'delivery', question: 'Can I change my delivery address?', answer: 'Delivery address can be changed within 1 hour of order placement. Contact support for assistance.' },
    { id: 'delivery', question: 'What if my package is damaged during delivery?', answer: 'If your package arrives damaged, contact support within 24 hours with photos for a replacement or refund.' },
    // Returns & Exchanges
    { id: 'returns', question: 'What is your return policy?', answer: 'We offer a 15-day return policy for unused items in original packaging with tags attached.' },
    { id: 'returns', question: 'How do I initiate a return?', answer: 'Log into your account, go to Orders, select the item, and choose "Return". Follow the instructions to generate a return label.' },
    { id: 'returns', question: 'Can I exchange an item?', answer: 'Yes, exchanges are available within 15 days for size/color changes, subject to availability.' },
    { id: 'returns', question: 'What items cannot be returned?', answer: 'Intimate wear, customized items, and items without original tags cannot be returned.' },
    { id: 'returns', question: 'How long does a return take?', answer: 'Once approved, returns are processed within 3-5 business days, and refunds are credited accordingly.' },
    // Account & Login Issues
    { id: 'account', question: 'How do I reset my password?', answer: 'Click on "Forgot Password" on the login page and follow the instructions sent to your registered email.' },
    { id: 'account', question: 'Why can\'t I log in?', answer: 'Ensure your email and password are correct. If issues persist, try resetting your password or contact support.' },
    { id: 'account', question: 'How do I update my account details?', answer: 'Log into your account, go to Profile settings, and update your information as needed.' },
    { id: 'account', question: 'Can I delete my account?', answer: 'Yes, you can request account deletion by contacting customer support. All data will be removed as per privacy policy.' },
    { id: 'account', question: 'How do I change my email address?', answer: 'Contact customer support with your new email address and verification details to update your account.' },
    // Product Information
    { id: 'product', question: 'Are your products authentic?', answer: 'Yes, all our products are 100% authentic and sourced from authorized manufacturers and brands.' },
    { id: 'product', question: 'How do I know my size?', answer: 'Refer to our size guide on the product page or use our Size Guide section for detailed measurements.' },
    { id: 'product', question: 'What if the product doesn\'t match the description?', answer: 'If the product doesn\'t match the description, you can return it within 15 days for a full refund.' },
    { id: 'product', question: 'Do you have product reviews?', answer: 'Yes, customer reviews are available on each product page to help you make informed decisions.' },
    { id: 'product', question: 'Are there any care instructions?', answer: 'Care instructions are provided on the product page and packaging. Follow them to maintain product quality.' },
  ];

  const filteredFaqs = selectedQuery
    ? faqs.filter((faq) => faq.id === selectedQuery)
    : faqs;

  const handleSelectQuery = (id: string) => {
    setSearchParams({ type: id });
    faqRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        {/* Header */}
        <section className="py-16 lg:py-24 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">Help Center</h1>
            <p className="text-muted-foreground text-lg">
              Find answers to your questions or contact our support team
            </p>
          </div>
        </section>

        {/* Select Query Type */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-semibold text-center mb-12">
              Select Query Type
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {queryTypes.map((query) => (
                <button
                  key={query.id}
                  onClick={() => handleSelectQuery(query.id)}
                  className={`group flex items-center justify-between p-6 bg-white border rounded-lg hover:shadow-md transition w-full text-left ${
                    selectedQuery === query.id ? 'bg-gray-100 border-gray-300' : ''
                  }`}
                >
                  <span className="font-medium">{query.title}</span>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition" />
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section ref={faqRef} className="py-16 lg:py-24 bg-gray-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-semibold text-center mb-6">
              Frequently Asked Questions
            </h2>

            {selectedQuery && (
              <div className="text-center mb-6">
                <button
                  onClick={() => setSearchParams({})}
                  className="text-sm underline text-gray-600"
                >
                  Show all FAQs
                </button>
              </div>
            )}

            <Accordion type="single" collapsible className="space-y-4">
              {filteredFaqs.map((faq, index) => (
                <AccordionItem
                  key={`${faq.id}-${index}`}
                  value={`item-${faq.id}-${index}`}
                  className="bg-white border rounded-lg px-6"
                >
                  <AccordionTrigger className="text-left font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Contact */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-semibold mb-4">Still Need Help?</h2>
            <p className="text-muted-foreground mb-8">
              Our support team is here for you.
            </p>
            <div className="flex justify-center gap-4">
              <button className="bg-black text-white px-8 py-3 rounded-md">
                Contact Support
              </button>
              <button className="border px-8 py-3 rounded-md">Live Chat</button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default HelpCenter;
