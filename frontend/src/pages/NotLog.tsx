import Menu from '../components/home/Menu';
import Footer from '../components/home/Footer';
import { useNavigate } from 'react-router-dom';
import { ConnectButton, useAccount } from '@web3modal/react';

function NotLog() {
  const navigate = useNavigate();
  const { account } = useAccount();

  if (account.isConnected === true) {
    navigate('/dashboard/home');
  }

  return (
    <>
      <Menu />

      <div className='min-h-full bg-white px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8'>
        <div className='mx-auto max-w-max'>
          <main className='sm:flex'>
            <p className='text-4xl font-bold tracking-tight text-rose-600 sm:text-5xl'>SORRY </p>
            <div className='sm:ml-6'>
              <div className='sm:border-l sm:border-gray-200 sm:pl-6'>
                <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl'>
                  You have to be connect
                </h1>
                <p className='mt-1 text-base text-gray-500'>to the Dapp to access your dashboard</p>
              </div>
              <div className='mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6'>
                <ConnectButton />
                <a
                  href='/'
                  className='inline-flex items-center rounded-md border border-transparent bg-rose-100 px-4 py-2 text-sm font-medium text-rose-700 hover:bg-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2'>
                  About
                </a>
              </div>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default NotLog;
