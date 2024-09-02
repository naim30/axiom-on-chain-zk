import { AppConfig } from '../config/config';

const CONFIG = AppConfig();

export enum Agent {
  One = 'AGENT_ONE',
  Two = 'AGENT_TWO',
}

export type AgentInfo = {
  id: Agent;
  name: string;
  address: string;
  privateKey: string;
};

export const agents: Record<Agent, AgentInfo> = {
  [Agent.One]: {
    id: Agent.One,
    name: 'Agent One',
    address: CONFIG.NEXT_PUBLIC_AGENT_ONE,
    privateKey: CONFIG.NEXT_PUBLIC_AGENT_ONE_PRIVATE_KEY,
  },
  [Agent.Two]: {
    id: Agent.Two,
    name: 'Agent Two',
    address: CONFIG.NEXT_PUBLIC_AGENT_TWO,
    privateKey: CONFIG.NEXT_PUBLIC_AGENT_TWO_PRIVATE_KEY,
  },
};
