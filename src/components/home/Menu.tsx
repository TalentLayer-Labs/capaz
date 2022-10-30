import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { ConnectButton, useAccount } from '@web3modal/react';
import { truncateAddress } from '../../utils';
import { Link } from 'react-router-dom';
import {
  Bars3Icon,
  ChatBubbleBottomCenterTextIcon,
  ChatBubbleLeftRightIcon,
  InboxIcon,
  QuestionMarkCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

const tools = [
  {
    name: 'ReactJs',
    description: 'Declarative. React makes it painless to create interactive UIs.',
    href: 'https://reactjs.org',
    icon: InboxIcon,
  },
  {
    name: 'Web3modal',
    description:
      'Web3Modal is a versatile library that makes it super easy to connect users with your Dapp and start interacting with the blockchain.',
    href: 'https://github.com/WalletConnect/web3modal/blob/V2/docs/react.md',
    icon: ChatBubbleBottomCenterTextIcon,
  },
  {
    name: 'Vite',
    description:
      ' Instant Server Start · Lightning Fast HMR · Rich Features · Optimized Build · Universal Plugins',
    href: 'https://vitejs.dev',
    icon: ChatBubbleLeftRightIcon,
  },
  {
    name: 'Ethers',
    description:
      'The ethers.js library aims to be a complete and compact library for interacting with the Ethereum Blockchain and its ecosystem',
    href: 'https://docs.ethers.io/v5',
    icon: QuestionMarkCircleIcon,
  },
];

function Menu() {
  const { account } = useAccount();

  return (
    <div className='bg-white'>
      <header>
        <Popover className='relative bg-slate-100'>
          <div className='mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6 md:justify-start md:space-x-10 lg:px-8'>
            <div className='flex justify-start lg:w-0 lg:flex-1'>
              <a href='/'>
                <span className='sr-only'>Capaz</span>
                <img
                  className='h-8 w-auto sm:h-10'
                  src='https://tailwindui.com/img/logos/mark.svg?from-color=rose&from-shade=600&to-color=rose&to-shade=500&toShade=600'
                  alt=''
                />
              </a>
            </div>
            <div className='-my-2 -mr-2 md:hidden'>
              <Popover.Button className='inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-rose-500'>
                <span className='sr-only'>Open menu</span>
                <Bars3Icon className='h-6 w-6' aria-hidden='true' />
              </Popover.Button>
            </div>
            <div className='hidden items-center justify-end md:flex md:flex-1 lg:w-0'>
              {account.isConnected === true ? (
                <p>{truncateAddress(account.address)}</p>
              ) : (
                <ConnectButton />
              )}
            </div>
          </div>

          <Transition
            as={Fragment}
            enter='duration-200 ease-out'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='duration-100 ease-in'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'>
            <Popover.Panel
              focus
              className='absolute inset-x-0 top-0 z-30 origin-top-right transform p-2 transition md:hidden'>
              <div className='divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5'>
                <div className='px-5 pt-5 pb-6'>
                  <div className='flex items-center justify-between'>
                    <div>
                      {/* <img
                        className='h-8 w-auto'
                        src='https://tailwindui.com/img/logos/mark.svg?from-color=rose&from-shade=600&to-color=rose&to-shade=700&toShade=600'
                        alt='Capaz'
                      /> */}
                    </div>
                    <div className='-mr-2'>
                      <Popover.Button className='inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-rose-500'>
                        <span className='sr-only'>Close menu</span>
                        <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                      </Popover.Button>
                    </div>
                  </div>
                  <div className='py-6 px-5'>
                    <div className='grid grid-cols-2 gap-4'>
                      <a
                        href='src/components/home/Menu#'
                        className='text-base font-medium text-gray-900 hover:text-gray-700'>
                        Home
                      </a>
                      <a
                        href='src/components/home/Menu#'
                        className='text-base font-medium text-gray-900 hover:text-gray-700'>
                        About
                      </a>
                      <a
                        href='src/components/home/Menu#'
                        className='text-base font-medium text-gray-900 hover:text-gray-700'>
                        Dashboard
                      </a>
                    </div>
                    <div className='mt-6'>
                      <a
                        href='src/components/home/Menu#'
                        className='flex w-full items-center justify-center rounded-md border border-transparent bg-gradient-to-r'>
                        {account.isConnected === true ? (
                          <p>{account.address}</p>
                        ) : (
                          <ConnectButton />
                        )}
                      </a>
                    </div>
                  </div>
                  <div className='mt-6'>
                    <nav className='grid grid-cols-1 gap-7'>
                      {tools.map(item => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className='-m-3 flex items-center rounded-lg p-3 hover:bg-gray-50'>
                          <div className='flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-gradient-to-r from-purple-600 to-rose-600 text-white'>
                            <item.icon className='h-6 w-6' aria-hidden='true' />
                          </div>
                          <div className='ml-4 text-base font-medium text-gray-900'>
                            {item.name}
                          </div>
                        </Link>
                      ))}
                    </nav>
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>
      </header>
    </div>
  );
}

export default Menu;
