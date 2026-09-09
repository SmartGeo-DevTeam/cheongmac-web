import { suit } from "@/_lib/fonts";
import AccountDock from "@/app/_components/account-dock";
import Footer from "@/app/_components/footer";
import Header from "@/app/_components/header";
import MacGptSearchLayer from "@/app/_components/mac-gpt-search";
import QuickReservationForm from "@/app/_components/quick-reservation-form";
import UserActivityTracker from "@/app/_components/user-activity-tracker";
import { ScrollDirectionProvider } from "@/app/_providers/scroll-direction-provider";
import { ViewportProvider } from "@/app/_providers/viewport-provider";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "청맥병원",
  description: "혈관 중심의 전문 진료를 제공하는 청맥병원입니다.",
  other: {
    google: "notranslate",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      translate="no"
      suppressHydrationWarning
      className={`${suit.className} antialiased`}
    >
      <body>
        <ViewportProvider>
          <UserActivityTracker />

          <ScrollDirectionProvider>
            <Header />
            <QuickReservationForm />
          </ScrollDirectionProvider>

          <MacGptSearchLayer />

          <main>{children}</main>
          <Footer />
          <AccountDock />
        </ViewportProvider>
      </body>
    </html>
  );
}
