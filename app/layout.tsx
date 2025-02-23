import './globals.css';
import '../public/assets/scss/topvel.ui.scss';
//import { Inter } from 'next/font/google';
import { Metadata } from 'next';
import ClientLayout from '@/components/layout/ClientLayout';
import { SidebarProvider } from '@/context/SidebarContext';

//const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TV ERP',
  description: 'TV ERP System',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>
        <SidebarProvider>
          <ClientLayout>
            {children}
          </ClientLayout>
        </SidebarProvider>
      </body>
    </html>
  );
}

