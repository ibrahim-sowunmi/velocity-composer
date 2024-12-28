import React from 'react';

export const PaymentComponents = {
  PaymentIntent: {
    label: "Payment Intents",
    fields: {
      title: {
        type: "text",
        defaultValue: "Payment Intents",
      },
      description: {
        type: "textarea",
        defaultValue: "A Payment Intent represents the complete lifecycle of a payment transaction. It handles complex scenarios like authentication challenges, card declines, and retries automatically. When you create a Payment Intent, it manages the entire flow from initial authorization through final capture, including any required customer authentication steps like 3D Secure. It's designed to handle edge cases gracefully and provide clear status updates throughout the process.",
      },
      apiDocsLink: {
        type: "text",
        defaultValue: "https://docs.stripe.com/api/payment_intents",
      },
      lifecycleDocsLink: {
        type: "text",
        defaultValue: "https://docs.stripe.com/payments/paymentintents/lifecycle?locale=en-GB",
      }
    },
    defaultProps: {
      title: "Payment Intents",
      description: "A Payment Intent represents the complete lifecycle of a payment transaction. It handles complex scenarios like authentication challenges, card declines, and retries automatically. When you create a Payment Intent, it manages the entire flow from initial authorization through final capture, including any required customer authentication steps like 3D Secure. It's designed to handle edge cases gracefully and provide clear status updates throughout the process.",
      apiDocsLink: "https://docs.stripe.com/api/payment_intents",
      lifecycleDocsLink: "https://docs.stripe.com/payments/paymentintents/lifecycle?locale=en-GB"
    },
    render: ({ 
      title, 
      description, 
      apiDocsLink, 
      lifecycleDocsLink 
    }: { 
      title: string; 
      description: string; 
      apiDocsLink: string; 
      lifecycleDocsLink: string; 
    }) => {
      return (
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">{title}</h2>
          <p className="text-gray-700 mb-4">{description}</p>
          <div className="flex gap-4">
            <a 
              href={apiDocsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              API Documentation
            </a>
            <a 
              href={lifecycleDocsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Lifecycle Documentation
            </a>
          </div>
        </div>
      );
    },
  },
  PaymentMethods: {
    label: "Payment Methods",
    fields: {
      title: {
        type: "text",
        defaultValue: "Payment Methods",
      },
      description: {
        type: "textarea",
        defaultValue: "This system manages the various ways customers can pay, from traditional credit cards to modern digital wallets and local payment methods. Each payment method has its own specific requirements, workflows, and success/failure scenarios. The system automatically handles routing, validation, and processing for each method while providing a consistent API interface. It supports everything from basic credit card processing to complex methods like SEPA Direct Debit or Alipay.",
      },
      overviewDocsLink: {
        type: "text",
        defaultValue: "https://docs.stripe.com/payments/payment-methods/overview?locale=en-GB",
      },
      externalDocsLink: {
        type: "text",
        defaultValue: "https://docs.stripe.com/payments/external-payment-methods",
      },
      paymentCategories: {
        type: "array",
        defaultValue: [
          "Cards",
          "Bank debits",
          "Bank redirects",
          "Bank transfers",
          "Buy now, pay later",
          "Real-time payments",
          "Vouchers",
          "Wallets"
        ],
      }
    },
    defaultProps: {
      title: "Payment Methods",
      description: "This system manages the various ways customers can pay, from traditional credit cards to modern digital wallets and local payment methods. Each payment method has its own specific requirements, workflows, and success/failure scenarios. The system automatically handles routing, validation, and processing for each method while providing a consistent API interface. It supports everything from basic credit card processing to complex methods like SEPA Direct Debit or Alipay.",
      overviewDocsLink: "https://docs.stripe.com/payments/payment-methods/overview?locale=en-GB",
      externalDocsLink: "https://docs.stripe.com/payments/external-payment-methods",
      paymentCategories: [
        "Cards",
        "Bank debits",
        "Bank redirects",
        "Bank transfers",
        "Buy now, pay later",
        "Real-time payments",
        "Vouchers",
        "Wallets"
      ]
    },
    render: ({ 
      title, 
      description, 
      overviewDocsLink, 
      externalDocsLink,
      paymentCategories 
    }: { 
      title: string; 
      description: string; 
      overviewDocsLink: string; 
      externalDocsLink: string;
      paymentCategories: string[];
    }) => {
      return (
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">{title}</h2>
          <p className="text-gray-700 mb-4">{description}</p>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Supported Payment Categories:</h3>
            <ul className="list-disc pl-5 space-y-1">
              {paymentCategories.map((category, index) => (
                <li key={index} className="text-gray-600">{category}</li>
              ))}
            </ul>
          </div>

          <div className="flex gap-4">
            <a 
              href={overviewDocsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Payment Methods Overview
            </a>
            <a 
              href={externalDocsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              External Payment Methods
            </a>
          </div>
        </div>
      );
    },
  },
}; 