import React from 'react';
import { Shield, Eye, Lock, Database, Bell, UserCheck } from 'lucide-react';

export default function PrivacyPage() {
  const sections = [
    {
      icon: <Database className="w-6 h-6" />,
      title: "Information We Collect",
      content: [
        "Personal information you provide (name, email, shipping address, phone number)",
        "Payment information (processed securely through our payment providers)",
        "Order history and purchase preferences",
        "Device and browser information",
        "Cookies and similar tracking technologies",
        "Customer service communications"
      ]
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "How We Use Your Information",
      content: [
        "Process and fulfill your orders",
        "Communicate about your purchases and account",
        "Provide customer support and respond to inquiries",
        "Send promotional emails (with your consent)",
        "Improve our products, services, and website",
        "Prevent fraud and enhance security",
        "Comply with legal obligations"
      ]
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "How We Protect Your Information",
      content: [
        "SSL encryption for all data transmission",
        "Secure payment processing through PCI-compliant providers",
        "Regular security audits and updates",
        "Access controls and authentication measures",
        "Employee training on data protection",
        "Secure data storage and backup systems"
      ]
    },
    {
      icon: <UserCheck className="w-6 h-6" />,
      title: "Your Rights and Choices",
      content: [
        "Access your personal information",
        "Update or correct your data",
        "Request deletion of your account and data",
        "Opt-out of marketing communications",
        "Control cookie preferences",
        "Request a copy of your data",
        "Object to certain data processing activities"
      ]
    },
    {
      icon: <Bell className="w-6 h-6" />,
      title: "Cookies and Tracking",
      content: [
        "Essential cookies for website functionality",
        "Analytics cookies to understand usage patterns",
        "Marketing cookies for personalized advertising",
        "You can manage cookie preferences in your browser",
        "Third-party cookies from analytics and advertising partners"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-lightBg">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-darkBlue to-lightBlue text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-6">
            <Shield className="w-16 h-16" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">Privacy Policy</h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto text-center">
            Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
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
            This Privacy Policy describes how Tulos ("we," "us," or "our") collects, uses, and shares your personal information.
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
              <ul className="space-y-3 ml-16">
                {section.content.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start">
                    <span className="text-darkBlue mr-3 mt-1">•</span>
                    <span className="text-darkText">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Sharing Information */}
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-darkColor mb-6">Information Sharing</h2>
            <div className="space-y-4 text-darkText">
              <p>
                We do not sell your personal information to third parties. We may share your information with:
              </p>
              <ul className="space-y-3 ml-6">
                <li className="flex items-start">
                  <span className="text-darkBlue mr-3">•</span>
                  <span><strong>Service Providers:</strong> Companies that help us operate our business (payment processors, shipping carriers, email service providers)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-darkBlue mr-3">•</span>
                  <span><strong>Business Partners:</strong> With your consent, we may share information with trusted partners for marketing purposes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-darkBlue mr-3">•</span>
                  <span><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety</span>
                </li>
                <li className="flex items-start">
                  <span className="text-darkBlue mr-3">•</span>
                  <span><strong>Business Transfers:</strong> In connection with a merger, sale, or acquisition</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Data Retention */}
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-darkColor mb-6">Data Retention</h2>
            <p className="text-darkText mb-4">
              We retain your personal information for as long as necessary to:
            </p>
            <ul className="space-y-3 ml-6 text-darkText">
              <li className="flex items-start">
                <span className="text-darkBlue mr-3">•</span>
                <span>Provide our services and fulfill transactions</span>
              </li>
              <li className="flex items-start">
                <span className="text-darkBlue mr-3">•</span>
                <span>Comply with legal obligations</span>
              </li>
              <li className="flex items-start">
                <span className="text-darkBlue mr-3">•</span>
                <span>Resolve disputes and enforce our policies</span>
              </li>
              <li className="flex items-start">
                <span className="text-darkBlue mr-3">•</span>
                <span>When you request deletion, we will remove your data within 30 days</span>
              </li>
            </ul>
          </div>

          {/* Children's Privacy */}
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-darkColor mb-6">Children's Privacy</h2>
            <p className="text-darkText">
              Our services are not intended for children under 13 years of age. We do not knowingly collect 
              personal information from children. If you believe we have collected information from a child, 
              please contact us immediately.
            </p>
          </div>

          {/* International Users */}
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-darkColor mb-6">International Users</h2>
            <p className="text-darkText">
              Your information may be transferred to and processed in countries other than your own. 
              We take steps to ensure your data receives adequate protection wherever it is processed, 
              in accordance with applicable data protection laws.
            </p>
          </div>

          {/* Changes to Policy */}
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-darkColor mb-6">Changes to This Policy</h2>
            <p className="text-darkText">
              We may update this Privacy Policy from time to time. We will notify you of any significant 
              changes by posting the new policy on this page and updating the "Last Updated" date. 
              Your continued use of our services after changes constitutes acceptance of the updated policy.
            </p>
          </div>

          {/* Contact Section */}
          <div className="bg-gradient-to-r from-darkBlue to-lightBlue text-white rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-4">Questions About Privacy?</h2>
            <p className="mb-6 text-white/90">
              If you have any questions about this Privacy Policy or how we handle your personal information, 
              please don't hesitate to contact us.
            </p>
            <div className="space-y-2 text-white/90">
              <p><strong>Email:</strong> privacy@tulos.com</p>
              <p><strong>Phone:</strong> +1 (555) 123-4567</p>
              <p><strong>Mail:</strong> Tulos Privacy Team, 123 Commerce Street, CA 90210</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}