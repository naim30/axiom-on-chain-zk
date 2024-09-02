import '@/styles/globals.css';

import '@mantine/core/styles.css';
import '@mantine/nprogress/styles.css';
import '@mantine/notifications/styles.css';

import clsx from 'clsx';
import { fontFamily } from 'tailwindcss/defaultTheme';

import { createTheme, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

import { RouterTransition } from '../components/ui/router-transition';
import AxiomProvider from '../components/hoc/axiom-provider';

export const metadata = {
  title: 'Portal Dashboard',
};

const theme = createTheme({
  fontFamily: ['var(--font-geist-sans)', ...fontFamily.sans].join(','),
  fontFamilyMonospace: ['var(--font-geist-mono)', ...fontFamily.mono].join(','),
  primaryColor: 'indigo',
  defaultRadius: 'md',
  primaryShade: {
    dark: 7,
    light: 5,
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={clsx(
        GeistSans.variable,
        GeistMono.variable,
        'h-full bg-white'
      )}
    >
      <head>
        <meta name="robots" content="noindex,nofollow"></meta>
      </head>
      <body className="h-full bg-white font-sans">
        <AxiomProvider>
          <MantineProvider theme={theme}>
            <RouterTransition />
            <Notifications position="bottom-right" zIndex={1000} />
            {children}
          </MantineProvider>
        </AxiomProvider>
      </body>
    </html>
  );
}
