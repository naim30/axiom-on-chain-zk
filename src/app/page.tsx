'use client';

import { Page } from '../components/ui/page';
import Agents from '../components/dashboard/agents';
import { Box } from '@mantine/core';
import { useState } from 'react';
import { Agent } from '../utils/agents';
import VerifyAgentAction from '../components/dashboard/verify-agent-action';
import CreateAgentTask from '../components/dashboard/create-agent-task';

export type TaskInfo = {
  receiver: string;
  amount: number;
  blockNumber: number;
};

export default function Home() {
  const [taskInfo, setTaskInfo] = useState<TaskInfo>();

  const [selectedAgent, setSelectedAgent] = useState<Agent>(Agent.One);
  const [agentTransactionHash, setAgentTransactionHash] = useState<string>();

  return (
    <Page title="Portal Dashboard">
      <Box className="grid h-full grid-cols-1 gap-y-5 p-5 sm:grid-cols-3 sm:gap-x-5">
        <Box className="col-span-2 flex flex-1 flex-col gap-5">
          <CreateAgentTask taskInfo={taskInfo} setTaskInfo={setTaskInfo} />

          <VerifyAgentAction
            selectedAgent={selectedAgent}
            taskInfo={taskInfo}
            agentTransactionHash={agentTransactionHash}
          />
        </Box>

        <Box className="col-span-1">
          <Agents
            selectedAgent={selectedAgent}
            setSelectedAgent={setSelectedAgent}
            taskInfo={taskInfo}
            setAgentTransactionHash={setAgentTransactionHash}
          />
        </Box>
      </Box>
    </Page>
  );
}
