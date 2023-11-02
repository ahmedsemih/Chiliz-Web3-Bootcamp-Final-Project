'use client'

import { ConnectWallet } from "@thirdweb-dev/react";

import StakeCard from "@/components/StakeCard";
import RewardCard from "@/components/RewardCard";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col gap-4 items-center justify-between p-24">
      <div className="text-center">
        <h1 className="text-5xl font-semibold mb-2">Staking Dapp</h1>
        <p className="text-neutral-600 text-lg">Stake your tokens and get rewards for every 600 seconds.</p>
      </div>
      <ConnectWallet theme={"dark"} modalSize={"wide"} />
      <div className="flex flex-col md:flex-row gap-8">
        <StakeCard />
        <RewardCard />
      </div>
    </main>
  )
}
