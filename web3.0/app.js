// app.js

// Check if user is guest or wallet login
let isGuest = localStorage.getItem('isGuest') === 'true';
let userRewards = parseInt(localStorage.getItem('userRewards')) || 0;
let lastLoginDate = localStorage.getItem('lastLoginDate') || null;

const guestLoginBtn = document.getElementById("guestLoginBtn");
const walletLoginBtn = document.getElementById("walletLoginBtn");
const claimRewardBtn = document.getElementById("claimRewardBtn");
const rewardBalance = document.getElementById("rewardBalance");
const statusMessage = document.getElementById("statusMessage");

const updateUI = () => {
    // Display reward balance and last login date
    rewardBalance.innerText = `Reward Balance: ${userRewards}`;
    statusMessage.innerText = `Last Login: ${lastLoginDate || "Not logged in yet"}`;

    // Disable claim button if user has no rewards
    if (userRewards > 0) {
        claimRewardBtn.disabled = false;
    } else {
        claimRewardBtn.disabled = true;
    }
};

// Function for guest login
const loginAsGuest = () => {
    isGuest = true;
    userRewards = 0; // Reset rewards for guest login
    lastLoginDate = new Date().toLocaleString();
    localStorage.setItem('isGuest', 'true');
    localStorage.setItem('userRewards', userRewards);
    localStorage.setItem('lastLoginDate', lastLoginDate);
    updateUI();
};

// Function for wallet login
const loginWithWallet = async () => {
    if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3.eth.getAccounts();

        isGuest = false;
        userRewards = 0; // Reset rewards for wallet login
        lastLoginDate = new Date().toLocaleString();

        // Store wallet login data
        localStorage.setItem('isGuest', 'false');
        localStorage.setItem('userRewards', userRewards);
        localStorage.setItem('lastLoginDate', lastLoginDate);
        localStorage.setItem('userAddress', accounts[0]);

        updateUI();
    } else {
        alert("Please install MetaMask.");
    }
};

// Function to claim reward
const claimReward = () => {
    // Add reward to the user's balance
    userRewards += 1;

    // Update last login date to ensure the user sees it as their most recent login
    lastLoginDate = new Date().toLocaleString();

    // Save updated data to localStorage
    localStorage.setItem('userRewards', userRewards);
    localStorage.setItem('lastLoginDate', lastLoginDate);

    // Update the UI
    updateUI();

    alert("Reward claimed! You received 1 reward.");
};

// Event Listeners for buttons
guestLoginBtn.addEventListener("click", loginAsGuest);
walletLoginBtn.addEventListener("click", loginWithWallet);
claimRewardBtn.addEventListener("click", claimReward);

// Initialize the UI when the page loads
updateUI();
