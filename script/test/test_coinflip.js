const { ethers, network } = require("hardhat");

const CoinFlip = require(`../../deployments/${network.name}/CoinFlip.json`);
const Hack = require(`../../deployments/${network.name}/Hack.json`);

async function main() {
    let [owner] = await ethers.getSigners();

    const Abi = [
      "function consecutiveWins() external view returns (uint)",
      "function expFlip() external view returns (address)",
      "function FACTOR() external view returns (uint)",
      "function exploit(address) external",
      "function test() external",
      "function hack() external"
    ];

    let coinflip = await new ethers.Contract(CoinFlip.address, Abi, owner);
    let hack = await new ethers.Contract(Hack.address, Abi, owner);

    await hack.hack()
    console.log('consecutiveWins:', await coinflip.consecutiveWins())
}

main()
    .then(() =>process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
