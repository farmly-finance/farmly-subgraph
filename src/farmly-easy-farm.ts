import {
  Approval as ApprovalEvent,
  Deposit as DepositEvent,
  Paused as PausedEvent,
  PerformPosition as PerformPositionEvent,
  Transfer as TransferEvent,
  Unpaused as UnpausedEvent,
  Withdraw as WithdrawEvent,
} from "../generated/FarmlyEasyFarm/FarmlyEasyFarm";
import {
  Approval,
  Deposit,
  Paused,
  PerformPosition,
  Transfer,
  Unpaused,
  Withdraw,
  FarmlyEasyFarm as FarmlyEasyFarmEntity,
} from "../generated/schema";
import { ethereum } from "@graphprotocol/graph-ts";
import { dataSource } from "@graphprotocol/graph-ts";
import { FarmlyEasyFarm } from "../generated/FarmlyEasyFarm/FarmlyEasyFarm";
import { BigInt } from "@graphprotocol/graph-ts";
import { Bytes } from "@graphprotocol/graph-ts";
import { FarmlyBollingerBandsStrategy } from "../generated/FarmlyBollingerBandsStrategy/FarmlyBollingerBandsStrategy";
import { Address } from "@graphprotocol/graph-ts";

export function handleInitialize(block: ethereum.Block): void {
  let address = dataSource.address();

  let contract = FarmlyEasyFarm.bind(address);

  let shareTokenName = contract.name();
  let shareTokenSymbol = contract.symbol();
  let shareTokenDecimals = contract.decimals();

  let entity = new FarmlyEasyFarmEntity(address);

  entity.easyFarmAddress = address;
  entity.shareTokenName = shareTokenName;
  entity.shareTokenSymbol = shareTokenSymbol;
  entity.shareTokenDecimals = BigInt.fromI32(shareTokenDecimals);
  entity.strategy = contract.strategy();
  entity.executor = contract.executor();
  entity.token0 = contract.token0();
  entity.token1 = contract.token1();
  entity.token0Decimals = BigInt.fromI32(contract.token0Decimals());
  entity.token1Decimals = BigInt.fromI32(contract.token1Decimals());

  let entityPerformPosition = new PerformPosition(
    Bytes.fromUTF8(
      address
        .toHexString()
        .concat("-")
        .concat(block.number.toString())
        .concat("-")
        .concat(block.timestamp.toString())
    )
  );

  entityPerformPosition.lowerPrice = contract.latestLowerPrice();
  entityPerformPosition.upperPrice = contract.latestUpperPrice();
  entityPerformPosition.sharePrice = BigInt.fromString("1000000000000000000");

  const strategyContract = FarmlyBollingerBandsStrategy.bind(
    Address.fromBytes(entity.strategy)
  );
  entityPerformPosition.timestamp = strategyContract.latestTimestamp();
  entityPerformPosition.blockNumber = block.number;
  entityPerformPosition.blockTimestamp = block.timestamp;
  entityPerformPosition.transactionHash = Bytes.fromUTF8("0");
  entityPerformPosition.farmlyEasyFarm = address;

  entity.save();
  entityPerformPosition.save();
}

export function handleApproval(event: ApprovalEvent): void {
  let entity = new Approval(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.owner = event.params.owner;
  entity.spender = event.params.spender;
  entity.value = event.params.value;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.farmlyEasyFarm = event.address;

  entity.save();
}

export function handleDeposit(event: DepositEvent): void {
  let entity = new Deposit(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.amount0 = event.params.amount0;
  entity.amount1 = event.params.amount1;
  entity.shareAmount = event.params.shareAmount;
  entity.depositUSD = event.params.depositUSD;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.farmlyEasyFarm = event.address;

  entity.save();
}

export function handlePaused(event: PausedEvent): void {
  let entity = new Paused(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.account = event.params.account;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handlePerformPosition(event: PerformPositionEvent): void {
  let entity = new PerformPosition(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.lowerPrice = event.params.lowerPrice;
  entity.upperPrice = event.params.upperPrice;

  let contract = FarmlyEasyFarm.bind(event.address);

  const totalSupply = contract.totalSupply();
  const totalUSDValue = contract.totalUSDValue();
  const sharePrice = totalSupply.equals(BigInt.fromI32(0))
    ? BigInt.fromString("1000000000000000000")
    : totalUSDValue
        .times(BigInt.fromString("1000000000000000000"))
        .div(totalSupply);

  entity.sharePrice = sharePrice;
  entity.timestamp = event.params.timestamp;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.farmlyEasyFarm = event.address;

  entity.save();
}

export function handleTransfer(event: TransferEvent): void {
  let entity = new Transfer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.from = event.params.from;
  entity.to = event.params.to;
  entity.value = event.params.value;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleUnpaused(event: UnpausedEvent): void {
  let entity = new Unpaused(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.account = event.params.account;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleWithdraw(event: WithdrawEvent): void {
  let entity = new Withdraw(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.amount0 = event.params.amount0;
  entity.amount1 = event.params.amount1;
  entity.shareAmount = event.params.shareAmount;
  entity.withdrawUSD = event.params.withdrawUSD;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.farmlyEasyFarm = event.address;

  entity.save();
}
