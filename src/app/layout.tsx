import { suit } from "@/_lib/fonts";
import { getPrimaryNavigation } from "@/_lib/navigation";
import { getPageBottomBanners } from "@/_lib/page-bottom-banners";
import AccountDock from "@/app/_components/account-dock";
import PageBottomBanners from "@/app/_components/bottom-banners";
import Footer from "@/app/_components/footer";
import Header from "@/app/_components/header";
import MacGptSearchLayer from "@/app/_components/mac-gpt-search";
import QuickReservationForm from "@/app/_components/quick-reservation-form";
import UserActivityTracker from "@/app/_components/user-activity-tracker";
import { NavigationProvider } from "@/app/_providers/navigation-provider";
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [primaryNavigation, pageBottomBanners] = await Promise.all([
    getPrimaryNavigation(),
    getPageBottomBanners(),
  ]);

  return (
    <html
      lang="ko"
      translate="no"
      suppressHydrationWarning
      className={`${suit.className} antialiased`}
    >
      <body>
        <NavigationProvider navigation={primaryNavigation}>
          <ViewportProvider>
            <UserActivityTracker />

            <ScrollDirectionProvider>
              <Header primaryNavigation={primaryNavigation} />
              <QuickReservationForm />
            </ScrollDirectionProvider>

            <MacGptSearchLayer />

            <main>
              {children}
              <PageBottomBanners items={pageBottomBanners} />
            </main>
            <Footer />
            <AccountDock />
          </ViewportProvider>
        </NavigationProvider>
      </body>
    </html>
  );
}
