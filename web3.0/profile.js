// profile.js

// Get stored data from localStorage
const userRewards = localStorage.getItem("userRewards") || 0;
const lastLoginDate = localStorage.getItem("lastLoginDate") || "Never logged in";
const isGuest = localStorage.getItem("isGuest") || "false";
const userAddress = localStorage.getItem("userAddress") || "Not logged in";

// Elements to display profile information
const profileStatus = document.getElementById("profileStatus");
const profileRewards = document.getElementById("profileRewards");
const profileLastLogin = document.getElementById("profileLastLogin");

// Update the profile information on the page
const updateProfile = () => {
    if (isGuest === "true") {
        profileStatus.innerText = "Logged in as: Guest";
    } else {
        profileStatus.innerText = `Logged in as: ${userAddress}`;
    }

    profileRewards.innerText = `Reward Balance: ${userRewards}`;
    profileLastLogin.innerText = `Last Login: ${lastLoginDate}`;
};

// Run the update function on page load
updateProfile();
