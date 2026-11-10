import { suit } from '@/app/_lib/config/fonts';
import SiteFooter from '@/app/_components/site/footer';
import SiteHeader from '@/app/_components/site/header';
import MacGptSearchLayer from '@/app/_components/site/mac-gpt-search';
import { ScrollDirectionProvider } from '@/app/_providers/scroll-direction-provider';
import { ViewportProvider } from '@/app/_providers/viewport-provider';
import type { Metadata } from 'next';
import Spacer from './_components/common/spacer';
import QuickReservationForm from './_components/site/quick-reservation-form';
import './globals.css';

export const metadata: Metadata = {
  title: '청맥병원',
  description: '혈관 중심의 전문 진료를 제공하는 청맥병원입니다.',
  other: {
    google: 'notranslate',
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
          <ScrollDirectionProvider>
            <SiteHeader />
            <Spacer type="mobile-content-header" />
            <QuickReservationForm />
          </ScrollDirectionProvider>

          <MacGptSearchLayer />

          <main>{children}</main>
          <SiteFooter />
        </ViewportProvider>
      </body>
    </html>
  );
}
