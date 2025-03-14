# Blockchain Todo List

A decentralized Todo list application built on the Ethereum blockchain. This application allows users to create, toggle, and delete todo items with all data stored securely and permanently on the blockchain.

## Description

This Todo list application leverages Ethereum blockchain technology to provide a decentralized, tamper-proof task management system. Unlike traditional todo apps that store data on centralized servers, this application stores your tasks directly on the Ethereum blockchain.

### How It Uses Ethereum

- **Task Creation**: When you create a new todo item, a transaction is sent to the Ethereum blockchain, requiring a small amount of ETH as gas fee. This permanently records your task on the blockchain.

- **Task Completion**: Toggling a task's completion status creates another blockchain transaction, updating the state of your todo item. This action is immutable and verifiable.

- **Task Deletion**: Removing a task (restricted to the contract owner) also requires an Ethereum transaction.

### Why Use Ethereum for a Todo List?

- **Permanence**: Your todos are stored on thousands of computers worldwide, making the data virtually impossible to lose.
- **Immutability**: The history of your tasks cannot be altered, providing a verifiable record of your task management.
- **Censorship Resistance**: No central authority can delete or modify your todos.
- **Ownership**: You truly own your data, not a corporation.
- **Learning**: This project serves as an excellent introduction to blockchain development.

### Cost Considerations

Each interaction with the todo list requires ETH to pay for gas fees:

- Creating a todo: ~0.0001-0.0003 ETH (varies with network congestion)
- Toggling completion: ~0.0001-0.0002 ETH
- Deleting a todo: ~0.0001-0.0002 ETH

For development and testing, we use a local Hardhat network with free test ETH. For production use, real ETH is required, or you can deploy to lower-cost alternatives like Polygon or Arbitrum.

## Features

- Connect to Ethereum wallet (MetaMask)
- Create new todo items on the blockchain
- Toggle completion status of todos
- Delete todos (owner only)
- Persistent storage on the Ethereum blockchain

## Technologies

- **Frontend**: React.js with Next.js
- **Styling**: Tailwind CSS
- **Blockchain Interaction**: ethers.js
- **Smart Contract**: Solidity
- **Development Environment**: Hardhat

## Prerequisites

- Node.js (v14+)
- npm or yarn
- MetaMask browser extension
- ETH for transactions (when using mainnet or testnets)

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/blockchain-todo-list.git
cd blockchain-todo-list
```
