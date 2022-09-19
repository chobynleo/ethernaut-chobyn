const { ethers, network } = require("hardhat");

async function main() {
    let [owner] = await ethers.getSigners();
    let provider = owner.provider
    
    console.log(
        await owner.sendTransaction({from: owner.address, data: '0x600a600c602039600a6020f3602a60605260206060f3', gasLimit: 10000000})
    )
}

main()
    .then(() =>process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
