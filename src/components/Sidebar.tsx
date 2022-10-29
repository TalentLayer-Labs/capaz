import { BanknotesIcon, HomeIcon } from '@heroicons/react/24/outline';
import React from 'react';

export default function Sidebar() {
  const [navigation, setNavigation] = React.useState([
    { name: 'Home', href: '/dashboard/home', icon: HomeIcon, current: true },
    { name: 'Send payment', href: '/dashboard/sendPayment', icon: BanknotesIcon, current: false },
  ]);
  function handleChangeNavigation(event) {
    // FIXME: This function is not working
    const newNavigation = navigation.map(item => {
      console.log(item, event.target);
      if (item.name === event.target.name) {
        return { ...item, current: true };
      } else {
        return { ...item, current: false };
      }
    });
    setNavigation(newNavigation);
  }

  function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
  }
  return (
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
                onClick={handleChangeNavigation}
                className={classNames(
                  item.current ? 'bg-indigo-800 text-white' : 'text-indigo-100 hover:bg-indigo-600',
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
  );
}
