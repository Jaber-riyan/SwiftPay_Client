import React from 'react';
import { Helmet } from 'react-helmet-async';
import UseAxiosSecure from '../../../../Hooks/UseAxiosSecureAndNormal/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import UseUser from '../../../../Hooks/UseUser/UseUser';
import UserTransactionCard from './UserTransactionCard/UserTransactionCard';

const UserTransactions = () => {
    const axiosInstanceSecure = UseAxiosSecure()
    const { userData } = UseUser()

    const { data: userTransactions } = useQuery({
        queryKey: ['userTransactions'],
        queryFn: async () => {
            const { data } = await axiosInstanceSecure.get(`/transactions/user/${userData?.email}`)
            return data.data
        }
    })

    return (
        <div>
            <div className='pb-32 mt-10'>
                <Helmet><title>Transactions | SwiftPay</title></Helmet>
                {/* <div className="text-center py-8 mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                        Manage All <span className="text-orange-600 capitalize"> Bookings </span>
                    </h1>
                    <div className="w-20 h-1 bg-orange-600 mx-auto mt-2 rounded"></div>
                </div> */}
                <div className='px-12 py-10 bg-white dark:bg-gray-800 dark:text-white'>
                    <div className='cinzel-font flex justify-between mb-10 items-center'>
                        <h2 className='text-[#151515] font-bold text-2xl dark:text-white'>Total Transactions: {userTransactions?.length}</h2>
                    </div>
                    <div className="animate__animated animate__fadeInUp">
                        <div className="overflow-y-auto min-h-[50vh] custom-scrollbar">
                            <table className="min-w-full table-fixed">
                                <thead className='sticky top-0 bg-[#D1A054] dark:bg-[#D1A054] text-white'>
                                    <tr>
                                        <th className="py-2 px-4 text-left tracking-[2px] rounded-tl-2xl">NO</th>
                                        <th className="py-2 px-4 text-left tracking-[2px]">SENDER PHONE NUMBER</th>
                                        <th className="py-2 px-4 text-left tracking-[2px]">SENDER EMAIL</th>
                                        <th className="py-2 px-4 text-left tracking-[2px]">AMOUNT</th>
                                        <th className="py-2 px-4 text-left tracking-[2px]">FEE</th>
                                        <th className="py-2 px-4 text-left tracking-[2px]">STATUS</th>
                                        <th className="py-2 px-4 text-left tracking-[2px]">TXID</th>
                                        <th className="py-2 px-4 text-left tracking-[2px]">TYPE</th>
                                        <th className="py-2 px-4 text-left tracking-[2px] rounded-tr-2xl">TIMESTAMP</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        userTransactions?.length > 0 ? userTransactions?.slice(0,100).map((transaction, index) => {
                                            return <UserTransactionCard key={transaction?._id} transaction={transaction} index={index}></UserTransactionCard>
                                        }) :
                                            <tr className='text-3xl font-bold text-center text-red-600'>
                                                <td></td>
                                                <td></td>
                                                <td><h2 className='p-6'>No Request</h2></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserTransactions;