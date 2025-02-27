import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import RequestCard from '../CashOutRequest/RequestCard/RequestCard'
import UseUser from '../../../../Hooks/UseUser/UseUser'
import UseAxiosSecure from '../../../../Hooks/UseAxiosSecureAndNormal/UseAxiosSecure'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import { useQuery } from '@tanstack/react-query'
import Loading from '../../../Shared/Loading/Loading'
import CashInRequestCard from './CashInRequestCard/CashInRequestCard'
import { useForm } from 'react-hook-form'

function CashInRequest() {
  const axiosInstanceSecure = UseAxiosSecure()
  const { userData, userLoading, userRefetch } = UseUser()
  const [confirmFormOpen, setConfirmFormOpen] = useState(false)
  const [confirmData, setConfirmData] = useState({})
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const { data: cashInRequests, refetch: cashInRefetch, isLoading: cashInLoading } = useQuery({
    queryKey: ['cashInRequests'],
    queryFn: async () => {
      const { data } = await axiosInstanceSecure.get(`/cash-in/request/${userData?.email}`)
      return data.data
    }
  })

  const handleAccept = async (request) => {
    Swal.fire({
      title: "Will you accept this cash in request?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await axiosInstanceSecure.post('/cash-in/accept', request)
        if (data.status) {
          console.log(data.request);
          toast.success(data.message)
          cashInRefetch()
        }
        else {
          toast.error(data.message)
        }
      }
    });
    // console.log(request);
  }

  const handleCancel = (request) => {
    Swal.fire({
      title: "Will you cancel this cash in request?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await axiosInstanceSecure.post('/cash-in/canceled', request)
        if (data.status) {
          console.log(data.request);
          toast.success(data.message)
          cashInRefetch()
        }
        else {
          toast.error(data.message)
        }
      }
    });
  }

  const handleCashInRequest = async (formData) => {
    // console.log(formData);
    const agentPin = formData.pinCashInRequest
    const confirmAmount = formData.amountCashInRequest

    if (agentPin.length !== 6){
      return toast.error("PIN Should Be 6 Character.")
    }
      Swal.fire({
        title: "Will you want to confirm this cash in request?",
        showDenyButton: true,
        confirmButtonText: "Yes",
        denyButtonText: `No`
      }).then(async (result) => {
        if (result.isConfirmed) {
          const { data } = await axiosInstanceSecure.post('/cash-in/accept', { ...confirmData, agentPin, confirmAmount })
          if (data.status) {
            console.log(data.request);
            toast.success(data.message)
            cashInRefetch()
          }
          else {
            toast.error(data.message)
          }
        }
      });
  }


  if (userLoading) {
    return <Loading></Loading>
  }
  if (cashInLoading) {
    return <Loading></Loading>
  }

  return (
    <div>
      <div className='pb-32 mt-10'>
        <Helmet><title>Cash In | SwiftPay</title></Helmet>
        {/* <div className="text-center py-8 mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                        Manage All <span className="text-orange-600 capitalize"> Bookings </span>
                    </h1>
                    <div className="w-20 h-1 bg-orange-600 mx-auto mt-2 rounded"></div>
                </div> */}
        <div className='px-12 py-5 bg-white dark:bg-gray-800 dark:text-white'>
          <div className='cinzel-font flex justify-between mb-10 items-center'>
            <h2 className='text-[#151515] font-bold text-2xl dark:text-white'>Total Requests: {cashInRequests?.length}</h2>
          </div>
          <div className="animate__animated animate__fadeInUp">
            <div className="overflow-y-auto min-h-[50vh] custom-scrollbar">
              <table className="min-w-full table-fixed">
                <thead className='sticky top-0 bg-[#D1A054] dark:bg-[#D1A054] text-white'>
                  <tr>
                    <th className="py-2 px-2 text-left tracking-[2px] rounded-tl-2xl">NO</th>
                    <th className="py-2 px-2 text-left tracking-[2px]">SENDER PHONE NUMBER</th>
                    <th className="py-2 px-2 text-left tracking-[2px]">AGENT EMAIL</th>
                    <th className="py-2 px-2 text-left tracking-[2px]">TXID</th>
                    <th className="py-2 px-2 text-left tracking-[2px]">AMOUNT</th>
                    <th className="py-2 px-2 text-left tracking-[2px]">STATUS</th>
                    <th className="py-2 px-2 text-left tracking-[2px]">ACCEPT</th>
                    <th className="py-2 px-2 text-left tracking-[2px] rounded-tr-2xl">CANCEL</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    cashInRequests?.length > 0 ? cashInRequests?.map((request, index) => {
                      return <CashInRequestCard key={request?._id} handleAccept={handleAccept} handleCancel={handleCancel} request={request} setConfirmFormOpen={setConfirmFormOpen} confirmFormOpen={confirmFormOpen} setConfirmData={setConfirmData} index={index}></CashInRequestCard>
                    }) :
                      <tr className='text-3xl font-bold text-center text-red-600'>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td><h2 className='p-6'>No Request</h2></td>
                        <td></td>
                        <td></td>
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
      {/* confirm modal */}
      {confirmFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96 animate__animated animate__fadeIn">
            <h2 className="text-2xl font-bold mb-4 text-center">Send Money</h2>

            <form onSubmit={handleSubmit(handleCashInRequest)} className="space-y-4">
              {/* Amount Field */}
              <div>
                <label className="block mb-1">Amount (৳)</label>
                <input
                  type="number"
                  {...register("amountCashInRequest", { required: "Amount is required" })}
                  className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter amount"
                />
                {errors.amountCashInRequest && <p className="text-red-500 text-sm">{errors.amountCashInRequest.message}</p>}
              </div>

              {/* pin number field  */}
              <div>
                <label className="block mb-1">PIN Number (must 6 digits)</label>
                <input
                  type="password"
                  {...register("pinCashInRequest", {
                    required: "PIN number is required",
                  })}
                  className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter PIN number"
                />
                {errors.pinCashInRequest && <p className="text-red-500 text-sm">{errors.pinCashInRequest.message}</p>}
              </div>

              {/* Buttons */}
              <div className="flex justify-between">
                <button type="button" onClick={() => setConfirmFormOpen(!confirmFormOpen)} className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-700">
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

export default CashInRequest