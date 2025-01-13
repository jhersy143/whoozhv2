'use client'
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"
import React, { useState, useEffect } from "react"
import { ThumbsUp, ThumbsDown,Play } from "lucide-react"
import { useRouter,useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useDispatch } from "react-redux"
import { showModal } from "@/GlobalRedux/Features/showModalSlice";
import { Card } from "@/components/ui/card"
import  Choices  from "@/components/modals/choices";
import Link from 'next/link';
import { timeAgo } from "@/utils/dateCalculation"
import { getCountReaction, getReactionByUserID } from "@/hooks/useFetchData";
import { AiFillLike } from "react-icons/ai";
import { BiSolidDislike } from "react-icons/bi";
import e from "cors"
export default function CommentCard({ firstname, lastname, comment, time, commentID }: { firstname: string; lastname: string; comment: string, time: string,  commentID: string }) {
  

  const [userID, setUserID] = useState<string|any>("");
  const router = useRouter()
  const[countLike, setCountLike] = useState(0);
  const[countDislike, setCountDislike] = useState(0);
  const[consComments, setconsComments] = useState(0);
  const[countReaction, setCountReaction] = useState<any[]>([]);;
  const[reaction, setReaction] = useState<string|any>("");
    useEffect(() => {
      setUserID(localStorage.getItem('userID'));
    },[])
  useEffect(() => {
    const fetchData = async () => {
   
        const Likes = await getCountReaction(commentID,"LIKE");
        setCountLike(Likes);

        const DisLikes = await getCountReaction(commentID,"DISLIKE");
        setCountDislike(DisLikes);

        const react = await getReactionByUserID(commentID,userID);
        setCountReaction(react);
      
    }
    fetchData()
    }, []);

    
    
    // Example usage:
   
    
   // Output will depend on the current date and time
   

     
        const handleReaction = async (type:string) => {
          setReaction(type);
          let result = [];
          if(countReaction==null){
            const addReaction = await fetch('http://localhost:3000/api/graphql', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  query: `
                      mutation {
                          addReaction(
                              userID: "${userID}", 
                              commentID: "${commentID}", 
                              reactionType: "${type}",
                          
                          
                          ) {
                              id
                              userID
                              commentID
                              reactionType
                            
                          }
                      }
                  `,
              }),
          });
           result = await addReaction.json();
          }
          else{
            const updateReaction = await fetch('http://localhost:3000/api/graphql', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  query: `
                      mutation {
                          updateReaction(
                              userID: "${userID}", 
                              commentID: "${commentID}", 
                              reactionType: "${type}",
                          
                          
                          ) {
                              id
                              userID
                              commentID
                              reactionType
                            
                          }
                      }
                  `,
              }),
          });
           result = await updateReaction.json();
          }
        
        
        console.log(result);
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
                  {
                  reaction==="LIKE"?<AiFillLike className={`mr-1 h-4 w-4 `}/>:<ThumbsUp className={`mr-1 h-4 w-4 `} onClick = {()=>handleReaction("LIKE")}/>
                    
                  }
               
                  <span>{countLike}</span>
               
             
                 
                  {reaction==="DISLIKE"?<BiSolidDislike className={`mr-1 h-4 w-4 `}/>:<ThumbsDown className={`mr-1 h-4 w-4`}  onClick = {()=>handleReaction("DISLIKE")}/>}
                  <span>{countDislike}</span>
              
            </div>
            </div>
          </Card>
        )
      }
    