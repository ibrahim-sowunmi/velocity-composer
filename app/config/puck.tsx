import React from 'react';
import { PaymentComponents } from './puck/components/payments';
import { BillingComponents } from './puck/components/billing';
import { CustomComponents } from './puck/components/custom';

// Puck configuration for the application
export const puckConfig = {
  // Define available components by importing from separate files
  components: {
    ...PaymentComponents,
    ...BillingComponents,
    ...CustomComponents,
  },

  // Categories configuration
  categories: {
    payments: {
      title: "PAYMENTS (Core Platform)",
      components: ["PaymentIntent", "PaymentMethods"],
      defaultExpanded: false,
    },
    billing: {
      title: "BILLING",
      components: ["AutomaticCardUpdates",],
      defaultExpanded: false,
    },
    connect: {
      title: "CONNECT",
      components: [],
      defaultExpanded: false,
    },
    radar: {
      title: "RADAR (Fraud & Risk)",
      components: [],
      defaultExpanded: false,
    },
    developerTools: {
      title: "DEVELOPER TOOLS",
      components: [],
      defaultExpanded: false,
    },
    checkoutElements: {
      title: "CHECKOUT & ELEMENTS",
      components: [],
      defaultExpanded: false,
    },
    financialReporting: {
      title: "FINANCIAL REPORTING",
      components: [],
      defaultExpanded: false,
    },
    complianceSecurity: {
      title: "COMPLIANCE & SECURITY",
      components: [],
      defaultExpanded: false,
    },
    atlas: {
      title: "ATLAS (Business Formation)",
      components: [],
      defaultExpanded: false,
    },
    capital: {
      title: "CAPITAL (Business Financing)",
      components: [],
      defaultExpanded: false,
    },
    treasury: {
      title: "TREASURY (BaaS)",
      components: [],
      defaultExpanded: false,
    },
    crypto: {
      title: "CRYPTO",
      components: [],
      defaultExpanded: false,
    },
    climate: {
      title: "CLIMATE (Sustainability)",
      components: [],
      defaultExpanded: false,
    },
    other: {
      title: "Other Components",
      defaultExpanded: true,
    },
  },

  // Root configuration (optional)
  root: {
    render: ({ children }: { children: React.ReactNode }) => {
      return <div className="puck-root">{children}</div>;
    },
  },
}; 