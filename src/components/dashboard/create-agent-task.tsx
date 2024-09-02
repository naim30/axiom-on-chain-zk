import {
  Box,
  Text,
  TextInput,
  Group,
  Button,
  Card,
  Code,
  InputWrapper,
  Divider,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import React from 'react';
import { isAddress } from 'viem';
import { client } from '../../utils/viem';
import { TaskInfo } from '../../app/page';

type Props = {
  taskInfo?: TaskInfo;
  setTaskInfo: (value: TaskInfo) => void;
};

export default function CreateAgentTask({ taskInfo, setTaskInfo }: Props) {
  const form = useForm({
    mode: 'uncontrolled',

    initialValues: {
      receiver: '',
      amount: 0,
    },

    validate: {
      receiver: (address: string) =>
        isAddress(address) ? null : 'Invalid address',
      amount: (amount: number) => (amount > 0 ? null : 'Invalid amount'),
    },
  });

  const onCreate = async (values: Partial<TaskInfo>) => {
    const blockNumber = await client.getBlockNumber();

    setTaskInfo({ ...values, blockNumber: Number(blockNumber) } as TaskInfo);
  };

  return (
    <Card withBorder className="flex flex-col gap-2">
      <Text fw={600}>Create Agent Task:</Text>

      <form
        onSubmit={form.onSubmit((values) => onCreate(values))}
        className="w-full max-w-[400px] space-y-3"
      >
        <TextInput
          size="xs"
          label="Enter Amount"
          type="number"
          {...form.getInputProps('amount')}
        />

        <TextInput
          size="xs"
          label="Enter Receiver Address"
          {...form.getInputProps('receiver')}
        />

        <Group justify="right">
          <Button className="ml-auto" type="submit">
            Create
          </Button>
        </Group>
      </form>

      {taskInfo && (
        <>
          <Divider />
          <Box className="mt-5 text-xs text-gray-400">
            <Text fw={500} className="mb-2 text-gray-800">
              Agent task info
            </Text>
            <Group gap="xs">
              <div>Receiver Address:</div>
              <Code>{taskInfo.receiver}</Code>
            </Group>

            <Group gap="xs">
              <div>Amount:</div>
              <span className="text-black">{taskInfo.amount}</span>
            </Group>

            <Group gap="xs">
              <div>Block Number:</div>
              <span className="text-black">{taskInfo.blockNumber}</span>
            </Group>
          </Box>
        </>
      )}
    </Card>
  );
}
