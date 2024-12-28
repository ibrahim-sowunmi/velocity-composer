// Puck configuration for the application
export const puckConfig = {
  components: {
    HeadingBlock: {
      fields: {
        children: {
          type: "text",
        },
      },
      render: ({ children }: { children: string }) => {
        return <h1>{children}</h1>
      },
    },
  },
} 