import React, { useState } from 'react'
import UseRole from '../../../Hooks/UseRole/UseRole'
import useAuth from '../../../Hooks/UseAuth/UseAuth'
import UseUser from '../../../Hooks/UseUser/UseUser'
import { LuSend } from "react-icons/lu";
import { CiInboxOut } from "react-icons/ci";
import { useForm } from 'react-hook-form';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecureAndNormal/UseAxiosSecure';
import { toast } from 'react-toastify';



function UsersHome() {
    const { user } = useAuth()
    const { userData, userRefetch } = UseUser()
    const [showBalance, setShowBalance] = useState(false)
    const [sendMoneyOpen, setSendMoneyOpen] = useState(false)
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const axiosInstanceSecure = UseAxiosSecure()
    // console.log(user);
    // console.log(userData);



    const handleSendMoney = async (data) => {
        const amount = data.amount
        const receiverPhoneNumber = data.phoneNumber
        const senderEmail = userData?.email

        const { data: sendMoneyData } = await axiosInstanceSecure.post('/send-money', { amount, receiverPhoneNumber, senderEmail })
        if (sendMoneyData?.status) {
            console.log(sendMoneyData);
            toast.success(sendMoneyData?.message)
        }
        else{
            toast.error(sendMoneyData?.message)
        }
    };


    return (
        <div>
            <div className="text-center py-8">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                    Welcome to SwiftPay <span className="text-orange-600 capitalize"> {userData?.name} </span>
                </h1>
                <div className="w-20 h-1 bg-orange-600 mx-auto mt-2 rounded"></div>
            </div>

            {/* balance section  */}
            <div className='mb-10'>
                <label className="input input-bordered grid grid-cols-3 dark:bg-gray-700">
                    <div></div>
                    <input
                        value={`৳ ${userData?.balance}`}
                        type="text"
                        readOnly
                        className={`grow md:text-xl font-bold ${!showBalance ? "blur-sm" : ""}`}
                        placeholder="Search"
                    />
                    <button
                        onClick={() => setShowBalance(!showBalance)}
                        className='md:text-xl bg-gray-900'
                    >
                        {showBalance ? "Hide" : "Show"} ৳
                    </button>

                </label>
            </div>

            {/* Transaction Management */}
            <div>
                <div className='mb-6'>
                    <h2 className='text-3xl font-semibold'>Our Services</h2>
                    <div className="w-20 h-1 bg-orange-600 mt-2 rounded"></div>
                </div>
                <div className='flex gap-3 flex-wrap'>
                    <div className='p-5 bg-blue-600 rounded-2xl'>
                        <button
                            onClick={() => setSendMoneyOpen(true)}
                            className="text-2xl font-bold flex items-center gap-2 justify-center bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300"
                        >
                            <span>Send Money</span>
                            <LuSend size={30} />
                        </button>
                    </div>
                    <div className='p-5 bg-orange-600 rounded-2xl'>
                        <button className='text-2xl font-bold flex items-center gap-2 justify-center'><span>Cash Out</span> <CiInboxOut size={30} /></button>
                    </div>
                </div>
            </div>


            {/* send money and cash out modals */}
            {/* send money modal  */}
            {sendMoneyOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96 animate__animated animate__fadeIn">
                        <h2 className="text-2xl font-bold mb-4 text-center">Send Money</h2>

                        <form onSubmit={handleSubmit(handleSendMoney)} className="space-y-4">
                            {/* Amount Field */}
                            <div>
                                <label className="block mb-1">Amount (৳)</label>
                                <input
                                    type="number"
                                    {...register("amount", { required: "Amount is required" })}
                                    className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter amount"
                                />
                                {errors.amount && <p className="text-red-500 text-sm">{errors.amount.message}</p>}
                            </div>

                            {/* Receiver's Phone Number Field */}
                            <div>
                                <label className="block mb-1">Receiver Phone Number</label>
                                <input
                                    type="text"
                                    {...register("phoneNumber", {
                                        required: "Phone number is required",
                                    })}
                                    className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter phone number"
                                />
                                {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>}
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-between">
                                <button type="button" onClick={() => setSendMoneyOpen(false)} className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-700">
                                    Cancel
                                </button>
                                <button type="submit" className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">
                                    Send
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default UsersHome