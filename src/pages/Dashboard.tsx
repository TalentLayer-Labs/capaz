import { useAccount } from '@web3modal/react';
import { Route, useNavigate, Routes } from 'react-router-dom';
import HomePayments from '../components/HomePayments';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import SendPayment from '../components/SendPayment';
import useConfig from '../hooks/useConfig';

function Dashboard() {
  const { account } = useAccount();
  const config = useConfig();

  const navigate = useNavigate();

  console.log(config?.escrowFactoryAddress);

  if (account.isConnected === false) {
    navigate('/notlog');
  }

  return (
    <>
      <div>
        <Sidebar />
        <div className='flex flex-1 flex-col md:pl-64'>
          <Header />
          <Routes>
            <Route path='/home' element={<HomePayments />} />
            <Route path='/send-payment' element={<SendPayment />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
