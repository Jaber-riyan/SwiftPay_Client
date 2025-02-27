import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import UseAxiosSecure from '../../../../Hooks/UseAxiosSecureAndNormal/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../Shared/Loading/Loading';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import UserManagementCard from './UserManagementCard/UserManagementCard';
import UserTransactionCard from '../../../Users/UserDashboard/UserTransactions/UserTransactionCard/UserTransactionCard';
import AgentTransactionCard from '../../../Agent/AgentDashboard/AgentTransactions/AgentTransactionCard/AgentTransactionCard';

const UserManagement = () => {
    const axiosInstanceSecure = UseAxiosSecure()
    const [isOpen, setIsOpen] = useState(false)
    const [modalData, setModalData] = useState([])
    const [roleModal, setRoleModal] = useState("")

    const { data: allUsers, isLoading, refetch } = useQuery({
        queryKey: ['allUsers'],
        queryFn: async () => {
            const { data } = await axiosInstanceSecure.get('/all/users')
            return data.data
        }
    })

    const handleBlock = async (request) => {
        Swal.fire({
            title: "Will you block this user?",
            showDenyButton: true,
            confirmButtonText: "Yes",
            denyButtonText: `No`
        }).then(async (result) => {
            if (result.isConfirmed) {
                const { data } = await axiosInstanceSecure.post('/users/block', request)
                if (data.status) {
                    console.log(data.request);
                    toast.success(data.message)
                    refetch()
                }
                else {
                    toast.error("Something went Wrong, try again")
                }
            }
        });
        // console.log(request);
    }

    const handleUnblock = (request) => {
        Swal.fire({
            title: "Will you unblock this user?",
            showDenyButton: true,
            confirmButtonText: "Yes",
            denyButtonText: `No`
        }).then(async (result) => {
            if (result.isConfirmed) {
                const { data } = await axiosInstanceSecure.post('/users/unblock', request)
                if (data.status) {
                    console.log(data.request);
                    toast.success(data.message)
                    refetch()
                }
                else {
                    toast.error("Something went Wrong, try again")
                }
            }
        });
    }

    const getData = async (user) => {
        const role = user?.role
        setModalData([])
        setRoleModal(role)
        if (role == "user") {
            const { data = [] } = await axiosInstanceSecure.get(`/transactions/user/${user?.email}`)
            setModalData(data.data)
        }
        else {
            const { data = [] } = await axiosInstanceSecure.get(`/transactions/agent/${user?.email}`)
            setModalData(data.data)
        }
    }


    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <div className='pb-32 mt-10'>
                <Helmet><title>Manage Users | SwiftPay</title></Helmet>
                {/* <div className="text-center py-8 mb-12">
                                            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                                                Manage All <span className="text-orange-600 capitalize"> Bookings </span>
                                            </h1>
                                            <div className="w-20 h-1 bg-orange-600 mx-auto mt-2 rounded"></div>
                                        </div> */}
                <div className='px-12 py-10 bg-white dark:bg-gray-800 dark:text-white'>
                    <div className='cinzel-font flex justify-between mb-10 items-center'>
                        <h2 className='text-[#151515] font-bold text-2xl dark:text-white'>Total Users: {allUsers?.length}</h2>
                    </div>
                    <div className="animate__animated animate__fadeInUp">
                        <div className="overflow-y-auto min-h-[50vh] custom-scrollbar">
                            <table className="min-w-full table-fixed">
                                <thead className='sticky top-0 bg-[#D1A054] dark:bg-[#D1A054] text-white'>
                                    <tr>
                                        <th className="py-2 px-4 text-left tracking-[2px] rounded-tl-2xl">NO</th>
                                        <th className="py-2 px-4 text-left tracking-[2px]">USER NAME</th>
                                        <th className="py-2 px-4 text-left tracking-[2px]">USER EMAIL</th>
                                        <th className="py-2 px-4 text-left tracking-[2px]">USER NID</th>
                                        <th className="py-2 px-4 text-left tracking-[2px]">BALANCE</th>
                                        <th className="py-2 px-4 text-left tracking-[2px]">STATUS</th>
                                        <th className="py-2 px-4 text-left tracking-[2px]">ROLE</th>
                                        <th className="py-2 px-4 text-left tracking-[2px]">BLOCK</th>
                                        <th className="py-2 px-4 text-left tracking-[2px] rounded-tr-2xl">UNBLOCK</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        allUsers?.length > 0 ? allUsers?.map((user, index) => {
                                            return <UserManagementCard key={user?._id} handleUnblock={handleUnblock} handleBlock={handleBlock} setIsOpen={setIsOpen} getData={getData} user={user} index={index}></UserManagementCard>
                                        }) :
                                            <tr className='text-3xl font-bold text-center text-red-600'>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td><h2 className='p-6'>No Users</h2></td>
                                                <td></td>
                                            </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {
                isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className='px-12 py-10 bg-white dark:bg-gray-800 dark:text-white'>
                        <div className='cinzel-font flex justify-between mb-10 items-center'>
                            <h2 className='text-[#151515] font-bold text-2xl dark:text-white'>Total Transactions: {modalData?.length}</h2>
                        </div>
                        <div className="animate__animated animate__fadeInUp">
                            <div className="overflow-y-auto min-h-[50vh] custom-scrollbar">
                                <table className="min-w-full table-fixed">
                                    <thead className='sticky top-0 bg-[#D1A054] dark:bg-[#D1A054] text-white'>
                                        {
                                            roleModal == "user" 
                                            ? 
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
                                            </tr> :
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
                                        }
                                    </thead>
                                    <tbody>
                                        {

                                            modalData?.length > 0 ? modalData?.map((transaction, index) => {
                                                return roleModal == "user" ? <UserTransactionCard key={transaction?._id} transaction={transaction} index={index}></UserTransactionCard> : <AgentTransactionCard key={transaction?._id} transaction={transaction} index={index}></AgentTransactionCard>
                                            }) :
                                                <tr className='text-3xl font-bold text-center text-red-600'>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td><h2 className='p-6'>No Transactions</h2></td>
                                                    <td></td>
                                                </tr>
                                        }
                                    </tbody>
                                </table>
                                <div className='flex justify-center mt-5'>
                                    <button onClick={() => setIsOpen(!isOpen)} className='btn btn-primary'>Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default UserManagement;