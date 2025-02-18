import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address } from "@graphprotocol/graph-ts"
import { NewBands } from "../generated/schema"
import { NewBands as NewBandsEvent } from "../generated/FarmlyBollingerBandsStrategy/FarmlyBollingerBandsStrategy"
import { handleNewBands } from "../src/farmly-bollinger-bands-strategy"
import { createNewBandsEvent } from "./farmly-bollinger-bands-strategy-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let price = BigInt.fromI32(234)
    let lowerBand = BigInt.fromI32(234)
    let upperBand = BigInt.fromI32(234)
    let midBand = BigInt.fromI32(234)
    let timestamp = BigInt.fromI32(234)
    let newNewBandsEvent = createNewBandsEvent(
      price,
      lowerBand,
      upperBand,
      midBand,
      timestamp
    )
    handleNewBands(newNewBandsEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("NewBands created and stored", () => {
    assert.entityCount("NewBands", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "NewBands",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "price",
      "234"
    )
    assert.fieldEquals(
      "NewBands",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "lowerBand",
      "234"
    )
    assert.fieldEquals(
      "NewBands",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "upperBand",
      "234"
    )
    assert.fieldEquals(
      "NewBands",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "midBand",
      "234"
    )
    assert.fieldEquals(
      "NewBands",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "timestamp",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
