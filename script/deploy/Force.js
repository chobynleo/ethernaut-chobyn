const { ethers, upgrades, network, artifacts } = require("hardhat");
const { writeAbiAddr } = require('../utils/log');

async function main() {
    let [owner]  = await ethers.getSigners();

    const _Hack = await ethers.getContractFactory("ForceAttacker");
    const Hack = await _Hack.deploy();
    await Hack.deployed();

    let Artifact = await artifacts.readArtifact("ForceAttacker")
    await writeAbiAddr(Artifact, Hack.address, "ForceAttacker", network.name);

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
});