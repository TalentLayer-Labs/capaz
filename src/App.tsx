import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Web3Modal } from '@web3modal/react';
import type { ConfigOptions } from '@web3modal/core';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import NotLog from './pages/NotLog';
import { chains } from '@web3modal/ethereum';

const config: ConfigOptions = {
  projectId: `${import.meta.env.VITE_WALLECT_CONNECT_PROJECT_ID}`,
  theme: 'dark',
  accentColor: 'default',
  ethereum: {
    appName: 'web3-boilerplate',
    chains: [chains.mainnet, chains.goerli, chains.localhost, chains.polygon],
  },
};

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='dashboard/*' element={<Dashboard />} />
        <Route path='notlog' element={<NotLog />} />
      </Routes>
      <Web3Modal config={config} />
    </>
  );
}

export default App;
