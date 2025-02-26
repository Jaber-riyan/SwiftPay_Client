import React from 'react'
import { Helmet } from 'react-helmet-async'
import RequestCard from '../CashOutRequest/RequestCard/RequestCard'
import UseUser from '../../../../Hooks/UseUser/UseUser'
import UseAxiosSecure from '../../../../Hooks/UseAxiosSecureAndNormal/UseAxiosSecure'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import { useQuery } from '@tanstack/react-query'
import Loading from '../../../Shared/Loading/Loading'
import CashInRequestCard from './CashInRequestCard/CashInRequestCard'

function CashInRequest() {
  const axiosInstanceSecure = UseAxiosSecure()
  const { userData, userLoading, userRefetch } = UseUser()

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
                      return <CashInRequestCard key={request?._id} handleAccept={handleAccept} handleCancel={handleCancel} request={request} index={index}></CashInRequestCard>
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
    </div>
  )
}

export default CashInRequest