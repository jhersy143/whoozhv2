'use client'
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"
import React, { useState, useEffect } from "react"
import { MessageSquare, CirclePlus, CircleMinus } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {countComment} from "@/hooks/useFetchData"
export default function commentCount({ postID }: { postID: string;}) {
  const [commentCount, setCommentCount] = useState(0)
  useEffect(() => {
    const fetchData = async () => {
      const count = await countComment(postID);
      setCommentCount(count);

      
    }

  
   
  }, []);
        return (
          
                <span className="flex items-center">
                  <MessageSquare className="w-5 h-5 mr-1" />
                 {commentCount}
                </span>
             
               
        )
      }
    