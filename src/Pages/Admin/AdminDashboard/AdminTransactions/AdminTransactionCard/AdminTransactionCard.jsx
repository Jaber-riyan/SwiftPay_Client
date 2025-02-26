import React from 'react'

export default function AdminTransactionCard({ transaction, index }) {
    const { senderPhoneNumber, senderEmail, amount, adminProfit, agentProfit, fee, status, txId, type, timestamp } = transaction
    return (
        <tr className="border-b border-gray-300 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800">
            <td className='p-5 font-bold text-xl dark:text-white'>{index + 1}</td>
            <td className="py-2 px-4 text-[#737373] capitalize dark:text-gray-300">
                {senderPhoneNumber}
            </td>
            <td className="py-2 px-4 text-[#737373] dark:text-gray-300">{senderEmail}</td>
            <td className="py-2 px-4 text-[#737373] dark:text-gray-300">{amount}</td>
            <td className="py-2 px-4 text-[#737373] dark:text-gray-300">{(adminProfit + agentProfit) || fee}</td>
            <td className="py-2 px-4 text-[#737373]">
                <button className={`font-bold text-[1rem] w-full capitalize btn text-white ${status == "accepted" ? 'bg-green-600' : status == "canceled" ? 'bg-red-600' : 'bg-sky-500'}`}>{status || "None"}</button>
            </td>
            <td className="py-2 px-4 text-[#737373] dark:text-gray-300">{txId}</td>
            <td className="py-2 px-4 text-[#737373] dark:text-gray-300 capitalize">{type}</td>
            <td className="py-2 px-4 text-[#737373] dark:text-gray-300">{timestamp}</td>
        </tr>
    )
}
