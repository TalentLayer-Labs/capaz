import { Menu, Transition } from '@headlessui/react';
import { Bars3BottomLeftIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { truncateAddress } from '../utils';
import {
  ConnectButton,
  useAccount,
  useDisconnect,
  useNetwork,
  useEnsAvatar,
} from '@web3modal/react';
import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NetworkLink from './NetworkLink';
import SvgLoader from './svgLoader';

export default function Header() {
  const { account } = useAccount();
  const [, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const disconnect = useDisconnect();
  const { network } = useNetwork();
  const { data, isLoading } = useEnsAvatar({
    addressOrName: 'vitalik.eth',
  });

  const chainIdToName = (chainId: number) => {
    switch (chainId) {
      case 1:
        return 'Ethereum';
      case 5:
        return 'Goerli';
      case 80001:
        return 'Mumbai';
      case 338:
        return 'Cronos testnet';
      default:
        return 'Unknown';
    }
  };

  function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ');
  }

  return (
    <div className='sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white'>
      <button
        type='button'
        className='border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-rose-500 md:hidden'
        onClick={() => setSidebarOpen(true)}>
        <span className='sr-only'>Open sidebar</span>
        <Bars3BottomLeftIcon className='h-6 w-6' aria-hidden='true' />
      </button>
      <div className='flex flex-1 justify-between px-4'>
        <div className='flex flex-1'></div>
        <Menu as='div' className='relative inline-block text-left mt-3'>
          <div>
            <Menu.Button className='inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100'>
              {network?.chain?.id ? chainIdToName(network.chain.id) : 'Select a network'}

              <ChevronDownIcon className='-mr-1 ml-2 h-5 w-5' aria-hidden='true' />
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter='transition ease-out duration-100'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'>
            <Menu.Items className='absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
              <div className='py-1'>
                <Menu.Item>
                  <NetworkLink chaindId={1} chainName='Ethereum' />
                </Menu.Item>
                <Menu.Item>
                  <NetworkLink chaindId={5} chainName='Goerli' />
                </Menu.Item>
                <Menu.Item>
                  <NetworkLink chaindId={80001} chainName='Mumbai' />
                </Menu.Item>
                <Menu.Item>
                  <NetworkLink chaindId={338} chainName='Cronos testnet' />
                </Menu.Item>
                {/* .If it's an dev env we display localhost network */}
                {import.meta.env.DEV && (
                  <Menu.Item>
                    <NetworkLink chaindId={1137} chainName='Localhost' />
                  </Menu.Item>
                )}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
        <div className='ml-4 flex items-center md:ml-6'>
          {/* Profile dropdown */}
          <Menu as='div' className='relative ml-3'>
            <div className='flex items-center'>
              <div>
                <Menu.Button className='flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2'>
                  <span className='sr-only'>Open user menu</span>
                  {data !== undefined ? (
                    <img className='h-8 w-8 rounded-full' alt='' src={data} />
                  ) : (
                    <img
                      className='h-8 w-8 rounded-full'
                      alt=''
                      src='https://imageio.forbes.com/specials-images/imageserve/6170e01f8d7639b95a7f2eeb/Sotheby-s-NFT-Natively-Digital-1-2-sale-Bored-Ape-Yacht-Club--8817-by-Yuga-Labs/0x0.png?format=png&width=960'
                    />
                  )}
                </Menu.Button>
              </div>
              {account.isConnected === true ? (
                <Menu.Button className='ml-3 text-left'>
                  <p
                    className='text-sm font-medium text-gray-700 group-hover:text-gray-900'
                    style={{ marginBottom: '-3px' }}>
                    {truncateAddress(account.address)}
                  </p>
                  <p className='text-xs font-medium text-gray-500 group-hover:text-gray-700'>
                    More
                  </p>
                </Menu.Button>
              ) : (
                <ConnectButton />
              )}
            </div>
            <Transition
              as={Fragment}
              enter='transition ease-out duration-100'
              enterFrom='transform opacity-0 scale-95'
              enterTo='transform opacity-100 scale-100'
              leave='transition ease-in duration-75'
              leaveFrom='transform opacity-100 scale-100'
              leaveTo='transform opacity-0 scale-95'>
              <Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                <Menu.Item key='Log out'>
                  {({ active }) => (
                    <a
                      href='Log out'
                      onClick={event => {
                        event.preventDefault();
                        disconnect();
                        navigate('/');
                      }}
                      className={classNames(
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm text-gray-700',
                      )}>
                      Log out
                    </a>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  );
}
