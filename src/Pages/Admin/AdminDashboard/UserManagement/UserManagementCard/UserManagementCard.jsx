import React from 'react'

export default function UserManagementCard({ user, index, handleBlock, handleUnblock, setIsOpen, getData }) {
    const { name, email, phoneNumber, nid, role, block, status,balance } = user
    return (
        <tr className="border-b border-gray-300 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800">
            <td className='p-5 font-bold text-xl dark:text-white'>{index + 1}</td>
            <td onClick={() => {
                setIsOpen(true)
                getData(user)
            }} className="py-2 px-4 text-[#737373] capitalize dark:text-gray-300">
                {name}
            </td>
            <td className="py-2 px-4 text-[#737373] dark:text-gray-300">{email}</td>
            <td className="py-2 px-4 text-[#737373] dark:text-gray-300">{nid}</td>
            <td className="py-2 px-4 text-[#737373] dark:text-gray-300">{balance}</td>
            <td className="py-2 px-4 text-[#737373] dark:text-gray-300 capitalize">{status || "complete"}</td>
            <td className="py-2 px-4 text-[#737373] dark:text-gray-300 capitalize">{role}</td>
            <td className="py-2 px-4 text-[#737373]">
                <button onClick={() => handleBlock(user)} disabled={block === true} className={`font-bold text-[1rem] capitalize btn bg-red-600 text-white disabled:bg-gray-500`}>Block</button>
            </td>
            <td className="py-2 px-4 text-[#737373]">
                <button onClick={() => handleUnblock(user)} disabled={block === false} className={`font-bold text-[1rem] capitalize btn bg-green-600 text-white disabled:bg-gray-500`}>Unblock</button>
            </td>
        </tr>
    )
}
