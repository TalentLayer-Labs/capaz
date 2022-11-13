import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <div className='overflow-hidden pt-8 sm:pt-12 lg:relative lg:py-48'>
      <div className='mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-24 lg:px-8'>
        <div>
          <div className='mt-10'>
            <div className='sm:max-w-xl'>
              <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl'>
                An easy streaming payment protocol with yields
              </h1>
              <p className='mt-6 text-xl text-gray-500'>
                Stream your payment every second, hour, and day...
              </p>
              <p className='mt-2 text-xl text-gray-500'>
                Gain yield during your money is sleeping in the escrow.
              </p>
              <p className='mt-2 text-xl text-gray-500'>
                Tokenized escrow to create a new marketplace for future yields.
              </p>
            </div>
            <div className='mx-auto mt-10 max-w-sm sm:max-w-none'>
              <div className='space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0'>
                <Link
                  to='/dashboard/send-payment'
                  className='flex items-center justify-center rounded-md border border-transparent bg-rose-500 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-opacity-80 sm:px-8'>
                  Send a payment
                </Link>
                <a
                  href='https://github.com/orgs/Capaz-Crypto/repositories'
                  className='flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-rose-500 shadow-sm hover:bg-opacity-70 sm:px-8'>
                  Github
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='sm:mx-auto sm:max-w-3xl sm:px-6'>
        <div className='py-12 sm:relative sm:mt-12 sm:py-16 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2'>
          <div className='hidden sm:block'>
            <div className='absolute inset-y-0 left-1/2 w-screen rounded-l-3xl bg-gray-50 lg:left-80 lg:right-0 lg:w-full' />
            <svg
              className='absolute top-8 right-1/2 -mr-3 lg:left-0 lg:m-0'
              width={404}
              height={392}
              fill='none'
              viewBox='0 0 404 392'>
              <defs>
                <pattern
                  id='837c3e70-6c3a-44e6-8854-cc48c737b659'
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits='userSpaceOnUse'>
                  <rect
                    x={0}
                    y={0}
                    width={4}
                    height={4}
                    className='text-gray-200'
                    fill='currentColor'
                  />
                </pattern>
              </defs>
              <rect width={404} height={392} fill='url(#837c3e70-6c3a-44e6-8854-cc48c737b659)' />
            </svg>
          </div>
          <div className='relative -mr-40 pl-4 sm:mx-auto sm:max-w-3xl sm:px-0 lg:h-full lg:max-w-none lg:pl-12'>
            <img
              className='w-full rounded-md shadow-xl ring-1 ring-black ring-opacity-5 lg:h-full lg:w-auto lg:max-w-none'
              src='/screenshot.png'
              alt=''
            />
          </div>
        </div>
      </div>
    </div>
  );
}
