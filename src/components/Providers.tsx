'use client'

import { ReactNode } from 'react'
import { Sepolia } from '@thirdweb-dev/chains';
import { ThirdwebProvider, metamaskWallet } from '@thirdweb-dev/react';

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ThirdwebProvider
      activeChain={Sepolia}
      clientId={process.env.NEXT_PUBLIC_CLIENT_ID}
      supportedWallets={[metamaskWallet()]}
    >
      {children}
    </ThirdwebProvider>
  )
}

export default Providers;