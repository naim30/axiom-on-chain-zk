import { cleanEnv, num, str } from 'envalid';

const env = cleanEnv(process.env, {
  NEXT_PUBLIC_AGENT_ONE: str({
    default: '0x648896e43acDBb0aCD1A90572C1AdD918E8F0C38',
    devDefault: '0x648896e43acDBb0aCD1A90572C1AdD918E8F0C38',
  }),
  NEXT_PUBLIC_AGENT_ONE_PRIVATE_KEY: str({
    default:
      '0x50aa564d0419ef812159afc3154a326227c1dccc065245ce3aa4c03a9bd75d61',
    devDefault:
      '0x50aa564d0419ef812159afc3154a326227c1dccc065245ce3aa4c03a9bd75d61',
  }),

  NEXT_PUBLIC_AGENT_TWO: str({
    default: '0x98919DA62E733c7a715B831eb2484Fc5d05CA847',
    devDefault: '0x98919DA62E733c7a715B831eb2484Fc5d05CA847',
  }),
  NEXT_PUBLIC_AGENT_TWO_PRIVATE_KEY: str({
    default:
      '0xa9b0c9ce33229bf070553465a9e750238f5b09578d4950c0a91a1f1402d33269',
    devDefault:
      '0xa9b0c9ce33229bf070553465a9e750238f5b09578d4950c0a91a1f1402d33269',
  }),

  NEXT_PUBLIC_SEPOLIA_RPC: str({
    default:
      'https://eth-sepolia.g.alchemy.com/v2/jYRcQRz4qQeyfCwc8f7DYViBMJqz_joC',
    devDefault:
      'https://eth-sepolia.g.alchemy.com/v2/jYRcQRz4qQeyfCwc8f7DYViBMJqz_joC',
  }),

  NEXT_PUBLIC_SEPOLIA_CHAIN_ID: num({
    default: 11155111,
    devDefault: 11155111,
  }),

  NEXT_PUBLIC_TOKEN_CONTRACT: str({
    default: '0x885CD72d47b5FB08B309d66F92d025d9541906Ea',
    devDefault: '0x885CD72d47b5FB08B309d66F92d025d9541906Ea',
  }),
  NEXT_PUBLIC_TARGET_CONTRACT: str({
    default: '0x55c7135bAA0177b8a739d4064606129b22Cd2158',
    devDefault: '0x55c7135bAA0177b8a739d4064606129b22Cd2158',
  }),
});

export const AppConfig = () => ({ ...env });
