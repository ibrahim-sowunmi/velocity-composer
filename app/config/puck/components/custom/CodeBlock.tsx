"use client";

import { Config } from "@measured/puck";
import React from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import styles from './CodeBlock.module.css';

// Import additional Prism languages
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-ruby';

type CodeBlockProps = {
  title: string;
  language: string;
  code: string;
};

const CodeBlockComponent: Config<{ CodeBlock: CodeBlockProps }>["components"] = {
  CodeBlock: {
    label: "Code Block",
    fields: {
      title: {
        type: "text",
        label: "Title"
      },
      language: {
        type: "select",
        label: "Programming Language",
        options: [
          { label: "JavaScript", value: "javascript" },
          { label: "TypeScript", value: "typescript" },
          { label: "JSX", value: "jsx" },
          { label: "TSX", value: "tsx" },
          { label: "CSS", value: "css" },
          { label: "Python", value: "python" },
          { label: "Java", value: "java" },
          { label: "Go", value: "go" },
          { label: "Ruby", value: "ruby" },
          { label: "Rust", value: "rust" },
          { label: "JSON", value: "json" },
          { label: "YAML", value: "yaml" },
          { label: "Markdown", value: "markdown" },
          { label: "Bash", value: "bash" },
          { label: "SQL", value: "sql" },
        ]
      },
      code: {
        type: "textarea",
        label: "Code"
      }
    },
    defaultProps: {
      title: "Stripe API Example",
      language: "javascript",
      code: 
      `const stripe = require('stripe')('sk_test_...');

// Create a customer
const customer = await stripe.customers.create({
  email: 'customer@example.com',
});

// Create a PaymentIntent
const paymentIntent = await stripe.paymentIntents.create({
  amount: 2000, // amount in cents
  currency: 'usd',
  customer: customer.id,
  payment_method: 'card',
  description: 'Example payment'
});
`
    },
    render: ({ title, language, code }) => {
      // Disable ESLint for hooks in Puck render function
      // eslint-disable-next-line react-hooks/rules-of-hooks
      React.useEffect(() => {
        if (typeof window !== 'undefined') {
          Prism.highlightAll();
        }
      }, [code, language]);

      // eslint-disable-next-line react-hooks/rules-of-hooks
      const formattedCode = React.useMemo(() => {
        try {
          return code.trim();
        } catch {
          return code;
        }
      }, [code]);

      return (
        <div className={`${styles.codeBlockWrapper} ${styles.syntaxHighlighting}`}>
          <div className={styles.codeBlockHeader}>
            <h3 className={styles.codeBlockTitle}>{title}</h3>
            <div className={styles.headerActions}>
              <span className={styles.languageBadge}>{language}</span>
            </div>
          </div>
          <pre className={styles.codeBlock}>
            <code className={`language-${language}`}>
              {formattedCode}
            </code>
          </pre>
        </div>
      );
    }
  }
};

export const CodeBlock = CodeBlockComponent; 