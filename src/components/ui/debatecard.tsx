    'use client'
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"
import React, { useState, useEffect } from "react"
import { MessageSquare, CirclePlus, CircleMinus } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import commentCount from "./commentCount"
import {countComment} from "@/hooks/useFetchData"
export default function DebateCard({ user, time, question,postID }: { user: string; time: string; question: string, postID: string}) {
  const [commentCount, setCommentCount] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      const count = await countComment(postID);
      setCommentCount(count);
    }
      
    }, []);
    function timeAgo(dateString: string): string {
        const now = new Date();
        const postDate = new Date(Number(dateString));
        const seconds = Math.floor((now.getTime() - postDate.getTime()) / 1000);
        
        let interval = Math.floor(seconds / 31536000);
        if (interval >= 1) return interval === 1 ? "1 year ago" : `${interval} years ago`;
        
        interval = Math.floor(seconds / 2592000);
        if (interval >= 1) return interval === 1 ? "1 month ago" : `${interval} months ago`;
        
        interval = Math.floor(seconds / 86400);
        if (interval >= 1) return interval === 1 ? "1 day ago" : `${interval} days ago`;
        
        interval = Math.floor(seconds / 3600);
        if (interval >= 1) return interval === 1 ? "1 hour ago" : `${interval} hours ago`;
        
        interval = Math.floor(seconds / 60);
        if (interval >= 1) return interval === 1 ? "1 minute ago" : `${interval} minutes ago`;
        console.log(postDate);
        return "just now";
    }
    
    // Example usage:
   
    
   // Output will depend on the current date and time

        const router = useRouter()
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
          <div className="bg-gray-800 p-4 rounded-lg z-0">
            <div className="flex items-center space-x-2 mb-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src="/placeholder.svg" alt={user} />
                <AvatarFallback>{user[0]}</AvatarFallback>
              </Avatar>
              <span className="font-semibold">{user}</span>
              <span className="text-gray-400 text-sm">{timeAgo(time)}</span>
            </div>
            <p className="mb-4">{question}</p>
            <div className="flex flex-wrap justify-between items-center">
              <div className="flex space-x-4 mb-2 sm:mb-0">
                <span className="flex items-center">
                  <MessageSquare className="w-5 h-5 mr-1" />
                  100
                </span>
                <span className="flex items-center">
                  <CirclePlus className="w-5 h-5 mr-1" />
                  100
                </span>
                <span className="flex items-center">
                  <CircleMinus className="w-5 h-5 mr-1" />
                  100
                </span>
              </div>
              <Button variant="secondary" onClick={handleJoin}>Join</Button>
            </div>
          </div>
        )
      }
    