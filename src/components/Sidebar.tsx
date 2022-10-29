import { BanknotesIcon, HomeIcon } from '@heroicons/react/24/outline';
import { useBlockNumber, useNetwork } from '@web3modal/react';
import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

const navigation = [
  {
    name: 'Home',
    href: '/dashboard/home',
    icon: HomeIcon,
  },
  {
    name: 'Send payment',
    href: '/dashboard/send-payment',
    icon: BanknotesIcon,
  },
];

export default function Sidebar() {
  const { data: blockNumber } = useBlockNumber({ watch: true });
  const { network } = useNetwork();

  return (
    <div className='hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col'>
      {/* Sidebar component, swap this element with another sidebar if you like */}
      <div className='flex flex-grow flex-col overflow-y-auto border-r border-gray-200 bg-white pt-5'>
        <div className='flex flex-shrink-0 items-center px-4 text-1xl sm:text-2xl'>
          <a className='flex' href='/'>
            <img
              className='h-8 w-auto'
              src='https://tailwindui.com/img/logos/mark.svg?from-color=rose&from-shade=600&to-color=rose&to-shade=700&toShade=600'
              alt='Capaz'
            />
            <span className='ml-1 font-bold tracking-tight text-gray-900 '>Capaz</span>
          </a>
        </div>
        <div className='mt-5 flex flex-1 flex-col'>
          <nav className='flex-1 space-y-1 px-2 pb-4'>
            {navigation.map(item => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  isActive
                    ? 'bg-gray-100 text-gray-900 group rounded-md py-2 px-2 flex items-center text-sm font-medium'
                    : 'text-gray-600 hover:bg-gray-50 group rounded-md py-2 px-2 flex items-center text-sm font-medium'
                }>
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
      <div className='flex flex-shrink-0 p-4'>
        <a href='' className='group block w-full flex-shrink-0'>
          <div className='flex items-center'>
            <div className=''>
              <a
                href={`https://${
                  network?.chain?.name == 'Ethereum' ? 'www' : network?.chain?.name.toLowerCase()
                }.etherscan.io/block/${blockNumber}`}
                target='_blank'
                className='text-xs font-medium text-gray-500 flex items-center'>
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    minHeight: '8px',
                    minWidth: '8px',
                    borderRadius: '50%',
                    position: 'relative',
                    marginRight: '4px',
                    backgroundColor: 'rgb(118, 209, 145)',
                    transition: 'background-color 250ms ease 0s',
                  }}></span>
                {blockNumber}
              </a>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}
