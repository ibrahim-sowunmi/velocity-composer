import React from 'react';

export const BillingComponents = {
  AutomaticCardUpdates: {
    label: "Automatic Card Updates",
    fields: {
      title: {
        type: "text",
        defaultValue: "Automatic Card Updates",
      },
      description: {
        type: "textarea",
        defaultValue: "Proactively updates stored card information when customers receive new cards from their banks. This reduces payment failures for recurring charges and subscriptions. The system works with card networks to receive updated card information and automatically updates any stored payment methods, notifying you of changes through webhooks.",
      },
      billingDocsLink: {
        type: "text",
        defaultValue: "https://docs.stripe.com/billing/revenue-recovery/smarter-saved-cards",
      },
      cardsDocsLink: {
        type: "text",
        defaultValue: "https://docs.stripe.com/saving-cards#automatic-card-updates",
      },
      supportedNetworks: {
        type: "array",
        defaultValue: [
          "American Express",
          "Visa",
          "Mastercard",
          "Discover"
        ],
      },
      keyFeatures: {
        type: "array",
        defaultValue: [
          "Automatic card information updates",
          "Webhook notifications for changes",
          "Reduced payment failures",
          "Seamless subscription continuity",
          "Network-level integration",
          "Cross-border support"
        ],
      },
      updateEvents: {
        type: "array",
        defaultValue: [
          "Card expiration updates",
          "Card replacement updates",
          "Lost/stolen card replacements",
          "Bank-initiated updates",
          "Network-initiated changes",
          "Issuer account updates"
        ],
      }
    },
    defaultProps: {
      title: "Automatic Card Updates",
      description: "Proactively updates stored card information when customers receive new cards from their banks. This reduces payment failures for recurring charges and subscriptions. The system works with card networks to receive updated card information and automatically updates any stored payment methods, notifying you of changes through webhooks.",
      billingDocsLink: "https://docs.stripe.com/billing/revenue-recovery/smarter-saved-cards",
      cardsDocsLink: "https://docs.stripe.com/saving-cards#automatic-card-updates",
      supportedNetworks: [
        "American Express",
        "Visa",
        "Mastercard",
        "Discover"
      ],
      keyFeatures: [
        "Automatic card information updates",
        "Webhook notifications for changes",
        "Reduced payment failures",
        "Seamless subscription continuity",
        "Network-level integration",
        "Cross-border support"
      ],
      updateEvents: [
        "Card expiration updates",
        "Card replacement updates",
        "Lost/stolen card replacements",
        "Bank-initiated updates",
        "Network-initiated changes",
        "Issuer account updates"
      ]
    },
    render: ({ 
      title, 
      description, 
      billingDocsLink,
      cardsDocsLink,
      supportedNetworks,
      keyFeatures,
      updateEvents 
    }: { 
      title: string; 
      description: string; 
      billingDocsLink: string;
      cardsDocsLink: string;
      supportedNetworks: string[];
      keyFeatures: string[];
      updateEvents: string[];
    }) => {
      return (
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">{title}</h2>
          <p className="text-gray-700 mb-6">{description}</p>
          
          <div className="grid grid-cols-3 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Supported Networks</h3>
              <ul className="list-disc pl-5 space-y-1">
                {supportedNetworks.map((network, index) => (
                  <li key={index} className="text-gray-600">{network}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Key Features</h3>
              <ul className="list-disc pl-5 space-y-1">
                {keyFeatures.map((feature, index) => (
                  <li key={index} className="text-gray-600">{feature}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Update Events</h3>
              <ul className="list-disc pl-5 space-y-1">
                {updateEvents.map((event, index) => (
                  <li key={index} className="text-gray-600">{event}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex gap-4">
            <a 
              href={billingDocsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Billing Integration Guide
            </a>
            <a 
              href={cardsDocsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Card Updates Documentation
            </a>
          </div>
        </div>
      );
    },
  },
}; 