'use client'
import React, { useState, useEffect } from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import DebateCard  from "@/components/ui/debatecard"
import { showModal } from "@/GlobalRedux/Features/showModalSlice";
import Createdebate from "@/components/modals/createdebate"
import { useDispatch } from "react-redux"
import { useRouter } from "next/navigation"
import TrendingDebate from "@/components/ui/trendingdebate"
import { getAllPost, TopPosts, searchPostsByContent } from "@/hooks/useFetchData"
import { Input } from "@/components/ui/input"
//type CallBack<T= void, R = void> = (arg:T)=>R;

export default function Homepage() {
  const router = useRouter()
  const dispatch = useDispatch();
  const [userID, setUserID] = useState<string|null>(null);
  const[posts, setPost] = useState<any[]>([]);
  const[topPosts,setTopPosts] = useState<any[]>([]);
  const [text,setText] = useState<string>("");
  useEffect(() => {
    setUserID(localStorage.getItem('userID'));
  },[])
  useEffect(() => {
    const fetchData = async () => {
      if(userID){
        console.log(userID)
        const userPosts = await getAllPost(userID);
        setPost(userPosts);
 
      }
    
    
    }
    const getTopPosts = async () => {
      const top = await TopPosts();
      setTopPosts(top);
 
    }
    
    fetchData()
    getTopPosts()
  
  }, [userID]);
  const handleShowCreate = (modalname:string)=>{
    dispatch(showModal({modalname:modalname}));
    
  }
  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("hi");

     if (router) {
      router.push('/pages/debateroom'); // Ensure router is not null before using it
    }
    else{
      console.log("error")
    }
   
    // Handle form submission logic here
  }
  const hanldeSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    const userPosts  = await searchPostsByContent(text);
    console.log(userPosts);
    setPost(userPosts);
  }
  return (
    <div className="flex bg-gray-900 text-white overflow-y-scroll">
      <div className="container mx-auto mt-20 px-4 md:px-0 md:h-full  lg:h-screen">
        <div className="grid lg:grid-cols-7 md:grid-cols-3 gap-6 md:p-3">
          <div className="md:col-span-2 space-y-6 lg:col-span-3 lg:col-start-2 lg:col-end-5">
            <div className=" relative">
                <Input
                  placeholder="Search..."
                  className="bg-gray-200 text-gray-900 border-0 pr-12"
                  onChange={(e) => setText(e.target.value)}
                  value={text} // Removed loading ternary for search
                />
                <Button
                  size="sm"
                  className="absolute right-1 top-1 p-1"
                  variant="ghost"
                  onClick={hanldeSearch} // Changed to handleSearch function
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="w-4 h-4 text-blue-500"
                  >
                    <path
                      d="M10 17a7 7 0 1 0 0-14 7 7 0 0 0 0 14zm11.3 5.3l-4-4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Button>
              </div>
            <div className="flex items-center space-x-4 ">
              <Avatar className="w-12 h-12 ">
                <AvatarImage src="/placeholder.svg" alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <Button className="flex-grow bg-blue-600 hover:bg-blue-700" onClick={()=>handleShowCreate("createdebate")}>Create New</Button>
            </div>

            { 
           posts && posts.map(post => (
        
              <DebateCard
                key={post.id}
                user={`${post.user.firstname} ${post.user.lastname}`}
                time={post.createdAt} // Format the date
                question={post.content}
                postID={post.id}
                pros={post.pros}
                cons={post.cons}
                userid={post.user.id}
              />
            ))
            }
          </div>

          <div className="bg-gray-800 p-4 rounded-lg lg:col-span-2 lg:col-start-5 h-fit">
            <h2 className="text-xl font-bold mb-4">Trends</h2>
            <div className="space-y-4">
              {
                topPosts.map(post => (
                  <TrendingDebate
                  key={post.id}
                  postID={post.postID}
                  user={`${post.user.firstname} ${post.user.lastname}`}
                  time={post.createdAt} 
                  question={post.content}
                
                />
                ))
              }
             
             
             
            </div>
          </div>
        </div>
      </div>
      <Createdebate />
    </div>
  )
}


