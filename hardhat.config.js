// Replace this:
// import "@nomicfoundation/hardhat-toolbox";

// With this:
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.19",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
  },
};
