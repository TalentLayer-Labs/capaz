import { BanknotesIcon, HomeIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const currentLocation = useLocation();
  const [navigation, setNavigation] = React.useState([
    {
      name: 'Home',
      href: '/dashboard/home',
      icon: HomeIcon,
      current: currentLocation.pathname === '/dashboard/home',
    },
    {
      name: 'Send payment',
      href: '/dashboard/sendPayment',
      icon: BanknotesIcon,
      current: currentLocation.pathname === '/dashboard/sendPayment',
    },
  ]);

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
    </div>
  );
}
