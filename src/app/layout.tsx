import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fanny Portfolio",
  description: "Künstlerisches Portfolio von Fanny",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <head>
        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
      </head>
      <body>{children}</body>
    </html>
  );
}
