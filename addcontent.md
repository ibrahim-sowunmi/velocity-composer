# Adding Components to the Content Library

## Overview
The editor uses custom-defined components to render content. Each component must be configured in the Puck editor's configuration file with specific functionalities.

## Component Configuration
Components are defined in the configuration file with their respective functionalities. Reference the official API documentation for a complete list of available configuration options.

## File Structure
- Main configuration file: `app/config/puck.tsx`
- Component directory: `app/config/puck/components/`
- Components are organized by category, with each category having its own directory and `index.ts` file

## Adding a New Component

### 1. Create Component File
Create a new component file in the appropriate category directory under `app/config/puck/components/`.

### 2. Define Component Configuration
Add your component configuration to the `puckConfig` object. Here's a basic example:

```typescript
const puckConfig = {
  components: {
    HeadingBlock: {
      fields: {
        children: {
          type: "text",
        },
      },
      render: ({ children }) => {
        return <h1>{children}</h1>;
      },
    },
  },
};
```
### 3. Import and Register Component
1. Export your component from its category's `index.ts` file
2. Import the component into `puck.tsx`
3. Add the component to the appropriate category in the `puckConfig`

## Example Implementation
For a practical example of component implementation, refer to `app/config/puck/components/billing/index.tsx`.

## Component Organization
To maintain code organization and prevent the main configuration file from becoming too large, components are split into separate files based on their categories.

## Support
For additional assistance or questions, contact Ibrahim (@ibrahims).