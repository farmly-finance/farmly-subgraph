import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  NewBands,
  OwnershipTransferred
} from "../generated/FarmlyBollingerBandsStrategy/FarmlyBollingerBandsStrategy"

export function createNewBandsEvent(
  price: BigInt,
  lowerBand: BigInt,
  upperBand: BigInt,
  midBand: BigInt,
  timestamp: BigInt
): NewBands {
  let newBandsEvent = changetype<NewBands>(newMockEvent())

  newBandsEvent.parameters = new Array()

  newBandsEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )
  newBandsEvent.parameters.push(
    new ethereum.EventParam(
      "lowerBand",
      ethereum.Value.fromUnsignedBigInt(lowerBand)
    )
  )
  newBandsEvent.parameters.push(
    new ethereum.EventParam(
      "upperBand",
      ethereum.Value.fromUnsignedBigInt(upperBand)
    )
  )
  newBandsEvent.parameters.push(
    new ethereum.EventParam(
      "midBand",
      ethereum.Value.fromUnsignedBigInt(midBand)
    )
  )
  newBandsEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return newBandsEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}
