const hardhat = require("hardhat");

async function main() {
  await hardhat.run("compile");

  // Use hardhat.ethers to get the ContractFactory
  const TodoList = await hardhat.ethers.getContractFactory("TodoList");
  const todoList = await TodoList.deploy();

  await todoList.deployed();

  console.log("TodoList deployed to:", todoList.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });