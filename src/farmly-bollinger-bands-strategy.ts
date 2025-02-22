import {
  NewBands as NewBandsEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
} from "../generated/FarmlyBollingerBandsStrategy/FarmlyBollingerBandsStrategy";
import {
  NewBands,
  OwnershipTransferred,
  FarmlyStrategy,
} from "../generated/schema";
import { ethereum } from "@graphprotocol/graph-ts";
import { dataSource } from "@graphprotocol/graph-ts";
import { FarmlyBollingerBandsStrategy } from "../generated/FarmlyBollingerBandsStrategy/FarmlyBollingerBandsStrategy";
import { BigInt } from "@graphprotocol/graph-ts";

export function handleInitialize(block: ethereum.Block): void {
  let address = dataSource.address();

  let contract = FarmlyBollingerBandsStrategy.bind(address);

  let entity = new FarmlyStrategy(address);

  entity.strategyAddress = address;
  entity.MA = BigInt.fromI32(contract.MA());
  entity.STD = BigInt.fromI32(contract.STD());
  entity.PERIOD = contract.PERIOD();
  entity.rebalanceThreshold = contract.rebalanceThreshold();
  entity.latestTimestamp = BigInt.fromI32(0);
  entity.nextPeriodStartTimestamp = BigInt.fromI32(0);

  entity.save();
}

export function handleNewBands(event: NewBandsEvent): void {
  let entity = new NewBands(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.price = event.params.price;
  entity.lowerBand = event.params.lowerBand;
  entity.upperBand = event.params.upperBand;
  entity.midBand = event.params.midBand;
  entity.timestamp = event.params.timestamp;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.farmlyStrategy = event.address;

  let contract = FarmlyBollingerBandsStrategy.bind(event.address);

  let latestTimestamp = contract.latestTimestamp();
  let nextPeriodStartTimestamp = contract.nextPeriodStartTimestamp();

  let farmlyStrategy = FarmlyStrategy.load(event.address);

  if (farmlyStrategy) {
    farmlyStrategy.latestTimestamp = latestTimestamp;
    farmlyStrategy.nextPeriodStartTimestamp = nextPeriodStartTimestamp;

    farmlyStrategy.save();
  }

  entity.save();
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.previousOwner = event.params.previousOwner;
  entity.newOwner = event.params.newOwner;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
