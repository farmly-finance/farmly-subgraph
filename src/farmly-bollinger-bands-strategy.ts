import {
  NewBands as NewBandsEvent,
  OwnershipTransferred as OwnershipTransferredEvent
} from "../generated/FarmlyBollingerBandsStrategy/FarmlyBollingerBandsStrategy"
import { NewBands, OwnershipTransferred } from "../generated/schema"

export function handleNewBands(event: NewBandsEvent): void {
  let entity = new NewBands(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.price = event.params.price
  entity.lowerBand = event.params.lowerBand
  entity.upperBand = event.params.upperBand
  entity.midBand = event.params.midBand
  entity.timestamp = event.params.timestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
