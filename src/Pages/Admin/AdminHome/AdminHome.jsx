import React, { useState } from 'react'
import UseUser from '../../../Hooks/UseUser/UseUser'
import { Link } from 'react-router-dom'

function AdminHome() {
  const { userData } = UseUser()
  const [showBalance, setShowBalance] = useState(false)

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
    </div>
  )
}

export default AdminHome