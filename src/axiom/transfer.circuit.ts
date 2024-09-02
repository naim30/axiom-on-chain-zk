import {
  CircuitValue,
  constant,
  add,
  checkEqual,
  checkLessThan,
  getReceipt,
  getTx,
  addToCallback,
} from '@axiom-crypto/client';

export const defaultInputs = {
  blockNumber: 6616570,
  from: '0xcb4aEc2b933Ea8315480892Ba05b211c7c571672',
  to: '0xa61fF152b75572853e54C592e8D1f5f5A5A9f9eb',
  token: '0x885CD72d47b5FB08B309d66F92d025d9541906Ea',
  amount: 10000000000000000000,
  transactionBlockNumber: 6616570,
  transactionIndex: 18,
};

export type CircuitInputType = typeof defaultInputs;

export interface CircuitInputs extends CircuitInputType {}

export interface CircuitValueInputs {
  blockNumber: CircuitValue;
  from: CircuitValue;
  to: CircuitValue;
  token: CircuitValue;
  amount: CircuitValue;
  transactionBlockNumber: CircuitValue;
  transactionIndex: CircuitValue;
}

export const circuit = async (inputs: CircuitValueInputs) => {
  var maxBlockNumber = add(inputs.blockNumber, constant(100));

  if (inputs.transactionBlockNumber.value() >= maxBlockNumber.value()) {
    throw new Error(
      'transaction block number must be less than the maximum block number.'
    );
  }
  checkLessThan(inputs.transactionBlockNumber, maxBlockNumber);

  var transaction = getTx(
    inputs.transactionBlockNumber,
    inputs.transactionIndex
  );
  var _token = await transaction.to();
  if (_token.toCircuitValue().address() !== inputs.token.address()) {
    throw new Error(
      'The token address in the transaction must be the same as the token address.'
    );
  }
  checkEqual(_token.toCircuitValue(), inputs.token);

  var receipt = getReceipt(
    inputs.transactionBlockNumber,
    inputs.transactionIndex
  );
  var logs = receipt.log(0);
  var _from = await logs.topic(
    1,
    '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'
  );
  if (_from.toCircuitValue().address() !== inputs.from.address()) {
    throw new Error(
      "The 'from' address in the transaction log must be the same as the sender's address."
    );
  }
  checkEqual(_from.toCircuitValue(), inputs.from);

  var _to = await logs.topic(
    2,
    '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'
  );
  if (_to.toCircuitValue().address() !== inputs.to.address()) {
    throw new Error(
      "The 'to' address in the transaction log must be the same as the receiver's address."
    );
  }
  checkEqual(_to.toCircuitValue(), inputs.to);

  var _amount = await logs.data(
    0,
    '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'
  );
  if (_amount.toCircuitValue().value() !== inputs.amount.value()) {
    throw new Error(
      "The 'amount' in the transaction log must be the same as the amount being transferred."
    );
  }
  checkEqual(_amount.toCircuitValue(), inputs.amount);

  addToCallback(inputs.transactionBlockNumber);
  addToCallback(_from);
  addToCallback(_to);
  addToCallback(_token);
  addToCallback(_amount);
};
