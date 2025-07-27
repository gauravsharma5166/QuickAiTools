import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-react'
import { dummyPublishedCreationData } from '../assets/assets'
import { Heart } from 'lucide-react'

const Community = () => {
  const [creations, setCreations] = useState([])
  const { user } = useUser()

  const fetchCreations = async () => {
    setCreations(dummyPublishedCreationData)
  }

  useEffect(() => {
    if (user) {
      fetchCreations()
    }
  }, [user])

  return (
    <div className="flex-1 h-full flex flex-col gap-4 p-6">
      <h1 className="text-lg font-semibold">Creations</h1>
      <div className="bg-white w-full rounded-xl overflow-y-scroll p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-auto">
        {creations.map((creation, index) => (
          <div key={index} className="group relative overflow-hidden rounded-lg shadow-md">
            <img
              src={creation.content}
              alt=""
              className="w-full h-64 object-cover"
            />

            {/* Bottom Caption */}
            <div className="absolute inset-x-0 bottom-0 bg-black/70 text-white px-3 py-2 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <p className="text-sm truncate max-w-[70%]">{creation.prompt}</p>
              <div className="flex items-center gap-1">
                <span>{creation.likes.length}</span>
                <Heart
                  className={`min-w-5 h-5 hover:scale-110 cursor-pointer ${creation.likes.includes(user.id) ? 'fill-red-500' : 'text-white'
                    }`}
                />
              </div>
            </div>
          </div>


        ))}
      </div>
    </div>
  )
}

export default Community