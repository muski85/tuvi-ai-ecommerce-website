import React from 'react';
import { Truck, Shield, Award, Heart } from 'lucide-react';

export default function AboutPage() {
  const features = [
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Fast Delivery",
      description: "Quick and reliable shipping to your doorstep"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure Shopping",
      description: "Your data and payments are always protected"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Quality Products",
      description: "Carefully curated items that meet our high standards"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Customer First",
      description: "Dedicated support team ready to help you"
    }
  ];

  return (
    <div className="min-h-screen bg-lightBg">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-darkBlue to-lightBlue text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Tuvi</h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl">
            Your trusted destination for quality products and exceptional shopping experience
          </p>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-darkColor mb-6">Our Story</h2>
            <div className="space-y-4 text-darkText">
              <p>
                Founded with a passion for bringing quality products to everyone, Tulos has grown 
                from a small startup to a trusted e-commerce platform serving thousands of happy customers.
              </p>
              <p>
                We believe that shopping should be simple, enjoyable, and accessible. That's why we've 
                built a platform that combines the best products with an intuitive shopping experience.
              </p>
              <p>
                Every product in our store is carefully selected to ensure it meets our high standards 
                of quality, value, and style. We're not just selling products – we're building relationships 
                with our customers.
              </p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-lightOrange/20 to-lightBlue/20 rounded-2xl p-8 h-80 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl font-bold text-darkBlue mb-4">2024</div>
              <p className="text-xl text-darkText">Year Founded</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-darkColor text-center mb-12">Why Choose Tulos</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="text-center p-6 rounded-xl hover:bg-lightBg transition-colors group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-lightBlue/10 text-darkBlue mb-4 group-hover:bg-darkBlue group-hover:text-white transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-darkColor mb-3">
                  {feature.title}
                </h3>
                <p className="text-darkText">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-darkColor to-lightColor text-white rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-lg text-white/90 mb-4">
            To provide an exceptional online shopping experience by offering high-quality products, 
            competitive prices, and outstanding customer service.
          </p>
          <p className="text-lg text-white/90">
            We're committed to building a sustainable business that values our customers, partners, 
            and the environment. Every decision we make is guided by our core values of integrity, 
            quality, and customer satisfaction.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-darkBlue mb-2">10K+</div>
              <p className="text-darkText">Happy Customers</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-darkBlue mb-2">5K+</div>
              <p className="text-darkText">Products</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-darkBlue mb-2">50+</div>
              <p className="text-darkText">Countries Served</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}