import React from 'react';
import { FileText, ShoppingCart, RotateCcw, CreditCard, AlertCircle, Scale } from 'lucide-react';

export default function TermsPage() {
  const sections = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Acceptance of Terms",
      content: `By accessing and using Tuvi ("the Website"), you accept and agree to be bound by these Terms and Conditions. 
      If you do not agree to these terms, please do not use our services. We reserve the right to modify these terms at any time, 
      and your continued use constitutes acceptance of any changes.`
    },
    {
      icon: <ShoppingCart className="w-6 h-6" />,
      title: "Product Information & Pricing",
      subsections: [
        {
          subtitle: "Product Accuracy",
          text: "We strive to provide accurate product descriptions, images, and pricing. However, we do not warrant that product descriptions or other content is accurate, complete, or error-free. If a product is not as described, your sole remedy is to return it in unused condition."
        },
        {
          subtitle: "Pricing",
          text: "All prices are in USD and subject to change without notice. We reserve the right to correct any pricing errors. If a product is listed at an incorrect price due to an error, we may cancel your order and notify you."
        },
        {
          subtitle: "Availability",
          text: "Product availability is subject to change. We will notify you if items in your order are out of stock and offer alternatives or refunds."
        }
      ]
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: "Orders & Payment",
      subsections: [
        {
          subtitle: "Order Process",
          text: "When you place an order, you will receive an order confirmation email. This does not constitute order acceptance. We reserve the right to refuse or cancel any order for any reason."
        },
        {
          subtitle: "Payment",
          text: "We accept major credit cards, debit cards, and other payment methods as displayed. Payment is due at the time of order. You represent that you have the legal right to use any payment method provided."
        },
        {
          subtitle: "Sales Tax",
          text: "Applicable sales tax will be added to your order based on shipping destination and local tax laws."
        }
      ]
    },
    {
      icon: <RotateCcw className="w-6 h-6" />,
      title: "Shipping & Returns",
      subsections: [
        {
          subtitle: "Shipping",
          text: "We ship to addresses within the United States and select international locations. Shipping costs and delivery times vary by location and method. Risk of loss passes to you upon delivery."
        },
        {
          subtitle: "Returns",
          text: "You may return most items within 30 days of delivery for a full refund. Items must be unused, in original packaging, with tags attached. Some items are final sale and cannot be returned."
        },
        {
          subtitle: "Refunds",
          text: "Refunds will be processed to the original payment method within 5-10 business days after we receive the return. Shipping costs are non-refundable unless the return is due to our error."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-lightBg">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-darkBlue to-lightBlue text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-6">
            <Scale className="w-16 h-16" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">Terms & Conditions</h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto text-center">
            Please read these terms carefully before using our services
          </p>
        </div>
      </div>

      {/* Last Updated */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-darkText">
            <span className="font-semibold text-darkColor">Last Updated:</span> November 11, 2025
          </p>
          <p className="text-sm text-darkText mt-2">
            These Terms and Conditions govern your use of Tuvi and your purchase of products through our website.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="space-y-8">
          {sections.map((section, index) => (
            <div key={index} className="bg-white rounded-xl p-8 shadow-sm">
              <div className="flex items-start space-x-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-lightBlue/10 rounded-full flex items-center justify-center text-darkBlue">
                  {section.icon}
                </div>
                <h2 className="text-2xl font-bold text-darkColor pt-2">{section.title}</h2>
              </div>
              
              {section.content && (
                <p className="text-darkText ml-16">{section.content}</p>
              )}

              {section.subsections && (
                <div className="space-y-6 ml-16">
                  {section.subsections.map((subsection, subIndex) => (
                    <div key={subIndex}>
                      <h3 className="font-semibold text-darkColor mb-2">{subsection.subtitle}</h3>
                      <p className="text-darkText">{subsection.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Account Terms */}
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-darkColor mb-6">Account Registration</h2>
            <div className="space-y-4 text-darkText">
              <p>To make purchases, you may need to create an account. When creating an account:</p>
              <ul className="space-y-3 ml-6">
                <li className="flex items-start">
                  <span className="text-darkBlue mr-3">•</span>
                  <span>You must provide accurate and complete information</span>
                </li>
                <li className="flex items-start">
                  <span className="text-darkBlue mr-3">•</span>
                  <span>You are responsible for maintaining the security of your account</span>
                </li>
                <li className="flex items-start">
                  <span className="text-darkBlue mr-3">•</span>
                  <span>You must be at least 18 years old or have parental consent</span>
                </li>
                <li className="flex items-start">
                  <span className="text-darkBlue mr-3">•</span>
                  <span>You are responsible for all activities under your account</span>
                </li>
                <li className="flex items-start">
                  <span className="text-darkBlue mr-3">•</span>
                  <span>Notify us immediately of any unauthorized access</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Intellectual Property */}
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-darkColor mb-6">Intellectual Property</h2>
            <p className="text-darkText mb-4">
              All content on this website, including text, graphics, logos, images, and software, is the property 
              of Tuvi or its content suppliers and is protected by copyright, trademark, and other intellectual 
              property laws.
            </p>
            <p className="text-darkText">
              You may not reproduce, distribute, modify, or create derivative works from our content without 
              express written permission.
            </p>
          </div>

          {/* Prohibited Uses */}
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-darkColor mb-6">Prohibited Uses</h2>
            <p className="text-darkText mb-4">You agree not to:</p>
            <ul className="space-y-3 ml-6 text-darkText">
              <li className="flex items-start">
                <span className="text-darkBlue mr-3">•</span>
                <span>Use the website for any illegal purpose</span>
              </li>
              <li className="flex items-start">
                <span className="text-darkBlue mr-3">•</span>
                <span>Attempt to gain unauthorized access to our systems</span>
              </li>
              <li className="flex items-start">
                <span className="text-darkBlue mr-3">•</span>
                <span>Use automated systems to access the website without permission</span>
              </li>
              <li className="flex items-start">
                <span className="text-darkBlue mr-3">•</span>
                <span>Interfere with or disrupt the website or servers</span>
              </li>
              <li className="flex items-start">
                <span className="text-darkBlue mr-3">•</span>
                <span>Impersonate any person or entity</span>
              </li>
              <li className="flex items-start">
                <span className="text-darkBlue mr-3">•</span>
                <span>Submit false or misleading information</span>
              </li>
            </ul>
          </div>

          {/* Limitation of Liability */}
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-darkColor mb-6">Limitation of Liability</h2>
            <p className="text-darkText mb-4">
              To the maximum extent permitted by law, Tuvi shall not be liable for any indirect, incidental, 
              special, consequential, or punitive damages, including loss of profits, data, or use, arising from:
            </p>
            <ul className="space-y-3 ml-6 text-darkText">
              <li className="flex items-start">
                <span className="text-darkBlue mr-3">•</span>
                <span>Your use or inability to use our services</span>
              </li>
              <li className="flex items-start">
                <span className="text-darkBlue mr-3">•</span>
                <span>Unauthorized access to your data or account</span>
              </li>
              <li className="flex items-start">
                <span className="text-darkBlue mr-3">•</span>
                <span>Errors or omissions in content</span>
              </li>
              <li className="flex items-start">
                <span className="text-darkBlue mr-3">•</span>
                <span>Any other matter relating to our services</span>
              </li>
            </ul>
            <p className="text-darkText mt-4">
              Our total liability shall not exceed the amount you paid for the product or service giving rise to the claim.
            </p>
          </div>

          {/* Disclaimer */}
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-darkColor mb-6">Disclaimer of Warranties</h2>
            <p className="text-darkText">
              Our services are provided "as is" and "as available" without warranties of any kind, either express 
              or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, 
              or non-infringement. We do not warrant that our services will be uninterrupted, secure, or error-free.
            </p>
          </div>

          {/* Governing Law */}
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-darkColor mb-6">Governing Law</h2>
            <p className="text-darkText">
              These Terms and Conditions shall be governed by and construed in accordance with the laws of the 
              State of California, without regard to its conflict of law provisions. Any disputes shall be resolved 
              in the state or federal courts located in California.
            </p>
          </div>

          {/* Severability */}
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-darkColor mb-6">Severability</h2>
            <p className="text-darkText">
              If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions 
              will remain in full force and effect. The invalid provision will be modified to the minimum extent 
              necessary to make it valid and enforceable.
            </p>
          </div>

          {/* Entire Agreement */}
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-darkColor mb-6">Entire Agreement</h2>
            <p className="text-darkText">
              These Terms and Conditions, together with our Privacy Policy and any other legal notices published 
              on this website, constitute the entire agreement between you and Tuvi regarding your use of our services.
            </p>
          </div>

          {/* Contact Section */}
          <div className="bg-gradient-to-r from-darkBlue to-lightBlue text-white rounded-xl p-8">
            <div className="flex items-start space-x-4 mb-4">
              <AlertCircle className="w-6 h-6 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold mb-4">Questions About These Terms?</h2>
                <p className="mb-6 text-white/90">
                  If you have any questions or concerns about these Terms and Conditions, please contact us:
                </p>
                <div className="space-y-2 text-white/90">
                  <p><strong>Email:</strong> legal@tuvi.com</p>
                  <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                  <p><strong>Mail:</strong> Tuvi Legal Department, 123 Commerce Street, CA 90210</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}