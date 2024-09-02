'use client';

import { NavigationProgress, nprogress } from '@mantine/nprogress';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export const RouterTransition = () => {
  const pathname = usePathname();

  useEffect(() => {
    setTimeout(() => nprogress.complete(), 600);
    return () => {
      nprogress.start();
    };
  }, [pathname]);

  return <NavigationProgress size={5} />;
};
