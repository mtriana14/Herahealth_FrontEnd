import type { Metadata } from "next";

import { MemberPortalProvider } from "@/app/lib/memberPortal";
import { GoogleAuthProvider } from "@/app/lib/GoogleAuthProvider";

import "./globals.css";

export const metadata: Metadata = {
  title: "HeraHealth",
  description: "HeraHealth coaching and wellness portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <GoogleAuthProvider>
          <MemberPortalProvider>{children}</MemberPortalProvider>
        </GoogleAuthProvider>
      </body>
    </html>
  );
}
