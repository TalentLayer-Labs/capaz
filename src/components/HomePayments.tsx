import { Menu } from '@headlessui/react';
import { useBalance } from '@web3modal/react';

export default function HomePayments() {
  return (
    <main>
      {/* Main dashboard's table */}
      <div className='py-6 w-full'>
        <div className='mx-auto xl:w-8/12 px-4 sm:px-6 md:px-8'>
          <h1 className='text-2xl font-semibold text-gray-900'>Your payments</h1>
        </div>

        <div className='mx-auto px-4 sm:px-6 md:px-8'>
          <div className='py-4'>
            <div className='w-full xl:w-8/12 mb-12 xl:mb-0 mx-auto mt-6'>
              <div className='relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded '>
                <div className='block w-full overflow-x-auto'>
                  <table className='items-center bg-transparent w-full border-collapse '>
                    <thead>
                      <tr>
                        <th className='px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-50 py-5 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
                          Asset
                        </th>
                        <th className='px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-50 py-5 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
                          Total
                        </th>
                        <th className='px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-50 py-5 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
                          Start at
                        </th>
                        <th className='px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-50 py-5 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
                          Payed In
                        </th>
                        <th className='px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-50 py-5 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
                          Every
                        </th>
                        <th className='px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-50 py-5 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
                          Yield
                        </th>
                        <th className='px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-50 py-5 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
                          More
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
                          -
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
