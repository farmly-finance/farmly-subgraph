# Farmly Finance Subgraph

This repository contains the subgraph implementation for Farmly Finance on Base Sepolia network. The subgraph indexes and tracks events from Farmly Finance smart contracts, making the data easily queryable through GraphQL.

## Overview

The subgraph tracks various Farmly Finance contracts and their events, including:

- FarmlyBollingerBandsStrategy
- FarmlyEasyFarm

## Prerequisites

- Node.js
- Yarn
- The Graph CLI
- Docker (for local development)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/farmly-finance/farmly-subgraph.git
cd farmly-subgraph
```

2. Install dependencies:

```bash
yarn install
```

## Development Commands

- `yarn codegen` - Generate AssemblyScript types from subgraph schema
- `yarn build` - Build the subgraph
- `yarn deploy` - Deploy the subgraph to The Graph Studio
- `yarn test` - Run subgraph tests
- `yarn compile` - Generate subgraph configuration and compile

## Local Development

1. Start a local Graph Node:

```bash
yarn create-local
```

2. Deploy to local Graph Node:

```bash
yarn deploy-local
```

3. Remove local deployment:

```bash
yarn remove-local
```

## Project Structure

- `schema.graphql` - The GraphQL schema definition
- `subgraph.yaml` - Subgraph manifest
- `src/` - AssemblyScript mappings
- `abis/` - Contract ABIs
- `tests/` - Test files
- `generated/` - Generated AssemblyScript types
- `build/` - Build output

## Networks

The subgraph is currently deployed on:

- Base Sepolia (Testnet)

## License

MIT License - see the [LICENSE](LICENSE) file for details
