"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var yaml = require("js-yaml");
var eventsBollingerBandsStrategy = [
    {
        event: "NewBands(uint256,uint256,uint256,uint256,uint256)",
        handler: "handleNewBands",
    },
    {
        event: "OwnershipTransferred(indexed address,indexed address)",
        handler: "handleOwnershipTransferred",
    },
];
var eventsEasyFarm = [
    {
        event: "Approval(indexed address,indexed address,uint256)",
        handler: "handleApproval",
    },
    {
        event: "Deposit(uint256,uint256,uint256,uint256)",
        handler: "handleDeposit",
    },
    {
        event: "Paused(address)",
        handler: "handlePaused",
    },
    {
        event: "PerformPosition(uint256,uint256,uint256)",
        handler: "handlePerformPosition",
    },
    {
        event: "Transfer(indexed address,indexed address,uint256)",
        handler: "handleTransfer",
    },
    {
        event: "Unpaused(address)",
        handler: "handleUnpaused",
    },
    {
        event: "Withdraw(uint256,uint256,uint256,uint256)",
        handler: "handleWithdraw",
    },
];
var entitiesEasyFarm = [
    "Approval",
    "Deposit",
    "Paused",
    "PerformPosition",
    "Transfer",
    "Unpaused",
    "Withdraw",
];
var entitiesBollingerBandsStrategy = ["NewBands", "OwnershipTransferred"];
var blockHandlersEasyFarm = [
    {
        handler: "handleInitialize",
        filter: {
            kind: "once",
        },
    },
];
var blockHandlersBollingerBandsStrategy = [
    {
        handler: "handleInitialize",
        filter: {
            kind: "once",
        },
    },
];
function generateSubgraphYaml(configPath) {
    // Read the JSON configuration
    var configContent = fs.readFileSync(configPath, "utf-8");
    var config = JSON.parse(configContent);
    // Base subgraph configuration
    var subgraphConfig = {
        specVersion: "1.0.0",
        indexerHints: {
            prune: "auto",
        },
        schema: {
            file: "./schema.graphql",
        },
        dataSources: [],
    };
    // Add data sources from the configuration
    for (var _i = 0, _a = config.dataSources; _i < _a.length; _i++) {
        var source = _a[_i];
        var mapping = {
            kind: "ethereum/events",
            apiVersion: "0.0.7",
            language: "wasm/assemblyscript",
            entities: source.name === "FarmlyEasyFarm"
                ? entitiesEasyFarm
                : entitiesBollingerBandsStrategy,
            abis: [
                {
                    name: "FarmlyEasyFarm",
                    file: "./abis/FarmlyEasyFarm.json",
                },
                {
                    name: "FarmlyBollingerBandsStrategy",
                    file: "./abis/FarmlyBollingerBandsStrategy.json",
                },
            ],
            eventHandlers: source.name.startsWith("FarmlyEasyFarm")
                ? eventsEasyFarm
                : eventsBollingerBandsStrategy,
            file: source.name.startsWith("FarmlyEasyFarm")
                ? "./src/farmly-easy-farm.ts"
                : "./src/farmly-bollinger-bands-strategy.ts",
        };
        mapping.blockHandlers = source.name.startsWith("FarmlyEasyFarm")
            ? blockHandlersEasyFarm
            : blockHandlersBollingerBandsStrategy;
        var dataSource = {
            kind: "ethereum",
            name: source.name,
            network: source.network || "base-sepolia",
            source: {
                address: source.address,
                abi: source.name.startsWith("FarmlyEasyFarm")
                    ? "FarmlyEasyFarm"
                    : "FarmlyBollingerBandsStrategy",
                startBlock: source.startBlock,
            },
            mapping: mapping,
        };
        subgraphConfig.dataSources.push(dataSource);
    }
    // Write the YAML file
    var yamlContent = yaml.dump(subgraphConfig, {
        noRefs: true,
        sortKeys: false,
    });
    fs.writeFileSync("subgraph.yaml", yamlContent, "utf-8");
}
// Example usage
if (require.main === module) {
    generateSubgraphYaml("subgraph_config.json");
    console.log("subgraph.yaml has been generated successfully!");
}
