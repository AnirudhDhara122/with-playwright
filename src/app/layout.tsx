export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en">
        <head>
            <title>App router Title</title>
        </head>

        <body>
          <nav>Header</nav>
          {children}</body>
      </html>
    )
  }