import { Menu, Transition } from '@headlessui/react';
import { Bars3BottomLeftIcon } from '@heroicons/react/24/outline';
import { truncateAddress } from '../utils';
import { ConnectButton, useAccount, useDisconnect } from '@web3modal/react';
import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const { account } = useAccount();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const disconnect = useDisconnect();

  function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ');
  }

  return (
    <div className='sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white border-b border-gray-200'>
      <button
        type='button'
        className='border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-rose-500 md:hidden'
        onClick={() => setSidebarOpen(true)}>
        <span className='sr-only'>Open sidebar</span>
        <Bars3BottomLeftIcon className='h-6 w-6' aria-hidden='true' />
      </button>
      <div className='flex flex-1 justify-between px-4'>
        <div className='flex flex-1'></div>
        <div className='ml-4 flex items-center md:ml-6'>
          {account.isConnected === true ? (
            <p>{truncateAddress(account.address)}</p>
          ) : (
            <ConnectButton />
          )}

          {/* Profile dropdown */}
          <Menu as='div' className='relative ml-3'>
            <div>
              <Menu.Button className='flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2'>
                <span className='sr-only'>Open user menu</span>
                <img
                  className='h-8 w-8 rounded-full'
                  src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                  alt=''
                />
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
