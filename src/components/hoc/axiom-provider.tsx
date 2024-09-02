'use client';

import { useEffect, useState } from 'react';
import { AxiomCircuitProvider } from '@axiom-crypto/react';
import { AxiomSettings } from '@/utils/axiom';

export default function AxiomProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <AxiomCircuitProvider
      compiledCircuit={AxiomSettings.compiledCircuit}
      rpcUrl={AxiomSettings.rpcUrl}
      chainId={AxiomSettings.chainId}
    >
      {mounted && children}
    </AxiomCircuitProvider>
  );
}
