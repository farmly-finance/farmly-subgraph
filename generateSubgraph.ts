import * as fs from "fs";
import * as yaml from "js-yaml";

interface EventHandler {
  signature: string;
  handler: string;
}

interface BlockHandler {
  handler: string;
  filter: {
    kind: string;
  };
}

interface Mapping {
  kind: string;
  apiVersion: string;
  language: string;
  entities: string[];
  abis: { name: string; file: string }[];
  eventHandlers: { event: string; handler: string }[];
  blockHandlers?: BlockHandler[];
  file: string;
}

interface DataSource {
  name: string;
  network?: string;
  address: string;
  startBlock: number;
  entities: string[];
  events: EventHandler[];
  blockHandlers?: BlockHandler[];
}

interface SubgraphConfig {
  dataSources: DataSource[];
}

interface SubgraphYaml {
  specVersion: string;
  indexerHints: {
    prune: string;
  };
  schema: {
    file: string;
  };
  dataSources: any[];
}

const eventsBollingerBandsStrategy = [
  {
    event: "NewBands(uint256,uint256,uint256,uint256,uint256)",
    handler: "handleNewBands",
  },
  {
    event: "OwnershipTransferred(indexed address,indexed address)",
    handler: "handleOwnershipTransferred",
  },
];

const eventsEasyFarm = [
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

const entitiesEasyFarm = [
  "Approval",
  "Deposit",
  "Paused",
  "PerformPosition",
  "Transfer",
  "Unpaused",
  "Withdraw",
];

const entitiesBollingerBandsStrategy = ["NewBands", "OwnershipTransferred"];

const blockHandlersEasyFarm = [
  {
    handler: "handleInitialize",
    filter: {
      kind: "once",
    },
  },
];

const blockHandlersBollingerBandsStrategy = [
  {
    handler: "handleInitialize",
    filter: {
      kind: "once",
    },
  },
];

function generateSubgraphYaml(configPath: string): void {
  // Read the JSON configuration
  const configContent = fs.readFileSync(configPath, "utf-8");
  const config: SubgraphConfig = JSON.parse(configContent);

  // Base subgraph configuration
  const subgraphConfig: SubgraphYaml = {
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
  for (const source of config.dataSources) {
    const mapping: Mapping = {
      kind: "ethereum/events",
      apiVersion: "0.0.7",
      language: "wasm/assemblyscript",
      entities:
        source.name === "FarmlyEasyFarm"
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
        ? `./src/farmly-easy-farm.ts`
        : `./src/farmly-bollinger-bands-strategy.ts`,
    };

    mapping.blockHandlers = source.name.startsWith("FarmlyEasyFarm")
      ? blockHandlersEasyFarm
      : blockHandlersBollingerBandsStrategy;

    const dataSource = {
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
      mapping,
    };

    subgraphConfig.dataSources.push(dataSource);
  }

  // Write the YAML file
  const yamlContent = yaml.dump(subgraphConfig, {
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
