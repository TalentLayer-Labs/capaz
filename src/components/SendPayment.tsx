// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Fragment, useEffect, useState } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { useAccount, useContractWrite } from '@web3modal/react';
import { periodDuration, yieldStrategy } from '../utils/index';
import CapazEscrowFactory from '../contracts/CapazEscrowFactory.json';
import SimpleERC20 from '../contracts/SimpleERC20.json';
import useConfig from '../hooks/useConfig';

export default function SendPayment() {
  const config = useConfig();

  const { account, isReady } = useAccount();
  const [query, setQuery] = useState('');
  const [selectedToken, setSelectedToken] = useState<string | null>(null);
  const [amount, setAmount] = useState(0);
  const [frequency, setFrequency] = useState(0);
  const [selectedYieldPlatform, setSelectedYieldPlatform] = useState(yieldStrategy[0]);
  const [selectedSelector, setSelectedSelector] = useState(periodDuration[5]);
  const [, setApproveTxIsLoading] = useState(false);
  const [approveTxHasLoaded, setApproveTxHasLoaded] = useState(false);
  const [receiverAddress, setReceiverAddress] = useState(
    '0x0000000000000000000000000000000000000000',
  );
  const [estimatedGain, setEstimatedGain] = useState({
    amount: 0,
    currency: 'CPZ',
    frequency: 0,
    periodDuration: 'year',
    yieldApy: 3,
    total: '0',
  });

  // TODO: Update the function to calculate the estimated gain
  function handleChangeEstimatedGain(event: Event) {
    switch (event.target.id) {
      case 'amount': {
        const total = event.target.value * (1 + estimatedGain.yieldApy) * 0.01;
        setEstimatedGain({ ...estimatedGain, amount: event.target.value, total: total.toFixed(2) });
        break;
      }
      case 'yieldApy': {
        const total = estimatedGain.amount * (1 + event.target.value) * 0.01;
        setEstimatedGain({
          ...estimatedGain,
          yieldApy: event.target.value,
          total: total.toFixed(2),
        });
        break;
      }
      case 'frequency': {
        const total = estimatedGain.amount * (1 + estimatedGain.yieldApy) * 0.01;
        setEstimatedGain({
          ...estimatedGain,
          frequency: event.target.value,
          total: total.toFixed(2),
        });
        break;
      }
      case 'periodDuration': {
        const total = estimatedGain.amount * (1 + estimatedGain.yieldApy) * 0.01;
        setEstimatedGain({
          ...estimatedGain,
          periodDuration: event.target.value,
          total: total.toFixed(2),
        });
        break;
      }
      default: {
        const total = 0; // TODO: calculate total
        setEstimatedGain({ ...estimatedGain, total: total.toFixed(2) });
        break;
      }
    }
  }

  // APPROVE
  const approveTx = useContractWrite({
    address: selectedToken?.address,
    abi: SimpleERC20.abi,
    functionName: 'approve',
    args: [config?.escrowFactoryAddress, amount * 10 ** selectedToken?.decimals],
    enabled: !!config && selectedToken,
  });

  // EXECUTE
  const executeTx = useContractWrite({
    address: config?.escrowFactoryAddress,
    abi: CapazEscrowFactory.abi,
    functionName: 'mint',
    args: [
      {
        sender: `${isReady ? account.address : null}`,
        receiver: receiverAddress,
        tokenAddress: selectedToken?.address,
        totalAmount: amount * 10 ** selectedToken?.decimals,
        startTime: getTimestampInSeconds(),
        periodDuration: selectedSelector.value,
        periods: frequency,
        yieldStrategyId: selectedYieldPlatform.id,
        escrowAddress: '0x0000000000000000000000000000000000000000',
      },
    ],
    enabled: !!config && selectedToken,
  });

  function getTimestampInSeconds() {
    return Math.floor(Date.now() / 1000) + 120;
  }

  function handleSubmit() {
    console.log('Amount: ', amount);
    setApproveTxIsLoading(true);
    approveTx.write().then(async () => {
      setApproveTxIsLoading(false);
      setApproveTxHasLoaded(true);
      console.log(await executeTx.data);
    });
  }

  async function onPayment() {
    await executeTx.write();
  }

  useEffect(() => {
    setSelectedToken(null);
  }, [config?.networkId]);

  return (
    <main>
      {/* Main dashboard's table */}
      <div className='py-6 w-full'>
        <div className='mx-auto xl:w-8/12 px-4 sm:px-6 md:px-8'>
          <h1 className='text-2xl font-semibold text-gray-900'>Send Payment</h1>
        </div>
        <div className='mx-auto xl:w-8/12 px-4 sm:px-6 md:px-8'>
          <div className='py-4'>
            <div>
              {/* Receiver wallet */}
              <input
                id='receiverAddress'
                type='text'
                className='focus:outline-none border-b w-full pb-2 border-sky-400 placeholder-gray-500'
                placeholder='Receiver wallet address'
                onChange={event => setReceiverAddress(event.target.value)}
              />
            </div>
            <div className='flex'>
              {/* Token selection */}
              <div className='my-8 w-72 mr-8'>
                <Combobox value={selectedToken} onChange={setSelectedToken}>
                  <div className='relative mt-1'>
                    <div className='relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm'>
                      <Combobox.Input
                        className='w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0'
                        displayValue={token => (token ? token.name : 'Select token')}
                        onChange={event => setQuery(event.target.value)}
                      />
                      <Combobox.Button className='absolute inset-y-0 right-0 flex items-center pr-2'>
                        <ChevronUpDownIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
                      </Combobox.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      leave='transition ease-in duration-100'
                      leaveFrom='opacity-100'
                      leaveTo='opacity-0'
                      afterLeave={() => setQuery('')}>
                      <Combobox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                        {config?.tokens.length === 0 && query !== '' ? (
                          <div className='relative cursor-default select-none py-2 px-4 text-gray-700'>
                            Nothing found.
                          </div>
                        ) : (
                          config?.tokens.map(token => (
                            <Combobox.Option
                              key={token}
                              className={({ active }) =>
                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                  active ? 'bg-teal-600 text-white' : 'text-gray-900'
                                }`
                              }
                              value={token}>
                              {({ selected, active }) => (
                                <>
                                  <span
                                    className={`block truncate ${
                                      selected ? 'font-medium' : 'font-normal'
                                    }`}>
                                    {token?.name}
                                  </span>
                                  {selected ? (
                                    <span
                                      className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                        active ? 'text-white' : 'text-teal-600'
                                      }`}>
                                      <CheckIcon className='h-5 w-5' aria-hidden='true' />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Combobox.Option>
                          ))
                        )}
                      </Combobox.Options>
                    </Transition>
                  </div>
                </Combobox>
              </div>
              {/* Amount */}
              <input
                id='amount'
                type='number'
                className='focus:outline-none border-b w-full pb-2 border-sky-400 placeholder-gray-500 my-8'
                placeholder='Amount'
                onChange={event => setAmount(event.target.value)}
              />
            </div>
            <div className='flex'>
              {/* Frequency */}
              <input
                type='number'
                className='focus:outline-none border-b w-full pb-2 border-sky-400 placeholder-gray-500 my-8 mr-8'
                placeholder='Payed in X times'
                onChange={event => setFrequency(event.target.value)}
              />
              {/* Frequency selector */}
              <div className='my-8 w-72 mr-8'>
                <Combobox value={selectedSelector} onChange={setSelectedSelector}>
                  <div className='relative mt-1'>
                    <div className='relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm'>
                      <Combobox.Input
                        className='w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0'
                        displayValue={selectedSelector => selectedSelector.name}
                        onChange={event => {
                          setQuery(event.target.value);
                          handleChangeEstimatedGain(event);
                        }}
                      />
                      <Combobox.Button className='absolute inset-y-0 right-0 flex items-center pr-2'>
                        <ChevronUpDownIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
                      </Combobox.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      leave='transition ease-in duration-100'
                      leaveFrom='opacity-100'
                      leaveTo='opacity-0'
                      afterLeave={() => setQuery('')}>
                      <Combobox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                        {periodDuration.length === 0 && query !== '' ? (
                          <div className='relative cursor-default select-none py-2 px-4 text-gray-700'>
                            Nothing found.
                          </div>
                        ) : (
                          periodDuration.map(periodDuration => (
                            <Combobox.Option
                              key={periodDuration.id}
                              className={({ active }) =>
                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                  active ? 'bg-teal-600 text-white' : 'text-gray-900'
                                }`
                              }
                              value={periodDuration}>
                              {({ selected, active }) => (
                                <>
                                  <span
                                    className={`block truncate ${
                                      selected ? 'font-medium' : 'font-normal'
                                    }`}>
                                    {periodDuration.name}
                                  </span>
                                  {selected ? (
                                    <span
                                      className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                        active ? 'text-white' : 'text-teal-600'
                                      }`}>
                                      <CheckIcon className='h-5 w-5' aria-hidden='true' />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Combobox.Option>
                          ))
                        )}
                      </Combobox.Options>
                    </Transition>
                  </div>
                </Combobox>
              </div>
            </div>
            <div className='flex'>
              {/* Yield selector */}
              <div className='my-8 w-72 mr-8'>
                <Combobox value={selectedYieldPlatform.name} onChange={setSelectedYieldPlatform}>
                  <div className='relative mt-1'>
                    <div className='relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm'>
                      <Combobox.Input
                        className='w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0'
                        displayValue={() => selectedYieldPlatform.name}
                        onChange={event => {
                          setQuery(event.target.value);
                          handleChangeEstimatedGain(event);
                        }}
                      />
                      <Combobox.Button className='absolute inset-y-0 right-0 flex items-center pr-2'>
                        <ChevronUpDownIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
                      </Combobox.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      leave='transition ease-in duration-100'
                      leaveFrom='opacity-100'
                      leaveTo='opacity-0'
                      afterLeave={() => setQuery('')}>
                      <Combobox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                        {yieldStrategy.length === 0 && query !== '' ? (
                          <div className='relative cursor-default select-none py-2 px-4 text-gray-700'>
                            Nothing found.
                          </div>
                        ) : (
                          yieldStrategy.map(yieldStrategy => (
                            <Combobox.Option
                              key={yieldStrategy.id}
                              className={({ active }) =>
                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                  active ? 'bg-teal-600 text-white' : 'text-gray-900'
                                }`
                              }
                              value={yieldStrategy}>
                              {({ selected, active }) => (
                                <>
                                  <span
                                    className={`block truncate ${
                                      selected ? 'font-medium' : 'font-normal'
                                    }`}>
                                    {yieldStrategy.name}
                                  </span>
                                  {selected ? (
                                    <span
                                      className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                        active ? 'text-white' : 'text-teal-600'
                                      }`}>
                                      <CheckIcon className='h-5 w-5' aria-hidden='true' />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Combobox.Option>
                          ))
                        )}
                      </Combobox.Options>
                    </Transition>
                  </div>
                </Combobox>
              </div>
              <div className='my-8'>
                {`${selectedYieldPlatform.apy} % APY | Estimated gain : ${estimatedGain.total} $`}
              </div>
            </div>

            {/* Buttons */}
            <div className='flex justify-center my-6 flex-col align-center mx-auto'>
              {approveTxHasLoaded !== true && (
                <button
                  className='rounded-full text-center flex align-center justify-center  p-3 w-full sm:w-56   bg-gradient-to-r from-sky-600  to-teal-300 text-white text-lg font-semibold'
                  onClick={handleSubmit}>
                  <span>Approve Payment</span>
                  {approveTx.isLoading && (
                    <div className='loader'>
                      <svg
                        version='1.1'
                        id='loader-1'
                        x='0px'
                        y='0px'
                        width='30px'
                        height='30px'
                        viewBox='0 0 50 50'>
                        <path
                          fill='#000'
                          d='M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z'>
                          <animateTransform
                            attributeType='xml'
                            attributeName='transform'
                            type='rotate'
                            from='0 25 25'
                            to='360 25 25'
                            dur='0.6s'
                            repeatCount='indefinite'
                          />
                        </path>
                      </svg>
                    </div>
                  )}
                </button>
              )}
              {/* display errors */}
              {approveTx.error && (
                <div className='text-red-500 text-sm font-semibold text-center'>
                  {approveTx.error.message.split(' (')[0]}
                </div>
              )}

              {approveTxHasLoaded && (
                <button
                  className='rounded-full text-center flex align-center justify-center  p-3 w-full sm:w-56   bg-gradient-to-r from-sky-600  to-teal-300 text-white text-lg font-semibold'
                  onClick={onPayment}>
                  <span>Send Payment</span>
                  {executeTx.isLoading ? (
                    <div className='loader'>
                      <svg
                        version='1.1'
                        id='loader-1'
                        x='0px'
                        y='0px'
                        width='30px'
                        height='30px'
                        viewBox='0 0 50 50'>
                        <path
                          fill='#000'
                          d='M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z'>
                          <animateTransform
                            attributeType='xml'
                            attributeName='transform'
                            type='rotate'
                            from='0 25 25'
                            to='360 25 25'
                            dur='0.6s'
                            repeatCount='indefinite'
                          />
                        </path>
                      </svg>
                    </div>
                  ) : null}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
