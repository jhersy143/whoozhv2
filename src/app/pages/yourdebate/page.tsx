'use client'
import { useState } from "react"
import { Home, User, Bookmark, Bell, MessageSquare, RotateCcw, Plus, Menu, X, CirclePlus, CircleMinus } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { showModal,changemodalname } from "@/GlobalRedux/Features/showModalSlice";
import Createdebate from "@/components/modals/createdebate"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import DebateCard  from "@/components/ui/debatecard"
import {  getPostByUserID, getAllJoinedByUserID } from "@/hooks/useFetchData"
export default function Homepage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const dispatch = useDispatch();
  const [active,Setactive] = useState("yourdebate")
  const[joined,setJoined] = useState<any[]>([]);
  const[yourPost, setYourpost] = useState<any[]>([]); 
  const [userID, setUserID] = useState<string|null>(null);
  const handleShowCreate = (modalname:string)=>{
    dispatch(showModal({modalname:modalname}));
    
  }
  const handleClick = (button:string)=>{
    Setactive(button);
  }

  useEffect(() => {
    setUserID(localStorage.getItem('userID'));
  
  },[])
  useEffect(() => {
    const fetchData = async () => {
      if(userID){
        const joinedList = await getAllJoinedByUserID(userID);
        setJoined(joinedList);
        console.log(joined)
        const yourPostlist = await getPostByUserID(userID)
        setYourpost(yourPostlist);
        console.log(yourPostlist)
      }
    
    
    }
  
    
    fetchData()
  
  }, [userID]);
  return (
    <div className="flex bg-gray-900 text-white ">
   
      <div className="container mx-auto mt-20 px-4 md:px-0 md:h-full  lg:h-screen">
        <div className="grid lg:grid-cols-7 md:grid-cols-3 gap-6 md:p-3">
          <div className="md:col-span-2 space-y-6 lg:col-span-3 lg:col-start-2 lg:col-end-5">
          <div className="flex items-center space-x-4 ">
                <Button className={`${active==="yourdebate"?"border-blue-600 text-blue-600":"border-white-60"}  flex-grow bg-gray-900 hover:bg-blue-700 border-b-4 rounded-none text-lg font-semibold`} onClick={()=>handleClick("yourdebate")}>Your Debate</Button>
                <Button className={`${active==="joined"?"border-blue-600 text-blue-600":"border-white-60"}  flex-grow bg-gray-900 hover:bg-blue-700 border-b-4 rounded-none text-lg font-semibold`} onClick={()=>handleClick("joined")}>Joined</Button>
            </div>
            <div className="flex items-center space-x-4 ">
              <Avatar className="w-12 h-12 ">
                <AvatarImage src="/placeholder.svg" alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <Button className="flex-grow bg-blue-600 hover:bg-blue-700" onClick={()=>handleShowCreate("createdebate")}>Create New</Button>
            </div>
                {
                  active==="joined"?
                    <>
                      {
                       joined && joined.length > 0 && joined.map(joined => (

                          <DebateCard
                            key={joined.id}
                            user={`${joined.post.user.firstname} ${joined.post.user.lastname}`}
                            time={joined.post.createdAt} // Format the date
                            question={joined.post.content}
                            postID={joined.post.id}
                            pros={joined.post.pros}
                            cons={joined.post.cons}
                          />
                          ))
                        }
                    </>:
                    <>
                       {
                        yourPost && yourPost.length > 0 && yourPost.map(yourPost => (

                          <DebateCard
                            key={yourPost.id}
                            user={`${yourPost.user.firstname} ${yourPost.user.lastname}`}
                            time={yourPost.createdAt} // Format the date
                            question={yourPost.content}
                            postID={yourPost.id}
                            pros={yourPost.pros}
                            cons={yourPost.cons}
                          />
                        ))
                        }
                    </>
                }
                
          </div>

          <div className="bg-gray-800 p-4 rounded-lg lg:col-span-2 lg:col-start-5">
            <h2 className="text-xl font-bold mb-4">Trends</h2>
            <div className="space-y-4">
              <TrendingDebate
                user="Jhersy Fernandez"
                time="1 hour"
                question="Should cell phones be allowed in schools?"
              />
              <TrendingDebate
                user="Jhersy Fernandez"
                time="1 hour"
                question="Should genetically modified organisms (GMOs) be banned from agriculture?"
              />
              <TrendingDebate
                user="Jhersy Fernandez"
                time="1 day"
                question="Kelangan Ba Financialy stable ka bago makipagrelasyon?"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}



function TrendingDebate({ user, time, question }: { user: string; time: string; question: string }) {
  return (
    <div className="border-b border-gray-700 pb-4 last:border-b-0 last:pb-0">
      <div className="flex items-center space-x-2 mb-2">
        <Avatar className="w-8 h-8">
          <AvatarImage src="/placeholder.svg" alt={user} />
          <AvatarFallback>{user[0]}</AvatarFallback>
        </Avatar>
        <div className="flex lg:flex-row md:flex-col lg:space-x-4 lg:text-sm md:text-sm">
          <span className="font-semibold md:text-xs lg:text-base">{user}</span>
          <span className="text-gray-400 lg:text-sm md:text-xs">{time}</span>
        </div>
      </div>
      <p className="mb-2 lg:text-sm md:text-sm">{question}</p>
      <div className="flex space-x-4 lg:text-sm md:text-sm">
        <span className="flex items-center ">
          <MessageSquare className="w-4 h-4 mr-1" />
          100
        </span>
        <span className="flex items-center">
          <CirclePlus className="w-4 h-4 mr-1" />
          100
        </span>
        <span className="flex items-center">
          <CircleMinus className="w-4 h-4 mr-1" />
          100
        </span>
      </div>
      <Createdebate />
    </div>
  )
}