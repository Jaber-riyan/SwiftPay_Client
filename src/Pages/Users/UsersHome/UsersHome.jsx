import React, { useState } from 'react'
import UseRole from '../../../Hooks/UseRole/UseRole'
import useAuth from '../../../Hooks/UseAuth/UseAuth'
import UseUser from '../../../Hooks/UseUser/UseUser'
import { LuSend } from "react-icons/lu";
import { CiInboxIn, CiInboxOut } from "react-icons/ci";
import { useForm } from 'react-hook-form';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecureAndNormal/UseAxiosSecure';
import { toast } from 'react-toastify';
import UseAgents from '../../../Hooks/UseAgents/UseAgents';



function UsersHome() {
    const { user } = useAuth()
    const { userData, userRefetch } = UseUser()
    const [showBalance, setShowBalance] = useState(false)
    const [sendMoneyOpen, setSendMoneyOpen] = useState(false)
    const [cashOutOpen, setCashOutOpen] = useState(false)
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const axiosInstanceSecure = UseAxiosSecure()
    const { agents } = UseAgents()
    // console.log(agents);
    // console.log(user);
    // console.log(userData);



    const handleSendMoney = async (data) => {
        const amount = data.amount
        const receiverPhoneNumber = data.phoneNumber
        const senderEmail = userData?.email
        const pin = data.pin

        console.table({ amount, receiverPhoneNumber, senderEmail, pin });

        if (pin.length !== 6) {
            return toast.error("PIN Must be 6 digits")
        }

        const { data: sendMoneyData } = await axiosInstanceSecure.post('/send-money', { amount, receiverPhoneNumber, senderEmail, pin })
        if (sendMoneyData?.status) {
            console.log(sendMoneyData);
            const transactionInfo = {
                senderEmail,
                senderPhoneNumber: userData?.phoneNumber,
                receiverPhoneNumber,
                type: "send money",
                amount,
                fee: amount >= 100 ? 5 : 0,
                timestamp: new Date().toISOString(),
                txId: `${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`
            }
            const { data: transactionData } = await axiosInstanceSecure.post('/transactions', transactionInfo)
            console.log(transactionData.transaction);
            setSendMoneyOpen(false)
            userRefetch()
            toast.success(sendMoneyData?.message)
            reset()
        }
        else {
            toast.error(sendMoneyData?.message)
        }
    };

    const handleCashOut = async (data) => {
        const amount = data.amountCashOut
        const pin = data.pinCashOut
        const agentEmail = data.selectedAgent
        const senderEmail = userData?.email

        if (pin.length !== 6) {
            return toast.error("PIN Must be 6 digits")
        }

        const transactionInfo = {
            senderEmail,
            senderPhoneNumber: userData?.phoneNumber,
            agentEmail,
            type: "cash out",
            status: "pending",
            amount,
            pin,
            timestamp: new Date().toISOString(),
            txId: `${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`
        }

        const { data: responseCashOut } = await axiosInstanceSecure.post('/cash-out', transactionInfo)
        if (responseCashOut.status) {
            console.log(responseCashOut.body, responseCashOut);
            toast.success(responseCashOut.message)
        }
        else {
            toast.error(responseCashOut.message)
        }
        // setCashOutOpen(false)
    }


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
                        className='md:text-xl bg-gray-900 text-white'
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
                    <div onClick={() => setSendMoneyOpen(true)} className='p-5 bg-blue-600 hover:bg-blue-700 rounded-2xl cursor-pointer'>
                        <button
                            className="text-2xl font-bold flex items-center gap-2 justify-center rounded-lg transition duration-300"
                        >
                            <span>Send Money</span>
                            <LuSend size={30} />
                        </button>
                    </div>
                    <div onClick={() => setCashOutOpen(true)} className='p-5 bg-orange-600 hover:bg-orange-700 rounded-2xl'>
                        <button className='text-2xl font-bold flex items-center gap-2 justify-center'><span>Cash Out</span> <CiInboxOut size={30} /></button>
                    </div>

                    <div className='p-5 bg-green-600 hover:bg-green-700 rounded-2xl'>
                        <button className='text-2xl font-bold flex items-center gap-2 justify-center'><span>Cash In</span> <CiInboxIn size={30} /></button>
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

                            {/* pin number field  */}
                            <div>
                                <label className="block mb-1">PIN Number (must 6 digits)</label>
                                <input
                                    type="password"
                                    {...register("pin", {
                                        required: "PIN number is required",
                                    })}
                                    className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter PIN number"
                                />
                                {errors.pin && <p className="text-red-500 text-sm">{errors.pin.message}</p>}
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

            {/* cash out modal  */}
            {cashOutOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96 animate__animated animate__fadeIn">
                        <h2 className="text-2xl font-bold mb-4 text-center">Send Money</h2>

                        <form onSubmit={handleSubmit(handleCashOut)} className="space-y-4">
                            {/* Amount Field */}
                            <div>
                                <label className="block mb-1">Amount (৳)</label>
                                <input
                                    type="number"
                                    {...register("amountCashOut", { required: "Amount is required" })}
                                    className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter amount"
                                />
                                {errors.amount && <p className="text-red-500 text-sm">{errors.amount.message}</p>}
                            </div>

                            {/* Agents Dropdown */}
                            <div>
                                <label className="block mb-1">Select Agent</label>
                                <select
                                    {...register("selectedAgent", { required: "Please select an agent" })}
                                    className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select an agent</option>
                                    {agents.map((agent) => (
                                        <option key={agent._id} value={agent.email}>
                                            {agent.name} (৳{agent.balance})
                                        </option>
                                    ))}
                                </select>
                                {errors.selectedAgent && <p className="text-red-500 text-sm">{errors.selectedAgent.message}</p>}
                            </div>

                            {/* pin number field  */}
                            <div>
                                <label className="block mb-1">PIN Number (must 6 digits)</label>
                                <input
                                    type="password"
                                    {...register("pinCashOut", {
                                        required: "PIN number is required",
                                    })}
                                    className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter PIN number"
                                />
                                {errors.pin && <p className="text-red-500 text-sm">{errors.pin.message}</p>}
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-between">
                                <button type="button" onClick={() => setCashOutOpen(false)} className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-700">
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