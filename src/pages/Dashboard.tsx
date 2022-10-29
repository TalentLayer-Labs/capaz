import { useAccount } from '@web3modal/react';
import { Route, useNavigate, Routes } from 'react-router-dom';
import HomePayments from '../components/HomePayments';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import SendPayment from '../components/SendPayment';

function Dashboard() {
  const { account } = useAccount();
  const navigate = useNavigate();

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
            <Route path='/' element={<HomePayments />} />
            <Route path='/home' element={<HomePayments />} />
            <Route path='/sendPayment' element={<SendPayment />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
