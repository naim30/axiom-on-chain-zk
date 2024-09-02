import { Box, Button, Card, Code, Group } from '@mantine/core';
import { Text } from '@mantine/core';
import { Agent, agents } from '../../utils/agents';
import clsx from 'clsx';
import { TaskInfo } from '../../app/page';
import { AppConfig } from '../../config/config';
import TokenAbi from '@/utils/abi/Token.json';
import { client, getAccount, getWalletClient } from '../../utils/viem';
import { notifications } from '@mantine/notifications';
import { convertAmountToToken } from '../../utils/currency';

const CONFIG = AppConfig();

type Props = {
  selectedAgent: Agent;
  setSelectedAgent: (agent: Agent) => void;
  taskInfo?: TaskInfo;
  setAgentTransactionHash: (hash: string) => void;
};

export default function Agents({
  selectedAgent,
  setSelectedAgent,
  taskInfo,
  setAgentTransactionHash,
}: Props) {
  const onAction = async (id: Agent) => {
    if (!taskInfo) return;

    const nId = notifications.show({
      title: `Running action`,
      message: 'Please wait...',
      loading: true,
      autoClose: false,
      withCloseButton: false,
      withBorder: true,
    });

    try {
      const account = getAccount(id);

      const { request } = await client.simulateContract({
        account,
        address: CONFIG.NEXT_PUBLIC_TOKEN_CONTRACT as `0x${string}`,
        abi: TokenAbi,
        functionName: 'transfer',
        args: [taskInfo.receiver, convertAmountToToken(taskInfo.amount)],
      });

      const walletClient = getWalletClient(id);
      const hash = await walletClient.writeContract(request);

      console.log({
        ['Transfer Transaction Hash']: hash,
      });

      setAgentTransactionHash(hash);

      notifications.hide(nId);
    } catch (error) {
      console.log({ error });
      notifications.hide(nId);

      notifications.show({
        title: 'Error',
        message: 'Something went wrong, please try again.',
        color: 'red',
      });
    }
  };

  return (
    <Box>
      <Box className="flex flex-col gap-y-2">
        {Object.values(agents).map((agent, index) => {
          const selected = selectedAgent === agent.id;

          return (
            <Card
              key={index}
              className={clsx(
                'cursor-pointer gap-2',
                selected
                  ? 'border-2 border-indigo-100 bg-gray-50'
                  : 'border border-gray-200'
              )}
              onClick={() => setSelectedAgent(agent.id)}
            >
              <Text>{agent.name}</Text>
              <Group>
                <Text size="sm" c="dimmed">
                  Address:
                </Text>
                <Code className={clsx(selected ? 'bg-white' : 'bg-gray-100')}>
                  {agent.address}
                </Code>
              </Group>

              <Group mt="sm" justify="end">
                <Button
                  size="xs"
                  disabled={!taskInfo || !selected}
                  onClick={() => onAction(agent.id)}
                >
                  {taskInfo
                    ? `Send (${taskInfo.amount}) token to ${taskInfo.receiver.slice(0, 4)}...${taskInfo.receiver.slice(-2)}`
                    : 'Send token'}
                </Button>
              </Group>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
}
