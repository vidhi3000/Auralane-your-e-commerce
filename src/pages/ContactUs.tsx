import { useState } from 'react';
import Layout from '@/components/Layout';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // later you can connect this to Supabase / API
    console.log('Contact Form Data:', formData);

    alert('Your message has been sent. Our team will contact you soon.');

    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        {/* Header */}
        <section className="py-16 lg:py-24 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Contact Us
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Have a question or facing an issue? We’re here to help.
            </p>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto bg-white border rounded-lg p-8 shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Order issue, payment problem, etc."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Describe your issue in detail"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-black text-white py-3 rounded-md font-medium hover:bg-gray-800 transition"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Support Info */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-semibold mb-4">
              Other Ways to Reach Us
            </h2>
            <p className="text-muted-foreground mb-2">
              📧 Email: support@auralane.com
            </p>
            <p className="text-muted-foreground mb-2">
              📞 Phone: +91-XXXXXXXXXX
            </p>
            <p className="text-muted-foreground">
              🕒 Support Hours: Mon–Sat, 9 AM – 6 PM
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default ContactUs;
