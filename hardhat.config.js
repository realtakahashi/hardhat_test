require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const { privateKey } = require('./private.json');

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    localhost: {
      url:"http://localhost:8545",
      chainId:31337,
      accounts: [privateKey],
    },
    sepolia: {
      url:"https://sepolia.infura.io/v3/a467ec4718ba4d7eb29179af9e6d698d",
      chainId:11155111,
      accounts: [privateKey],
    },
// !!!!追加!!!!
    shibuya: {
      url:"https://rpc.shibuya.astar.network:8545",
      chainId:81,
      accounts: [privateKey],
    }
  }

};
