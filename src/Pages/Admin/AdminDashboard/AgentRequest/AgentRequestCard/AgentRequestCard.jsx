import React from 'react'

export default function AgentRequestCard({ request, index, handleAccept, handleCancel }) {
    const { name, email, phoneNumber, nid, verified, status } = request
    return (
        <tr className="border-b border-gray-300 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800">
            <td className='p-5 font-bold text-xl dark:text-white'>{index + 1}</td>
            <td className="py-2 px-4 text-[#737373] capitalize dark:text-gray-300">
                {name}
            </td>
            <td className="py-2 px-4 text-[#737373] dark:text-gray-300">{email}</td>
            <td className="py-2 px-4 text-[#737373] dark:text-gray-300">{phoneNumber}</td>
            <td className="py-2 px-4 text-[#737373] dark:text-gray-300">{nid}</td>
            <td className="py-2 px-4 text-[#737373] dark:text-gray-300 capitalize">{status}</td>
            <td className="py-2 px-4 text-[#737373]">
                <button onClick={() => handleAccept(request)} disabled={status !== "pending"} className={`font-bold text-[1rem] capitalize btn bg-green-600 text-white disabled:bg-gray-500`}>Accept</button>
            </td>
            <td className="py-2 px-4 text-[#737373]">
                <button onClick={() => handleCancel(request)} disabled={status !== "pending"} className={`font-bold text-[1rem] capitalize btn bg-red-600 text-white disabled:bg-gray-500`}>Cancel</button>
            </td>
        </tr>
    )
}
