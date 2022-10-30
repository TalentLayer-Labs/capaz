export default function Logo() {
  const logos = [
    {
      name: 'Goerli',
      url: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Ethereum_logo_2014.svg',
    },
    {
      name: 'Cronos',
      url: 'https://www.cryptologos.cc/logos/cronos-cro-logo.png?v=023',
    },
    { name: 'Mumbai', url: 'https://cryptologos.cc/logos/polygon-matic-logo.png?v=023' },
    { name: 'Altlayer', url: 'https://icodrops.com/wp-content/uploads/2022/07/uf3uNfCq_400x400-150x150.jpg' },
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
                  We are deploy on 
                </h2>
                <p className='mt-6 max-w-3xl text-lg leading-7 text-gray-500'>
                  Thanks to all chains partner, Goerli, Cronos, Mumbai and Altlayer, we are able to
                  deploy our smart contract and make our dapp available on all chains.
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
