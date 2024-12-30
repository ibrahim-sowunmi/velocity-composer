# Velocity Composer

A web application for quickly creating and managing email templates, much less LLM wrangling. ;)

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn or pnpm
- A Google Cloud Platform account for authentication

## Setup Instructions

1. **Clone the repository and install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

2. **Set up Google Authentication**
   - Go to the [Google Cloud Console](https://console.cloud.google.com)
   - Create a new project or select an existing one
   - Enable the Google+ API
   - Go to Credentials → Create Credentials → OAuth Client ID
   - Set up the OAuth consent screen if not already done
   - Choose Web Application as the application type
   - Add `http://localhost:3000` to Authorized JavaScript origins
   - Add `http://localhost:3000/api/auth/callback/google` to Authorized redirect URIs
   - Copy the Client ID and Client Secret

3. **Set up the database**
   - Create a PostgreSQL database named `velocity_database`
   - Create a user with access to this database
   - Create a `.env` file in the root directory with the following variables:
     ```env
     # Database
     DATABASE_URL=postgresql://user:password@localhost:5432/velocity_database
     
     # Authentication
     AUTH_SECRET=your-secret-key # Generate a secure random string
     AUTH_GOOGLE_ID=your-google-client-id
     AUTH_GOOGLE_SECRET=your-google-client-secret
     ```

4. **Run database migrations**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

The application should now be running at [http://localhost:3000](http://localhost:3000).

## Project Structure

```
velocity-composer/
├── app/                # Next.js app directory
├── lib/               # Database singleton
├── prisma/            # Database schema and migrations
└── public/            # Static assets
```

## Features

- Content composition using Puck
- File and folder management
- Real-time preview
- Responsive design
- Authentication and authorization

## Development

- The project uses Next.js App Router
- Styling is done with Tailwind CSS
- Database ORM is Prisma
- Authentication is handled by NextAuth.js with Google OAuth

## Environment Variables

Required environment variables:
- `DATABASE_URL`: PostgreSQL connection string
- `AUTH_SECRET`: Secret key for authentication (generate a secure random string)
- `AUTH_GOOGLE_ID`: Google OAuth Client ID
- `AUTH_GOOGLE_SECRET`: Google OAuth Client Secret

## Development Workflow

### Running Tests
```bash
npm run test
# or
yarn test
# or
pnpm test
```

### Linting
```bash
npm run lint
# or
yarn lint
# or
pnpm lint
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

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

## Troubleshooting

Common issues and their solutions:

1. **Database Connection Issues**
   - Verify PostgreSQL is running
   - Check DATABASE_URL format
   - Ensure database user has proper permissions

2. **Authentication Errors**
   - Verify Google OAuth credentials
   - Check redirect URIs in Google Console
   - Ensure all environment variables are set correctly
