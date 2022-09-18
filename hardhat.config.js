require("@nomiclabs/hardhat-waffle");

// The next line is part of the sample project, you don't need it in your
// project. It imports a Hardhat task definition, that can be used for
// testing the frontend.

let dotenv = require('dotenv')
dotenv.config({ path: "./.env_dev" })

const privatekey = process.env.PRIVATE_KEY
const apikey = process.env.INFURA_ETH1_API_KEY

module.exports = {
  solidity: {
    compilers: [    //可指定多个sol版本
          {version: "0.4.18"},
          {version: "0.4.24"},
          {version: "0.5.16"},
          {version: "0.6.0"},
          {version: "0.6.12"},
          {version: "0.6.6"},
          {version: "0.7.6"},
          {version: "0.8.0"},
      ],
  },
  metadata: {
    // do not include the metadata hash, since this is machine dependent
    // and we want all generated code to be deterministic
    // https://docs.soliditylang.org/en/v0.7.6/metadata.html
    bytecodeHash: 'none',
  },
  networks: {
    dev: {
      url: 'http://localhost:8545',
      chainId: 31337,
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${apikey}`,
      chainId: 4,
      accounts: [privatekey],
    }
  }
};
