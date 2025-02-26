import React, { useState } from 'react'
import UseUser from '../../../Hooks/UseUser/UseUser'
import { Link } from 'react-router-dom'
import Loading from '../../Shared/Loading/Loading'
import { FaUserAlt } from "react-icons/fa";
import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecureAndNormal/UseAxiosSecure';
import { FaUserCheck } from 'react-icons/fa6';
import { GrTransaction } from "react-icons/gr";
import { MdSystemSecurityUpdateGood } from "react-icons/md";



function AdminHome() {
  const { userData, userLoading } = UseUser()
  const axiosInstanceSecure = UseAxiosSecure()
  const [showBalance, setShowBalance] = useState(false)

  const { data: adminStats, isLoading } = useQuery({
    queryKey: ['adminStats'],
    queryFn: async () => {
      const { data } = await axiosInstanceSecure.get('/admin/stats')
      return data
    }
  })

  if (userLoading) {
    return <Loading></Loading>
  }
  else if (isLoading) {
    return <Loading></Loading>
  }

  return (
    <div className='pb-10'>
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
            className={`grow md:text-xl select-none font-bold ${!showBalance ? "blur-sm" : ""}`}
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
        <h2 className='text-2xl dark:text-white font-semibold'>Click Dashboard For More Options <Link to={'/admin/dashboard'} className='underline hover:text-blue-600'>Dashboard</Link></h2>
      </div>
      <div className='mt-10 flex gap-5 flex-wrap'>
        <div className='p-10 bg-orange-400 rounded-2xl'>
          <h2 className='text-xl font-bold flex justify-center items-center gap-3'><FaUserAlt size={25} /><span>Total Users : {adminStats.totalUser}</span></h2>
        </div>
        <div className='p-10 bg-red-400 rounded-2xl'>
          <h2 className='text-xl font-bold flex justify-center items-center gap-3'><FaUserCheck size={25} /><span>Total Verified Agents : {adminStats.totalAgent}</span></h2>
        </div>
        <div className='p-10 bg-green-400 rounded-2xl'>
          <h2 className='text-xl font-bold flex justify-center items-center gap-3'><GrTransaction size={25} /><span>Total Transactions : {adminStats.totalTransactions}</span></h2>
        </div>
        <div className='p-10 bg-green-400 rounded-2xl'>
          <h2 className='text-xl font-bold flex justify-center items-center gap-3'><MdSystemSecurityUpdateGood size={25} /><span>Total System Money : {adminStats.systemTotalMoney} TK</span></h2>
        </div>
      </div>
    </div>
  )
}

export default AdminHome