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
      <body>
        <script
          src="https://identity.netlify.com/v1/netlify-identity-widget.js"
          async
        />
        {children}
      </body>
    </html>
  );
}
