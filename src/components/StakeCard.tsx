'use client'

import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react'
import { CONTRACT_ADDRESS, STAKE_TOKEN_ADDRESS } from '@/utils/constants';
import { Web3Button, useAddress, useContract, useContractRead, useTokenBalance } from '@thirdweb-dev/react';

const StakeCard = () => {
  const address = useAddress();
  const { contract: stakeContract } = useContract(CONTRACT_ADDRESS, 'custom');
  const { contract: stakeTokenContract } = useContract(STAKE_TOKEN_ADDRESS, 'token');

  const { data: stakeTokenBalance } = useTokenBalance(stakeTokenContract, address);
  const { data: stakeInfo, refetch: refetchStakeInfo } = useContractRead(stakeContract, "getStakeInfo", [address]);

  const [stakeValue, setStakeValue] = useState<string>("0");
  const [unstakeValue, setUnstakeValue] = useState<string>("0");

  useEffect(() => {
    const interval = setInterval(() => {
      refetchStakeInfo();
    }, 10000);

    return () => clearInterval(interval);
  }, [refetchStakeInfo]);

  const handleStake = async (contract: any) => {
    await stakeTokenContract?.setAllowance(
      CONTRACT_ADDRESS!,
      stakeValue
    );

    await contract.call(
      'stake',
      [ethers.utils.parseEther(stakeValue)]
    )

    resetValues();
  };

  const handleUnstake = async (contract: any) => {
    await contract.call(
      'withdraw',
      [ethers.utils.parseEther(unstakeValue)]
    )

    resetValues();
  }

  const resetValues = () => {
    setStakeValue("0");
    setUnstakeValue("0");
  };

  return (
    <div className='bg-neutral-900 border border-neutral-700 rounded-lg p-4'>
      <h2 className='text-2xl mb-4 text-center md:text-start'>Total Staked Token:
        {
          stakeInfo && stakeInfo[0] ? (
            <span className='font-semibold'> {ethers.utils.formatEther(stakeInfo[0]) + ' ' + stakeTokenBalance?.symbol}</span>
          ) : <span className='font-semibold'>{` 0 ${address ? stakeTokenBalance?.symbol : ''}`}</span>
        }
      </h2>
      <div className='flex flex-col md:flex-row md:justify-between gap-4'>
        <div className='flex flex-col gap-2'>
          <input
            className='p-2 rounded-lg outline-none bg-neutral-700 border-neutral-700 border w-full'
            type="number"
            step={0.1}
            value={stakeValue}
            min={0}
            max={stakeTokenBalance?.displayValue ?? 0}
            onChange={(e) => setStakeValue(e.target.value)}
          />
          <Web3Button
            theme={'dark'}
            isDisabled={stakeValue === "0" || !address}
            contractAddress={CONTRACT_ADDRESS!}
            action={handleStake}
          >
            Stake
          </Web3Button>
        </div>
        <div className='flex flex-col gap-2'>
          <input
            className='p-2 rounded-lg outline-none bg-neutral-700 border-neutral-700 border w-full'
            type="number"
            step={0.1}
            min={0}
            max={stakeInfo ? ethers.utils.formatEther(stakeInfo[0]) : 0}
            value={unstakeValue}
            onChange={(e) => setUnstakeValue(e.target.value)}
          />
          <Web3Button
            theme={'dark'}
            isDisabled={unstakeValue === "0" || !address}
            contractAddress={CONTRACT_ADDRESS!}
            action={handleUnstake}
          >
            Unstake
          </Web3Button>
        </div>
      </div>
    </div>
  )
}

export default StakeCard