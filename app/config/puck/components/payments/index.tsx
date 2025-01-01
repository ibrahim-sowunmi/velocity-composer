import React from 'react';

export const PaymentComponents = {
  PaymentIntent: {
    label: "Payment Intents",
    fields: {
      title: {
        label: "Title",
        type: "text",
        defaultValue: "Payment Intents",
      },
      description: {
        label: "Description",
        type: "textarea",
        defaultValue: "A Payment Intent represents the complete lifecycle of a payment transaction. It handles complex scenarios like authentication challenges, card declines, and retries automatically. When you create a Payment Intent, it manages the entire flow from initial authorization through final capture, including any required customer authentication steps like 3D Secure. It's designed to handle edge cases gracefully and provide clear status updates throughout the process.",
      },
      bulletPoints: {
        label: "Key Features",
        type: "array",
        arrayFields: {
          title: { type: "text" }
        },
        defaultItemProps: {
          title: "New Feature"
        },
        getItemSummary: (item: { title: string }) => item.title || "Feature",
        defaultValue: [
          { title: "Complete payment lifecycle management" },
          { title: "Automatic authentication handling" },
          { title: "Retry logic and decline handling" },
          { title: "3D Secure support" },
          { title: "Real-time status updates" },
          { title: "Edge case management" }
        ]
      },
      links: {
        label: "Documentation",
        type: "array",
        arrayFields: {
          label: { type: "text" },
          url: { type: "text" }
        },
        defaultItemProps: {
          label: "New Link",
          url: "https://"
        },
        getItemSummary: (item: { label: string; url: string }) => item.label || "Link",
        defaultValue: [
          {
            label: "API Documentation",
            url: "https://docs.stripe.com/api/payment_intents"
          },
          {
            label: "Payment Intent Lifecycle",
            url: "https://docs.stripe.com/payments/paymentintents/lifecycle?locale=en-GB"
          }
        ]
      }
    },
    defaultProps: {
      title: "Payment Intents",
      description: "A Payment Intent represents the complete lifecycle of a payment transaction. It handles complex scenarios like authentication challenges, card declines, and retries automatically. When you create a Payment Intent, it manages the entire flow from initial authorization through final capture, including any required customer authentication steps like 3D Secure. It's designed to handle edge cases gracefully and provide clear status updates throughout the process.",
      bulletPoints: [
        { title: "Complete payment lifecycle management" },
        { title: "Automatic authentication handling" },
        { title: "Retry logic and decline handling" },
        { title: "3D Secure support" },
        { title: "Real-time status updates" },
        { title: "Edge case management" }
      ],
      links: [
        {
          label: "API Documentation",
          url: "https://docs.stripe.com/api/payment_intents"
        },
        {
          label: "Payment Intent Lifecycle",
          url: "https://docs.stripe.com/payments/paymentintents/lifecycle?locale=en-GB"
        }
      ]
    },
    render: ({ 
      title, 
      description,
      bulletPoints,
      links
    }: { 
      title: string; 
      description: string;
      bulletPoints?: Array<{ title: string; }>;
      links?: Array<{ label: string; url: string; }>;
    }) => {
      return (
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <h2 className="text-xl font-bold mb-4">{title}</h2>
          <p className="text-gray-700 mb-6">{description}</p>
          
          <div className="grid grid-cols-2 gap-6 mb-6">
            {bulletPoints && bulletPoints.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Key Features</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {bulletPoints.map((point, index) => (
                    <li key={index} className="text-gray-600">{point.title}</li>
                  ))}
                </ul>
              </div>
            )}

            {links && links.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Documentation</h3>
                <div className="space-y-3">
                  {links.map((link, index) => (
                    <div key={index}>
                      <a 
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        {link.label}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }
  },
  PaymentMethods: {
    label: "Payment Methods",
    fields: {
      title: {
        label: "Title",
        type: "text",
        defaultValue: "Payment Methods",
      },
      description: {
        label: "Description",
        type: "textarea",
        defaultValue: "This system manages the various ways customers can pay, from traditional credit cards to modern digital wallets and local payment methods. Each payment method has its own specific requirements, workflows, and success/failure scenarios. The system automatically handles routing, validation, and processing for each method while providing a consistent API interface.",
      },
      bulletPoints: {
        label: "Payment Categories",
        type: "array",
        arrayFields: {
          title: { type: "text" }
        },
        defaultItemProps: {
          title: "New Category"
        },
        getItemSummary: (item: { title: string }) => item.title || "Category",
        defaultValue: [
          { title: "Cards" },
          { title: "Bank debits" },
          { title: "Bank redirects" },
          { title: "Bank transfers" },
          { title: "Buy now, pay later" },
          { title: "Real-time payments" },
          { title: "Vouchers" },
          { title: "Wallets" }
        ]
      },
      links: {
        label: "Documentation",
        type: "array",
        arrayFields: {
          label: { type: "text" },
          url: { type: "text" }
        },
        defaultItemProps: {
          label: "New Link",
          url: "https://"
        },
        getItemSummary: (item: { label: string; url: string }) => item.label || "Link",
        defaultValue: [
          {
            label: "Payment Methods Overview",
            url: "https://docs.stripe.com/payments/payment-methods/overview?locale=en-GB"
          },
          {
            label: "External Payment Methods",
            url: "https://docs.stripe.com/payments/external-payment-methods"
          }
        ]
      }
    },
    defaultProps: {
      title: "Payment Methods",
      description: "This system manages the various ways customers can pay, from traditional credit cards to modern digital wallets and local payment methods. Each payment method has its own specific requirements, workflows, and success/failure scenarios. The system automatically handles routing, validation, and processing for each method while providing a consistent API interface.",
      bulletPoints: [
        { title: "Cards" },
        { title: "Bank debits" },
        { title: "Bank redirects" },
        { title: "Bank transfers" },
        { title: "Buy now, pay later" },
        { title: "Real-time payments" },
        { title: "Vouchers" },
        { title: "Wallets" }
      ],
      links: [
        {
          label: "Payment Methods Overview",
          url: "https://docs.stripe.com/payments/payment-methods/overview?locale=en-GB"
        },
        {
          label: "External Payment Methods",
          url: "https://docs.stripe.com/payments/external-payment-methods"
        }
      ]
    },
    render: ({ 
      title, 
      description,
      bulletPoints,
      links
    }: { 
      title: string; 
      description: string;
      bulletPoints?: Array<{ title: string; }>;
      links?: Array<{ label: string; url: string; }>;
    }) => {
      return (
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">{title}</h2>
          <p className="text-gray-700 mb-6">{description}</p>
          
          <div className="grid grid-cols-2 gap-6 mb-6">
            {bulletPoints && bulletPoints.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Payment Categories</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {bulletPoints.map((point, index) => (
                    <li key={index} className="text-gray-600">{point.title}</li>
                  ))}
                </ul>
              </div>
            )}

            {links && links.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Documentation</h3>
                <div className="space-y-3">
                  {links.map((link, index) => (
                    <div key={index}>
                      <a 
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        {link.label}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }
  }
}; 