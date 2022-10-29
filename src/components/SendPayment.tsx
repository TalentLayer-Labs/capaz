// @ts-nocheck
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { Fragment, useState } from 'react';
import { useContractWrite, useToken } from '@web3modal/react';
import { tokenAddressCTZ, tokenAddressEscrowFactory } from '../utils/index';
import CapazEscrowFactory from '../contracts/CapazEscrowFactory.json';
import SimpleERC20 from '../contracts/SimpleERC20.json';

export default function SendPayment() {
  const [query, setQuery] = useState('');
  const [estimatedGain, setEstimatedGain] = useState({
    amount: 0,
    currency: 'CPZ',
    frequency: 0,
    frequencyUnit: 'year',
    yieldApy: 3,
    total: '0',
  });
  function handleChangeEstimatedGain(event) {
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
      case 'frequencyUnit': {
        const total = estimatedGain.amount * (1 + estimatedGain.yieldApy) * 0.01;
        setEstimatedGain({
          ...estimatedGain,
          frequencyUnit: event.target.value,
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
  const frequencyUnit = [
    { id: 1, name: 'second' },
    { id: 2, name: 'minute' },
    { id: 3, name: 'hour' },
    { id: 4, name: 'day' },
    { id: 5, name: 'week' },
    { id: 6, name: 'month' },
    { id: 7, name: 'year' },
  ];
  const [selectedSelector, setSelectedSelector] = useState(frequencyUnit[5]);

  const yieldPlatform = [{ id: 1, name: 'Aave', apy: 5.43 }];
  const [selectedYieldPlatform, setSelectedYieldPlatform] = useState(yieldPlatform[0]);

  const tokens = [
    { id: 0, name: 'CPZ' },
    { id: 1, name: 'USDC' },
    { id: 2, name: 'USDT' },
    { id: 3, name: 'BUSD' },
  ];
  const [selectedToken, setSelectedToken] = useState(tokens[0]);

  // This ask the user to allow the future transaction
  function approve() {
    const {
      data: dataToken,
      error: errorToken,
      isLoading: isLoadingToken,
      refetch,
    } = useToken({
      address: tokenAddressCTZ,
    });

    const { data, error, isLoading, write } = useContractWrite({
      address: tokenAddressCTZ,
      abi: SimpleERC20.abi,
      functionName: 'approve',
      args: [tokenAddressEscrowFactory, 100],
    });
  }

  // This launch the transaction
  const { data, error, isLoading, write } = useContractWrite({
    address: tokenAddressEscrowFactory,
    abi: CapazEscrowFactory.abi,
    functionName: 'mint',
    args: [
      {
        sender: '0x20015a0d2650bA427665Ea73784B6498CC05E851',
        receiver: '0x5497Cfe8748e61b3d444c3aEb4B579a516A88117',
        tokenAddress: tokenAddressCTZ,
        capazERC20LocalAddress: '0x48C45A025D154b40AffB41bc3bDEecb689edE7E6',
        totalAmount: 3,
        startTime: 1668035169,
        periodDuration: 600,
        periods: 10,
        yieldStrategyId: 2,
        escrowAddress: '0x0000000000000000000000000000000000000000',
      },
    ],
  });

  async function handleClick() {
    write();
  }

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
                        displayValue={token => token.name}
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
                        {tokens.length === 0 && query !== '' ? (
                          <div className='relative cursor-default select-none py-2 px-4 text-gray-700'>
                            Nothing found.
                          </div>
                        ) : (
                          tokens.map(token => (
                            <Combobox.Option
                              key={token.id}
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
                                    {token.name}
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
                onChange={handleChangeEstimatedGain}
              />
            </div>
            <div className='flex'>
              {/* Frequency */}
              <input
                type='number'
                className='focus:outline-none border-b w-full pb-2 border-sky-400 placeholder-gray-500 my-8 mr-8'
                placeholder='Frequency'
                onChange={handleChangeEstimatedGain}
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
                          handleChangeEstimatedGain();
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
                        {frequencyUnit.length === 0 && query !== '' ? (
                          <div className='relative cursor-default select-none py-2 px-4 text-gray-700'>
                            Nothing found.
                          </div>
                        ) : (
                          frequencyUnit.map(frequencyUnit => (
                            <Combobox.Option
                              key={frequencyUnit.id}
                              className={({ active }) =>
                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                  active ? 'bg-teal-600 text-white' : 'text-gray-900'
                                }`
                              }
                              value={frequencyUnit}>
                              {({ selected, active }) => (
                                <>
                                  <span
                                    className={`block truncate ${
                                      selected ? 'font-medium' : 'font-normal'
                                    }`}>
                                    {frequencyUnit.name}
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
                <Combobox value={yieldPlatform} onChange={setSelectedYieldPlatform}>
                  <div className='relative mt-1'>
                    <div className='relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm'>
                      <Combobox.Input
                        className='w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0'
                        displayValue={yieldPlatform => selectedYieldPlatform.name}
                        onChange={event => {
                          setQuery(event.target.value);
                          handleChangeEstimatedGain();
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
                        {yieldPlatform.length === 0 && query !== '' ? (
                          <div className='relative cursor-default select-none py-2 px-4 text-gray-700'>
                            Nothing found.
                          </div>
                        ) : (
                          yieldPlatform.map(yieldPlatform => (
                            <Combobox.Option
                              key={yieldPlatform.id}
                              className={({ active }) =>
                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                  active ? 'bg-teal-600 text-white' : 'text-gray-900'
                                }`
                              }
                              value={yieldPlatform}>
                              {({ selected, active }) => (
                                <>
                                  <span
                                    className={`block truncate ${
                                      selected ? 'font-medium' : 'font-normal'
                                    }`}>
                                    {yieldPlatform.name}
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
            <div className='flex'>
              <input type='checkbox' className='border-sky-400 ' value='' />
              <div className='px-3 text-gray-500'>I accept terms & conditions</div>
            </div>
            <div className='flex justify-center my-6'>
              <button
                className='rounded-full  p-3 w-full sm:w-56   bg-gradient-to-r from-sky-600  to-teal-300 text-white text-lg font-semibold'
                onClick={handleClick}>
                Send Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
