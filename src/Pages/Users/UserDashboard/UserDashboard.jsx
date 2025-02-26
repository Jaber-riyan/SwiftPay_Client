import React from 'react'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import UserTransactions from './UserTransactions/UserTransactions'

function UserDashboard() {
  return (
    <div>
      <div className="dark:bg-zinc-800 bg-white pt-28 min-h-[90vh]">
        <div className='md:w-[87%] mx-auto w-[90%]'>
          <div>
            <div>
              <h2 className="text-4xl font-bold cinzel-font dark:text-zinc-300 text-zinc-700 text-center mb-6 underline"></h2>
            </div>
            <section>
              <Tabs>
                <TabList className="flex space-x-4 justify-center mb-10">
                  <Tab
                    className="py-2 px-4 cursor-pointer focus:outline-none uppercase font-bold dark:text-white text-zinc-700"
                    selectedClassName="py-2 px-4 cursor-pointer border-b-4 border-[#BB8506] text-[#BB8506] dark:border-[#BB8506] dark:text-[#BB8506]"
                  >
                    Transactions
                  </Tab>
                </TabList>
                <TabPanel>
                  <UserTransactions></UserTransactions>
                </TabPanel>
              </Tabs>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDashboard