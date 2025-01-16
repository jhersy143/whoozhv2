'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, CirclePlus, CircleMinus} from "lucide-react"
import { useState, useEffect } from "react"
import { styles } from '@/app/pages/style'
import { PostByID, countComment, countChoice, CommentByPostID } from "@/hooks/useFetchData"
import { useParams, useRouter, useSearchParams  } from "next/navigation"
import  CommentCard  from "@/components/ui/comment"
import { getJoinedByUserID } from "@/hooks/useFetchData"
export default function AddComment({postID}:{postID:string}){
    const [commentText,setCommentText] = useState('')
    const [userJoined,setUserJoined] = useState<any[]>([]);
    const [choice, setChoice] = useState('')
    const [userID, setUserID] = useState<string|any>("");
  
     useEffect(() => {
          setUserID(localStorage.getItem('userID'));
        },[])
    useEffect( ()=>{
          const fetchData = async () => {
            const joined = await getJoinedByUserID(userID, postID);
            setChoice(joined?.choice ?? null);
      
          }

          fetchData()

    },[commentText])
    const handleComment = async() =>{
        const addComment = await fetch('http://localhost:3000/api/graphql', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              query: `
                  mutation {
                      addComment(
                          userID: "${userID}", 
                          postID: "${postID}", 
                          comment: "${commentText}", 
                          type: "${choice}",
                      
                      
                      ) {
                          id
                          userID
                          postID
                          comment
                          type
                        
                      }
                  }
              `,
          }),
      });
       const result = await addComment.json();
       console.log(result)
      }
    return (
        <div className=" grid grid-cols-6">
            <div className="col-span-4  relative">
          
              <Input 
                placeholder="Comment Here" 
                className="bg-gray-200 text-gray-900 border-0 pr-12"
                onChange={(e)=>{setCommentText(e.target.value)}}
              />
               <Button 
              size="sm" 
              className="absolute right-1 top-1 p-1"
              variant="ghost"
              onClick={handleComment}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="w-4 h-4 text-blue-500"
              >
                <path
                  d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
            </div>
           
           
          </div>
    )
}