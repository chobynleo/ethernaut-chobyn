const { ethers, upgrades, network, artifacts } = require("hardhat");
const { writeAbiAddr } = require('../utils/log');
const Telephone = require(`../../deployments/${network.name}/Telephone.json`);

async function main() {
    let [owner]  = await ethers.getSigners();

    const _Hack = await ethers.getContractFactory("TelephoneAttacker");
    const Hack = await _Hack.deploy(Telephone.address);
    await Hack.deployed();

    let Artifact = await artifacts.readArtifact("TelephoneAttacker")
    await writeAbiAddr(Artifact, Hack.address, "TelephoneAttacker", network.name);

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
});