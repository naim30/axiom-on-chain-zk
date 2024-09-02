import { createPublicClient, createWalletClient, http } from 'viem';
import { sepolia } from 'viem/chains';
import { AppConfig } from '@/config/config';
import { privateKeyToAccount } from 'viem/accounts';
import { Agent, agents } from './agents';

const CONFIG = AppConfig();

export const client = createPublicClient({
  chain: sepolia,
  transport: http(CONFIG.NEXT_PUBLIC_SEPOLIA_RPC),
});

export const getAccount = (id: Agent) => {
  return privateKeyToAccount(agents[id].privateKey as `0x${string}`);
};

export const getWalletClient = (id: Agent) => {
  const account = getAccount(id);
  return createWalletClient({
    account,
    chain: sepolia,
    transport: http(CONFIG.NEXT_PUBLIC_SEPOLIA_RPC),
  });
};
