'use client'
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"
import React, { useState, useEffect } from "react"
import { ThumbsUp, ThumbsDown,Play } from "lucide-react"
import { useRouter,useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import {countComment, countChoice, getcountJoined} from "@/hooks/useFetchData"
import { useDispatch } from "react-redux"
import { showModal } from "@/GlobalRedux/Features/showModalSlice";
import { Card } from "@/components/ui/card"
import  Choices  from "@/components/modals/choices";
import Link from 'next/link';
import { timeAgo } from "@/utils/dateCalculation"
import { CommentByPostID } from "@/hooks/useFetchData";
export default function CommentCard({ firstname, lastname, comment, time, postID }: { firstname: string; lastname: string; comment: string, time: string,  postID: string }) {
  

  const [userID, setUserID] = useState<string|any>("");
  const router = useRouter()
  const[prosComments, setprosComments] = useState<any>(null);
  const[consComments, setconsComments] = useState<any>(null);
  const dispatch = useDispatch();
    useEffect(() => {
      setUserID(localStorage.getItem('userID'));
    },[])
  useEffect(() => {
    const fetchData = async () => {
   

    }
    fetchData()
    }, []);
 
      const routeToDebateroom = ()=>{
        router.push(`/pages/debateroom?postID=${postID}`)
      }
    
    
    // Example usage:
   
    
   // Output will depend on the current date and time

     
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
        return (
            <Card className="bg-[#416F5F] ">
            <div className="p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="/placeholder.svg" alt="Jhersy Fernandez" />
                  <AvatarFallback>JF</AvatarFallback>
                </Avatar>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-white">{`${firstname} ${lastname}`}</span>
                  <span className="text-xs text-gray-400">{timeAgo(time)}</span>
                </div>
              </div>
              <p className="text-sm text-white">
                {comment}
              </p>
              <div className="flex items-center space-x-2 mt-2 text-white">
                <div className="rounded-[100%] bg-black white h-8 w-8 text-justify ">
                  <Play className="h-4 w-4 mt-2 ml-2" />
                </div>
                
                  <ThumbsUp className="mr-1 h-4 w-4" />
                  <span>100</span>
               
             
                  <ThumbsDown className="mr-1 h-4 w-4" />
                  <span>100</span>
              
            </div>
            </div>
          </Card>
        )
      }
    