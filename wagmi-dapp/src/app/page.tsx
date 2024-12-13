'use client'

import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { useReadContract, useWriteContract } from "wagmi";
import { parseEther } from "viem";

function App() {
  const account = useAccount()
  const { connectors, connect, status, error } = useConnect()
  const { disconnect } = useDisconnect()
  
  // 使用useReadContract读取余额
  const { data: balance } = useReadContract({
    abi: [
      {
        type: 'function',
        name: 'balanceOf',
        stateMutability: 'view',
        inputs: [{ name: 'account', type: 'address' }],
        outputs: [{ type: 'uint256' }],
      },
    ],
    address: '0xe7f1725e7734ce288f8367e1bb143e90bb3f0512',
    functionName: 'balanceOf',
    args: [account?.address as `0x${string}`],
  })

  // 添加 useWriteContract hook
  const { writeContract, status: writeStatus, error: writeError } = useWriteContract()

  // 添加 mint 函数
  const handleMint = async () => {
    writeContract({
      address: '0xe7f1725e7734ce288f8367e1bb143e90bb3f0512',
      abi: [
        {
          type: "function",
          name: "mint",
          stateMutability: "payable",
          inputs: [
            {
              internalType: "uint256",
              name: "quantity",
              type: "uint256",
            },
          ],
          outputs: [],
        },
      ],
      functionName: 'mint',
      args: [BigInt(1)],
      value: parseEther("0.01"),
    })
  }

  return (
    <>
      <div>
        <h1>秀才web3大师之路-60天企业级入行项目实战-前端开发教程</h1>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px', margin: '20px 0' }}>
          <div>
            <h2>关注秀才-微信视频号</h2>
            <img src="/images/微信视频号.png" alt="关注秀才-微信视频号" width={400} height={400}/>
          </div>

          <div>
            <h2>关注秀才-微信号</h2>
            <img src="/images/微信号.png" alt="关注秀才-微信号" width={400} height={400}/>
          </div>
          
          <div>
            <h2>开通web3大师之路-知识星球-vip权限</h2>
            <img src="/images/知识星球.png" alt="开通web3大师之路-知识星球-vip权限" width={400} height={400} />
          </div>
        </div>

       

        <h2>Account</h2>

        <div>
          status: {account.status}
          <br />
          addresses: {JSON.stringify(account.addresses)}
          <br />
          chainId: {account.chainId}
          <br />
          balance: {balance ? (Number(balance) / 1e18).toFixed(4) : '0'} ETH
        </div>

        {account.status === 'connected' && (
          <button type="button" onClick={() => disconnect()}>
            Disconnect
          </button>
        )}
      </div>

      <div>
        <h2>Connect</h2>
        {connectors.map((connector) => (
          <button
            key={connector.uid}
            onClick={() => connect({ connector })}
            type="button"
          >
            {connector.name}
          </button>
        ))}
        <div>{status}</div>
        <div>{error?.message}</div>
      </div>

      <div>
        <div>
          <h2>NFT收藏品， 游戏道具，游戏币，LP铸造 Mint Token</h2>
          <img src="/images/NFT收藏品.png" alt="NFT收藏品， 游戏道具，游戏币，LP铸造 Mint Token" width={400} height={400} />
        </div>
       
        <button 
          onClick={handleMint}
          disabled={writeStatus === 'pending' || !account.address}
        >
          {writeStatus === 'pending' ? 'Minting...' : 'Mint 1 Token'}
        </button>
        
        {writeStatus === 'success' && <div style={{ color: 'green' }}>Mint 成功!</div>}
        {writeError && <div style={{ color: 'red' }}>Mint 失败，请重试</div>}
      </div>
    </>
  )
}

export default App
