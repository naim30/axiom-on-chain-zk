import {
  Box,
  Text,
  TextInput,
  Group,
  Button,
  Card,
  Anchor,
  Divider,
} from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { Agent, agents } from '../../utils/agents';
import { TaskInfo } from '../../app/page';
import { useAxiomCircuit } from '@axiom-crypto/react';
import { AxiomSettings, bytes32 } from '../../utils/axiom';
import { client, getWalletClient } from '../../utils/viem';
import { convertAmountToToken } from '../../utils/currency';
import { AppConfig } from '../../config/config';
import { notifications } from '@mantine/notifications';

const CONFIG = AppConfig();

type Props = {
  selectedAgent: Agent;
  taskInfo?: TaskInfo;
  agentTransactionHash?: string;
};

export default function VerifyAgentAction({
  selectedAgent,
  taskInfo,
  agentTransactionHash,
}: Props) {
  const [transactionHash, setTransactionHash] = useState<string>(
    agentTransactionHash || ''
  );

  const [queryTransactionHash, setQueryTransactionHash] = useState<
    string | undefined
  >();

  const [isVerifiable, setIsVerifiable] = useState(false);

  useEffect(() => {
    if (!transactionHash && agentTransactionHash) {
      setTransactionHash(agentTransactionHash);
    }
  }, [agentTransactionHash]);

  const { build, setParams, areParamsSet } =
    useAxiomCircuit<typeof AxiomSettings.inputs>();

  const onSetParams = async () => {
    if (!transactionHash || !taskInfo) return;

    const nId = notifications.show({
      title: `Running action`,
      message: 'Please wait...',
      loading: true,
      autoClose: false,
      withCloseButton: false,
      withBorder: true,
    });

    try {
      const blockNumber = taskInfo.blockNumber;
      const from = agents[selectedAgent].address;
      const to = taskInfo.receiver;
      const amount = convertAmountToToken(taskInfo.amount);
      const token = CONFIG.NEXT_PUBLIC_TOKEN_CONTRACT;

      const transaction = await client.getTransaction({
        hash: transactionHash as `0x${string}`,
      });
      const transactionIndex = transaction.transactionIndex;
      const transactionBlockNumber = Number(transaction.blockNumber);

      setParams(
        {
          blockNumber,
          from,
          to,
          token,
          amount,
          transactionBlockNumber,
          transactionIndex,
        },
        CONFIG.NEXT_PUBLIC_TARGET_CONTRACT,
        bytes32(from),
        from
      );

      setTimeout(() => {
        setIsVerifiable(true);
      }, 1000);

      notifications.hide(nId);
    } catch (error) {
      notifications.hide(nId);

      notifications.show({
        title: 'Error',
        message: 'Something went wrong, please try again.',
        color: 'red',
      });
    }
  };

  const onVerify = async () => {
    if (!areParamsSet) return;

    const nId = notifications.show({
      title: `Running action`,
      message: 'Please wait...',
      loading: true,
      autoClose: false,
      withCloseButton: false,
      withBorder: true,
    });

    try {
      const queryArgs = await build();

      const { request } = await client.simulateContract({
        ...queryArgs!,
        address: queryArgs!.address as `0x${string}`,
      });

      const walletClient = getWalletClient(selectedAgent);
      const hash = await walletClient.writeContract(request);

      console.log({
        ['Query Transaction Hash']: hash,
      });

      setQueryTransactionHash(hash);

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
    <Card withBorder>
      <Text fw={600}>Verify Agent Action:</Text>
      <Text size="sm" className="w-full max-w-[700px]" c="dimmed">
        Verify if you&apos;ve completed the task by submitting your transaction
        hash. Ensure that the ERC-20 token transfer was executed within 100
        blocks of the request
      </Text>

      <form className="mt-5 w-full max-w-[400px] space-y-3">
        <TextInput
          size="xs"
          label="Transaction Hash"
          value={transactionHash}
          onChange={(event) => setTransactionHash(event.target.value)}
        />

        <Group justify="right">
          {!areParamsSet || !isVerifiable ? (
            <Button className="ml-auto" onClick={() => onSetParams()}>
              Set Params
            </Button>
          ) : (
            <Button className="ml-auto" onClick={() => onVerify()}>
              Verify
            </Button>
          )}
        </Group>
      </form>

      {queryTransactionHash && (
        <>
          <Divider mt="xs" />
          <Box className="mt-5 text-xs text-gray-400">
            <Group gap="xs">
              <div>Transaction:</div>
              <Anchor
                size="xs"
                href={`https://sepolia.etherscan.io/tx/${queryTransactionHash}`}
                target="_blank"
              >
                Open Transaction on Etherscan
              </Anchor>
            </Group>
          </Box>
        </>
      )}
    </Card>
  );
}
