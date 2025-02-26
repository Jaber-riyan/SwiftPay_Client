import React from 'react'

export default function CashInRequestCard({ request, handleAccept, handleCancel, index }) {
    const { senderPhoneNumber, agentEmail, amount, status, txId } = request
    return (
        <tr className="border-b border-gray-300 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800">
            <td className='p-5 font-bold text-xl dark:text-white'>{index + 1}</td>
            <td className="py-2 px-4 text-[#737373] capitalize dark:text-gray-300">
                {senderPhoneNumber}
            </td>
            <td className="py-2 px-4 text-[#737373] dark:text-gray-300">{agentEmail}</td>
            <td className="py-2 px-4 text-[#737373] dark:text-gray-300">{txId}</td>
            <td className="py-2 px-4 text-[#737373] dark:text-gray-300">{amount}</td>
            <td className="py-2 px-4 text-[#737373]">
                <button className={`font-bold text-[1rem] capitalize btn text-white ${status == "accepted" ? 'bg-green-600' : status == "in review" ? 'bg-blue-600' : 'bg-sky-500'}`}>{status}</button>
            </td>
            <td className="py-2 px-4 text-[#737373]">
                <button onClick={() => handleAccept(request)} disabled={status !== "pending"} className={`font-bold text-[1rem] capitalize btn bg-green-600 text-white disabled:bg-gray-500`}>Accept</button>
            </td>
            <td className="py-2 px-4 text-[#737373]">
                <button onClick={() => handleCancel(request)} disabled={status !== "pending"} className={`font-bold text-[1rem] capitalize btn bg-red-600 text-white disabled:bg-gray-500`}>Cancel</button>
            </td>
        </tr>
    )
}
