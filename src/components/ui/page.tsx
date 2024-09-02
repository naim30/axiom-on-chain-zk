'use client';

import { Box, LoadingOverlay } from '@mantine/core';
import { type ReactNode, type FC, type PropsWithChildren } from 'react';

interface PageProps extends PropsWithChildren {
  title: string | ReactNode;
  action?: ReactNode;
}

export const Page: FC<PageProps> = ({ children, title, action }) => {
  return (
    <Box className="flex min-h-full flex-col">
      <div className="sticky top-0 z-40 flex min-h-16 shrink-0 flex-wrap items-center bg-white px-5 shadow-sm">
        <h1 className="text-xl font-semibold leading-6 text-gray-900">
          {title}
        </h1>
        <div className="ml-auto flex">{action}</div>
      </div>

      <div className="h-full flex-1">{children}</div>
    </Box>
  );
};
