import { newMockEvent } from "matchstick-as";
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts";
import {
  Approval,
  Deposit,
  Paused,
  PerformPosition,
  Transfer,
  Unpaused,
  Withdraw,
} from "../generated/FarmlyEasyFarm/FarmlyEasyFarm";

export function createApprovalEvent(
  owner: Address,
  spender: Address,
  value: BigInt
): Approval {
  let approvalEvent = changetype<Approval>(newMockEvent());

  approvalEvent.parameters = new Array();

  approvalEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  );
  approvalEvent.parameters.push(
    new ethereum.EventParam("spender", ethereum.Value.fromAddress(spender))
  );
  approvalEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  );

  return approvalEvent;
}

export function createDepositEvent(
  amount0: BigInt,
  amount1: BigInt,
  shareAmount: BigInt,
  depositUSD: BigInt
): Deposit {
  let depositEvent = changetype<Deposit>(newMockEvent());

  depositEvent.parameters = new Array();

  depositEvent.parameters.push(
    new ethereum.EventParam(
      "amount0",
      ethereum.Value.fromUnsignedBigInt(amount0)
    )
  );
  depositEvent.parameters.push(
    new ethereum.EventParam(
      "amount1",
      ethereum.Value.fromUnsignedBigInt(amount1)
    )
  );
  depositEvent.parameters.push(
    new ethereum.EventParam(
      "shareAmount",
      ethereum.Value.fromUnsignedBigInt(shareAmount)
    )
  );
  depositEvent.parameters.push(
    new ethereum.EventParam(
      "depositUSD",
      ethereum.Value.fromUnsignedBigInt(depositUSD)
    )
  );

  return depositEvent;
}

export function createPausedEvent(account: Address): Paused {
  let pausedEvent = changetype<Paused>(newMockEvent());

  pausedEvent.parameters = new Array();

  pausedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  );

  return pausedEvent;
}

export function createPerformPositionEvent(
  amount0Added: BigInt,
  amount1Added: BigInt,
  upperPrice: BigInt,
  lowerPrice: BigInt,
  sharePrice: BigInt,
  timestamp: BigInt
): PerformPosition {
  let performPositionEvent = changetype<PerformPosition>(newMockEvent());

  performPositionEvent.parameters = new Array();

  performPositionEvent.parameters.push(
    new ethereum.EventParam(
      "amount0Added",
      ethereum.Value.fromUnsignedBigInt(amount0Added)
    )
  );
  performPositionEvent.parameters.push(
    new ethereum.EventParam(
      "amount1Added",
      ethereum.Value.fromUnsignedBigInt(amount1Added)
    )
  );
  performPositionEvent.parameters.push(
    new ethereum.EventParam(
      "upperPrice",
      ethereum.Value.fromUnsignedBigInt(upperPrice)
    )
  );
  performPositionEvent.parameters.push(
    new ethereum.EventParam(
      "lowerPrice",
      ethereum.Value.fromUnsignedBigInt(lowerPrice)
    )
  );
  performPositionEvent.parameters.push(
    new ethereum.EventParam(
      "sharePrice",
      ethereum.Value.fromUnsignedBigInt(sharePrice)
    )
  );
  performPositionEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  );

  return performPositionEvent;
}

export function createTransferEvent(
  from: Address,
  to: Address,
  value: BigInt
): Transfer {
  let transferEvent = changetype<Transfer>(newMockEvent());

  transferEvent.parameters = new Array();

  transferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  );
  transferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  );
  transferEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  );

  return transferEvent;
}

export function createUnpausedEvent(account: Address): Unpaused {
  let unpausedEvent = changetype<Unpaused>(newMockEvent());

  unpausedEvent.parameters = new Array();

  unpausedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  );

  return unpausedEvent;
}

export function createWithdrawEvent(
  amount0: BigInt,
  amount1: BigInt,
  shareAmount: BigInt,
  withdrawUSD: BigInt
): Withdraw {
  let withdrawEvent = changetype<Withdraw>(newMockEvent());

  withdrawEvent.parameters = new Array();

  withdrawEvent.parameters.push(
    new ethereum.EventParam(
      "amount0",
      ethereum.Value.fromUnsignedBigInt(amount0)
    )
  );
  withdrawEvent.parameters.push(
    new ethereum.EventParam(
      "amount1",
      ethereum.Value.fromUnsignedBigInt(amount1)
    )
  );
  withdrawEvent.parameters.push(
    new ethereum.EventParam(
      "shareAmount",
      ethereum.Value.fromUnsignedBigInt(shareAmount)
    )
  );
  withdrawEvent.parameters.push(
    new ethereum.EventParam(
      "withdrawUSD",
      ethereum.Value.fromUnsignedBigInt(withdrawUSD)
    )
  );

  return withdrawEvent;
}
