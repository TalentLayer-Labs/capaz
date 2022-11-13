import { useNetwork } from '@web3modal/react';
import { useEffect, useState } from 'react';
import { getConfig, Config, Network } from '../config';

export default function useConfig(): Config | null {
  const { network } = useNetwork();
  const [config, setConfig] = useState<Config | null>(null);

  useEffect(() => {
    if (network?.chain?.id) {
      const currentConfig = getConfig(network.chain.id);
      setConfig(currentConfig);
    }
  }, [network?.chain?.id]);

  return config;
}
