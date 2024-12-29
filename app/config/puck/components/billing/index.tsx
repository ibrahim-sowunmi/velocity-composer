import React from 'react';

export const BillingComponents = {
  AutomaticCardUpdates: {
    label: "Automatic Card Updater",
    fields: {
      title: {
        label: "Title",
        type: "text",
        defaultValue: "Automatic Card Updates",
      },
      description: {
        label: "Description",
        type: "textarea",
        defaultValue: "Proactively updates stored card information when customers receive new cards from their banks. This reduces payment failures for recurring charges and subscriptions.",
      },
      bulletPoints: {
        label: "Bullet Points",
        type: "array",
        arrayFields: {
          title: { type: "text" }
        },
        defaultItemProps: {
          title: "New Feature"
        },
        getItemSummary: (item: { title: string }) => item.title || "Bullet Point",
        defaultValue: [
          { title: "Automatic card information updates" },
          { title: "Webhook notifications for changes" },
          { title: "Reduced payment failures" },
          { title: "Seamless subscription continuity" },
          { title: "Network-level integration" },
          { title: "Cross-border support" }
        ]
      },
      links: {
        label: "Links",
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
            label: "Smarter Saved Cards",
            url: "https://docs.stripe.com/billing/revenue-recovery/smarter-saved-cards"
          },
          {
            label: "Card Updates Documentation",
            url: "https://docs.stripe.com/saving-cards#automatic-card-updates"
          }
        ]
      }
    },
    defaultProps: {
      title: "Automatic Card Updates",
      description: "Proactively updates stored card information when customers receive new cards from their banks. This reduces payment failures for recurring charges and subscriptions.",
      bulletPoints: [
        { title: "Automatic card information updates" },
        { title: "Webhook notifications for changes" },
        { title: "Reduced payment failures" },
        { title: "Seamless subscription continuity" },
        { title: "Network-level integration" },
        { title: "Cross-border support" }
      ],
      links: [
        {
          label: "Smarter Saved Cards",
          url: "https://docs.stripe.com/billing/revenue-recovery/smarter-saved-cards"
        },
        {
          label: "Card Updates Documentation",
          url: "https://docs.stripe.com/saving-cards#automatic-card-updates"
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
                <h3 className="text-lg font-semibold mb-2">Bullet Points</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {bulletPoints.map((point, index) => (
                    <li key={index} className="text-gray-600">{point.title}</li>
                  ))}
                </ul>
              </div>
            )}

            {links && links.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Learn More</h3>
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
    },
  },
}; 