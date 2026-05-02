export const metadata = {
  title: 'ReceptionAI — AI Receptionist Platform',
  description: 'Manage your AI receptionist, call logs, bookings, and MS Teams alerts.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}
