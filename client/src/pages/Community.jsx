import React, { useEffect, useState } from 'react'
import { useAuth, useUser } from '@clerk/clerk-react'
import { dummyPublishedCreationData } from '../assets/assets'
import { Heart } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Community = () => {
  const [creations, setCreations] = useState([])
  const { user } = useUser()
  const [loading, setLoading] = useState(true)
  const { getToken } = useAuth()


  const fetchCreations = async () => {
    try {
      const {data} = await axios.get('/api/user/get-published-creations', {
        headers: {Authorization: `Bearer ${await getToken()}`}
      })

      if (data.success) {
        setCreations(data.creations)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
    setLoading(false)
  }

  const imageLikeToggle = async (id)=>{
    try {
      const {data} = await axios.post('/api/user/toggle-like-creation', {id}, {
        headers : {Authorization: `Bearer ${await getToken()}`}
      })

      if(data.success){
        toast.success(data.message)
        await fetchCreations()
      }else{
        toast.error(data.message)
      }
    } catch(error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (user) {
      fetchCreations()
    }
  }, [user])

  return !loading ? (
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
                <Heart onClick={()=> imageLikeToggle(creation.id)}
                  className={`min-w-5 h-5 hover:scale-110 cursor-pointer ${creation.likes.includes(user.id) ? 'fill-red-500' : 'text-white'}`}
                />
              </div>
            </div>
          </div>


        ))}
      </div>
    </div>
  ) : (
    <div className='flex justify-center items-center h-full'>
      <span className='w-10 h-10 my-1 rounded-full border-3 border-primary border-t-transparent animate-spin'></span>
    </div>
  )
}

export default Community