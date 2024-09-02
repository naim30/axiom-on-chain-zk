import VerifierAbi from '@/utils/abi/Verifier.json';
import { AppConfig } from '../config/config';
import compiledCircuit from '@/axiom/data/compile.json';
import inputs from '@/axiom/data/inputs.json';

const CONFIG = AppConfig();

export const AxiomSettings = {
  compiledCircuit,
  inputs,
  rpcUrl: CONFIG.NEXT_PUBLIC_SEPOLIA_RPC as string,
  chainId: CONFIG.NEXT_PUBLIC_SEPOLIA_CHAIN_ID,
  callbackTarget: CONFIG.NEXT_PUBLIC_TARGET_CONTRACT,
  callbackAbi: VerifierAbi,
};

export const bytes32 = (input: string): string => {
  const val = BigInt(input);
  return '0x' + val.toString(16).padStart(64, '0').toLowerCase();
};
