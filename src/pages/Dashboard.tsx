import { Fragment, useState } from 'react';
import { Dialog, Menu, Transition } from '@headlessui/react';
import {
  Bars3BottomLeftIcon,
  HomeIcon,
  XMarkIcon,
  BanknotesIcon,
} from '@heroicons/react/24/outline';
import { useAccount, ConnectButton, useDisconnect } from '@web3modal/react';
import { useNavigate } from 'react-router-dom';
import { truncateAddress } from '../utils';

const navigation = [
  { name: 'Home', href: '/dashboard#home', icon: HomeIcon, current: true },
  { name: 'Send payment', href: '/dashboard#sendPayment', icon: BanknotesIcon, current: false },
];

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

function Dashboard() {
  const { account, isReady } = useAccount();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const disconnect = useDisconnect();

  if (account.isConnected === false) {
    navigate('/notlog');
  }

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as='div' className='relative z-40 md:hidden' onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter='transition-opacity ease-linear duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='transition-opacity ease-linear duration-300'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'>
              <div className='fixed inset-0 bg-gray-600 bg-opacity-75' />
            </Transition.Child>

            <div className='fixed inset-0 z-40 flex'>
              <Transition.Child
                as={Fragment}
                enter='transition ease-in-out duration-300 transform'
                enterFrom='-translate-x-full'
                enterTo='translate-x-0'
                leave='transition ease-in-out duration-300 transform'
                leaveFrom='translate-x-0'
                leaveTo='-translate-x-full'>
                <Dialog.Panel className='relative flex w-full max-w-xs flex-1 flex-col bg-indigo-700 pt-5 pb-4'>
                  <Transition.Child
                    as={Fragment}
                    enter='ease-in-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in-out duration-300'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'>
                    <div className='absolute top-0 right-0 -mr-12 pt-2'>
                      <button
                        type='button'
                        className='ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
                        onClick={() => setSidebarOpen(false)}>
                        <span className='sr-only'>Close sidebar</span>
                        <XMarkIcon className='h-6 w-6 text-white' aria-hidden='true' />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className='flex flex-shrink-0 items-center px-4'>
                    <img
                      className='h-8 w-auto'
                      src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=300'
                      alt='Your Company'
                    />
                  </div>
                  <div className='mt-5 h-0 flex-1 overflow-y-auto'>
                    <nav className='space-y-1 px-2'>
                      {navigation.map(item => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? 'bg-indigo-800 text-white'
                              : 'text-indigo-100 hover:bg-indigo-600',
                            'group flex items-center px-2 py-2 text-base font-medium rounded-md',
                          )}>
                          <item.icon
                            className='mr-4 h-6 w-6 flex-shrink-0 text-indigo-300'
                            aria-hidden='true'
                          />
                          {item.name}
                        </a>
                      ))}
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className='w-14 flex-shrink-0' aria-hidden='true'>
                {/* Dummy element to force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className='hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col'>
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className='flex flex-grow flex-col overflow-y-auto bg-indigo-700 pt-5'>
            <div className='flex flex-shrink-0 items-center px-4'>
              <img
                className='h-8 w-auto'
                src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=300'
                alt='Your Company'
              />
            </div>
            <div className='mt-5 flex flex-1 flex-col'>
              <nav className='flex-1 space-y-1 px-2 pb-4'>
                {navigation.map(item => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current
                        ? 'bg-indigo-800 text-white'
                        : 'text-indigo-100 hover:bg-indigo-600',
                      'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
                    )}>
                    <item.icon
                      className='mr-3 h-6 w-6 flex-shrink-0 text-indigo-300'
                      aria-hidden='true'
                    />
                    {item.name}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
        <div className='flex flex-1 flex-col md:pl-64'>
          <div className='sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow'>
            <button
              type='button'
              className='border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden'
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
                    <Menu.Button className='flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>
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

          {/* Main dashboard's table */}
          <main>
            <div className='py-6 w-full'>
              <div className='mx-auto xl:w-8/12 px-4 sm:px-6 md:px-8'>
                <h1 className='text-2xl font-semibold text-gray-900'>Dashboard</h1>
              </div>
              <div className='mx-auto px-4 sm:px-6 md:px-8'>
                <div className='py-4'>
                  <div className='w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-12'>
                    <div className='relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded '>
                      <div className='rounded-t mb-0 px-4 py-3 border-0'>
                        <div className='flex flex-wrap items-center'>
                          <div className='relative w-full px-4 max-w-full flex-grow flex-1'>
                            <h3 className='font-semibold text-base text-blueGray-700'>
                              Your payment
                            </h3>
                          </div>
                        </div>
                      </div>

                      <div className='block w-full overflow-x-auto'>
                        <table className='items-center bg-transparent w-full border-collapse '>
                          <thead>
                            <tr>
                              <th className='px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
                                Asset
                              </th>
                              <th className='px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
                                Total
                              </th>
                              <th className='px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
                                Start at
                              </th>
                              <th className='px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
                                Payed In
                              </th>
                              <th className='px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
                                Every
                              </th>
                              <th className='px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
                                Yield
                              </th>
                              <th className='px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
                                Actions
                              </th>
                            </tr>
                          </thead>

                          <tbody>
                            <tr>
                              <th className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 '>
                                USDC
                              </th>
                              <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 '>
                                500$
                              </td>
                              <td className='border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
                                28 oct
                              </td>
                              <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
                                <i className='fas fa-arrow-up text-emerald-500 mr-4'></i>5
                              </td>
                              <td className='border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
                                weeks
                              </td>
                              <td className='border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
                                Aave
                              </td>
                              <td className='border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
                                <Menu>
                                  <Menu.Button>More</Menu.Button>
                                  <Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                                    <Menu.Item>
                                      {({ active }) => (
                                        <a
                                          href='#'
                                          className={classNames(
                                            active ? 'bg-gray-100' : '',
                                            'block px-4 py-2 text-sm text-gray-700',
                                          )}>
                                          See more
                                        </a>
                                      )}
                                    </Menu.Item>
                                  </Menu.Items>
                                </Menu>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /End replace */}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
