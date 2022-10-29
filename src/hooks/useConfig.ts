import { useNetwork } from '@web3modal/react';
import { useEffect, useState } from 'react';
import { getConfig, Config } from '../config';

export default function useConfig(): Config | null {
  const { network } = useNetwork();
  const [config, setConfig] = useState<Config | null>(null);

  useEffect(() => {
    if (network) {
      console.log('network', network);

      //@ts-ignore
      const currentConfig = getConfig(network.chain?.id);
      console.log({ currentConfig });
      setConfig(currentConfig);
    }
  }, [network?.chain?.name]);

  return config;
}
