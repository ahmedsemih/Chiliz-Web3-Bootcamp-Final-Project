'use client'

import { ReactNode } from 'react'
import { SpicyChain } from '@thirdweb-dev/chains';
import { ThirdwebProvider, metamaskWallet } from '@thirdweb-dev/react';

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ThirdwebProvider
      activeChain={SpicyChain}
      clientId={process.env.NEXT_PUBLIC_CLIENT_ID}
      supportedWallets={[metamaskWallet()]}
    >
      {children}
    </ThirdwebProvider>
  )
}

export default Providers;