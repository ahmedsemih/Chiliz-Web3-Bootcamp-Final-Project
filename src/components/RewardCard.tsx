'use client'

import { ethers } from 'ethers';
import React, { useEffect } from 'react'
import { Web3Button, useAddress, useContract, useContractRead, useTokenBalance } from '@thirdweb-dev/react';

import { CONTRACT_ADDRESS, REWARD_TOKEN_ADDRESS } from '@/utils/constants';

const RewardCard = () => {
  const address = useAddress();
  const { contract: stakeContract } = useContract(CONTRACT_ADDRESS, 'custom');
  const { contract: rewardTokenContact } = useContract(REWARD_TOKEN_ADDRESS, 'token');

  const { data: rewardTokenBalance } = useTokenBalance(rewardTokenContact, address);
  const { data: stakeInfo, refetch: refetchStakeInfo } = useContractRead(stakeContract, "getStakeInfo", [address]);

  useEffect(() => {
    const interval = setInterval(() => {
      refetchStakeInfo();
    }, 10000);

    return () => clearInterval(interval);
  }, [refetchStakeInfo]);

  const handleClaim = async (contract: any) => {
    await contract.call(
      "claimRewards"
    );
  };

  return (
    <div className='bg-neutral-900 border border-neutral-700 rounded-lg p-4 flex flex-col gap-4'>
      <h2 className='text-2xl mb-2 text-center'>Reward Token:</h2>
      {
        stakeInfo && stakeInfo[1]
          ?
          <span className='text-xl font-semibold text-center'>
            {ethers.utils.formatEther(stakeInfo[1]) + ' ' + rewardTokenBalance?.symbol}
          </span>
          :
          <span className='text-xl font-semibold text-center'>
            {`0 ${address ? rewardTokenBalance?.symbol : ''}`}
          </span>
      }
      <Web3Button
        isDisabled={ethers.utils.formatEther(stakeInfo[1]) === "0.0"}
        theme={'dark'}
        contractAddress={CONTRACT_ADDRESS!}
        action={handleClaim}
      >
        Claim
      </Web3Button>
    </div>
  )
}

export default RewardCard;