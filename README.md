# Daily Login Rewards Smart Contract

## Overview

The **Daily Login Rewards** contract is a simple Solidity-based smart contract designed to reward users for daily logins. Every time a user logs in, they receive a reward for their participation, provided they haven’t logged in already on the same day. The contract tracks the user's login activities based on the timestamp and ensures that rewards are given only once per day.

This project is deployed on the **Edu Chain** blockchain and can be interacted with through the provided contract address.

## Features

- **Daily Login Tracking**: The contract records the timestamp of each user's login and ensures that they can only log in once per day.
- **Reward System**: Each successful login earns the user a reward. In this case, the reward is a simple increment, but it could be extended to other rewards like tokens.
- **No Input on Deployment**: The contract is designed to be simple and does not require any external inputs during deployment.
- **Event Logging**: The contract emits an event whenever a user claims their reward after logging in.

## How it Works

1. **Login**: Users can log in every day, and they will receive a reward for each new login.
2. **Reward**: Each time a user logs in on a new day (after 24 hours), they receive a reward (e.g., 1 unit).
3. **Check Reward Balance**: Users can check their accumulated rewards using the `getRewardBalance()` function.

## Deployed Address

The **Daily Login Rewards** contract is deployed on **Edu Chain** at the following address:

**0x7cbFE78be8F314305308E2A82b76F76c29C88d37**

### How to Use:

1. **Interact with the contract**: You can interact with this contract through any Ethereum-compatible wallet or DApp browser.
2. **Log in**: Call the `login()` function every day to earn rewards.
3. **Check Rewards**: Use the `getRewardBalance()` function to view how many rewards you have accumulated.

## Smart Contract Code

The contract is implemented in Solidity, and here is the code for the **Daily Login Rewards** contract:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DailyLoginReward {
    mapping(address => uint256) public lastLogin;
    mapping(address => uint256) public rewards;

    // Event to log rewards
    event RewardClaimed(address indexed user, uint256 reward);

    // Function to record daily login and reward user
    function login() public {
        uint256 currentDay = block.timestamp / 1 days; // Calculate current day based on timestamp

        // Check if the user hasn't logged in today
        if (lastLogin[msg.sender] / 1 days != currentDay) {
            lastLogin[msg.sender] = block.timestamp; // Update login timestamp

            // Reward user (for example, 1 token per login)
            rewards[msg.sender] += 1; // Add reward to user's balance

            // Emit an event for the reward
            emit RewardClaimed(msg.sender, 1);
        }
    }

    // Function to view user's reward balance
    function getRewardBalance() public view returns (uint256) {
        return rewards[msg.sender];
    }
}
