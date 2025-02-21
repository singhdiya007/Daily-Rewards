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
