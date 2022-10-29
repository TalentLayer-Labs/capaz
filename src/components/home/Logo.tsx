export default function Logo() {
  const logos = [
    {
      name: 'ReactJS',
      url: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K',
    },
    {
      name: 'Wallect Connect',
      url: 'https://1000logos.net/wp-content/uploads/2022/05/WalletConnect-Logo.png',
    },
    { name: 'Vite', url: 'https://vitejs.dev/logo-with-shadow.png' },
  ];

  return (
    <div className='bg-white'>
      <main>
        {/* Logo cloud section */}
        <div className='mt-32'>
          <div className='mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8'>
            <div className='lg:grid lg:grid-cols-2 lg:items-center lg:gap-24'>
              <div>
                <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
                  Build with best web3 tools
                </h2>
                <p className='mt-6 max-w-3xl text-lg leading-7 text-gray-500'>
                  All the code is open source and available on GitHub. It use all the best tools:
                  ReactJS, vite, tailwindcss, web3modal, ethers.js, wallet connect...
                </p>
                <div className='mt-6'>
                  <a
                    href='https://github.com/orgs/Capaz-Crypto/repositories'
                    className='text-base font-medium text-rose-500'>
                    Check our code now
                  </a>
                </div>
              </div>
              <div className='mt-12 grid grid-cols-2 gap-0.5 md:grid-cols-3 lg:mt-0 lg:grid-cols-2'>
                {logos.map(logo => (
                  <div
                    key={logo.name}
                    className='col-span-1 flex justify-center bg-gray-50 py-8 px-8'>
                    <img className='max-h-12' src={logo.url} alt={logo.name} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
