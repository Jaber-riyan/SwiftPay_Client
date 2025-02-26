import { useQuery } from '@tanstack/react-query'
import React from 'react'
import UseAxiosSecure from '../UseAxiosSecureAndNormal/UseAxiosSecure'

function UseAgents() {
    const axiosInstanceSecure = UseAxiosSecure()

    const { data: agents, refetch: agentsRefetch, isLoading: agentsLoading } = useQuery({
        queryKey: ['agents'],
        queryFn: async () => {
            const { data } = await axiosInstanceSecure.get('/verified-agents')
            return data.data
        }
    })

    return { agents, agentsRefetch, agentsLoading }
}

export default UseAgents