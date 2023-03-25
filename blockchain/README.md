# DAO Central blockchain

## Getting started

1. Create a `.env` file according to the `.env.example`.

2. Run tests

```bash
  npm run test
```

3. Analyze code coverage

```bash
  npm run coverage
```

4. Deploy contracts on specific network

> Make sure you use a new wallet to deploy contracts with no past transactions so deployed contracts have the same address on each network

4.1. NFTVotingFactoryContract

```bash
  npm run deploy:voting-factory -- --network ethereum
  npm run deploy:voting-factory -- --network goerli
  npm run deploy:voting-factory -- --network bsc
  npm run deploy:voting-factory -- --network bsc-test
  npm run deploy:voting-factory -- --network polygon
  npm run deploy:voting-factory -- --network mumbai
```
