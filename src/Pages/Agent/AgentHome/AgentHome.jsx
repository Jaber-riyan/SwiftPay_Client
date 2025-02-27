import React, { useState } from 'react'
import UseUser from '../../../Hooks/UseUser/UseUser'
import UseAgents from '../../../Hooks/UseAgents/UseAgents'
import { Link } from 'react-router-dom'
import { CiInboxIn } from 'react-icons/ci'
import { useForm } from 'react-hook-form'
import Loading from '../../Shared/Loading/Loading'
import UseAxiosSecure from '../../../Hooks/UseAxiosSecureAndNormal/UseAxiosSecure'
import { toast } from 'react-toastify'

function AgentHome() {
  const { userData, userLoading } = UseUser()
  const [showBalance, setShowBalance] = useState(false)
  const [cashInOpen, setCashInOpen] = useState(false)
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const axiosInstanceSecure = UseAxiosSecure()


  if (userLoading) {
    return <Loading></Loading>
  }


  const handleCashInRequest = async (data) => {
    const transactionInfo = {
      senderEmail: userData?.email,
      senderPhoneNumber: userData?.phoneNumber,
      agentEmail : userData?.email,
      type: "cash in agent",
      status: "pending",
      message: data.message,
      timestamp: new Date().toISOString(),
      txId: `${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`
    }

    const { data: responseCashIn } = await axiosInstanceSecure.post('/cash-in/agent', transactionInfo)

    if (responseCashIn.status) {
      console.log(responseCashIn);
      setCashInOpen(!cashInOpen)
      reset()
      toast.success(responseCashIn.message)
    }
    else {
      toast.error(responseCashIn.message)
    }
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

      <div>
        <h2 className='text-2xl dark:text-white font-semibold'>Click Dashboard For More Options <Link to={'/agent/dashboard'} className='underline hover:text-blue-600'>Dashboard</Link></h2>
      </div>

      <div onClick={() => setCashInOpen(!cashInOpen)} className='p-5  mt-8 bg-green-600 hover:bg-green-700 rounded-2xl'>
        <button className='text-2xl font-bold flex items-center gap-2 justify-center'><span>Cash In Request</span> <CiInboxIn size={30} /></button>
      </div>

      {cashInOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96 animate__animated animate__fadeIn">
            <h2 className="text-2xl font-bold mb-4 text-center">Cash In Request</h2>

            <form onSubmit={handleSubmit(handleCashInRequest)} className="space-y-4">
              {/* Amount Field */}
              <div>
                <label className="block mb-1">Why You Need Money?</label>
                <textarea
                  type="text"
                  {...register("message", { required: "Amount is required" })}
                  className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter details"
                />
                {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
              </div>

              {/* Buttons */}
              <div className="flex justify-between">
                <button type="button" onClick={() => {
                  setCashInOpen(!cashInOpen)
                  reset()
                }
                } className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-700">
                  Cancel
                </button>
                <button type="submit" className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      )
      }

    </div>
  )
}

export default AgentHome