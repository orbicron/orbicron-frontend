import './globals.css'

export const metadata = {
  title: 'PiSplit - Smart Expense Splitter',
  description: 'AI-powered expense splitting with Pi Network tokens',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script src="https://sdk.minepi.com/pi-sdk.js"></script>
      </head>
      <body className="bg-gray-50 min-h-screen">
        {children}
      </body>
    </html>
  )
}
