import React from 'react'

function AgentTransactionCard({ transaction, index }) {
    const { senderPhoneNumber, fee, senderEmail, amount, adminProfit, agentProfit, status, txId, type, timestamp } = transaction
    return (
        <tr className="border-b border-gray-300 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800">
            <td className='p-5 font-bold text-xl dark:text-white'>{index + 1}</td>
            <td className="py-2 px-4 text-[#737373] capitalize dark:text-gray-300">
                {senderPhoneNumber}
            </td>
            <td className="py-2 px-4 text-[#737373] dark:text-gray-300">{senderEmail}</td>
            <td className="py-2 px-4 text-[#737373] dark:text-gray-300">{amount}</td>
            <td className="py-2 px-4 text-[#737373] dark:text-gray-300">{adminProfit + agentProfit || 0}</td>
            <td className="py-2 px-4 text-[#737373]">
                <button className={`font-bold text-[1rem] capitalize btn text-white ${status == "accepted" ? 'bg-green-600' : status == "canceled" ? 'bg-red-600' : 'bg-sky-500'}`}>{status}</button>
            </td>
            <td className="py-2 px-4 text-[#737373] dark:text-gray-300">{txId}</td>
            <td className="py-2 px-4 text-[#737373] dark:text-gray-300 capitalize">{type}</td>
            <td className="py-2 px-4 text-[#737373] dark:text-gray-300">{timestamp}</td>
        </tr>
    )
}

export default AgentTransactionCard