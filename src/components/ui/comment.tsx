'use client'
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"
import React, { useState, useEffect, useRef } from "react"
import { ThumbsUp, ThumbsDown,Play,Pause ,Volume2, VolumeX  } from "lucide-react"

import { Card } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { timeAgo } from "@/utils/dateCalculation"
import { getCountReaction, getReactionByUserID } from "@/hooks/useFetchData";
import { AiFillLike } from "react-icons/ai";
import { BiSolidDislike } from "react-icons/bi";
import { Button } from "./button"
export default function CommentCard({ firstname, lastname, comment, time, commentID, type, userid, postID }: { firstname: string; lastname: string; comment: string, time: string,  commentID: string, type:string, userid:string, postID:string }) {
  
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const [isMuted, setIsMuted] = useState(false)
  const [userID, setUserID] = useState<string|any>("");
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const[countLike, setCountLike] = useState(0);
  const[countDislike, setCountDislike] = useState(0);
  const[countReaction, setCountReaction] = useState<unknown[]>([]);;
  const[reaction, setReaction] = useState<string|unknown>("");
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
        if(react!==null){
          setReaction(react.reactionType)
        }
    }
    fetchData()
    }, [reaction]);

    useEffect(() => {
      const audio = audioRef.current
      console.log(audio?.duration)
      if (!audio) return
  
      const setAudioData = () => {
        setDuration(audio.duration)
      }
  
      const setAudioTime = () => {
        setCurrentTime(audio.currentTime)
      }
  
      const handleEnded = () => {
        setIsPlaying(false)
        setCurrentTime(0)
      }
  
      audio.addEventListener("loadeddata", setAudioData)
      audio.addEventListener("timeupdate", setAudioTime)
      audio.addEventListener("ended", handleEnded)
  
      return () => {
        audio.removeEventListener("loadeddata", setAudioData)
        audio.removeEventListener("timeupdate", setAudioTime)
        audio.removeEventListener("ended", handleEnded)
      }
    }, [])
  
    const togglePlay = () => {
      if (isPlaying) {
        audioRef.current?.pause()
      } else {
        audioRef.current?.play()
      }
      setIsPlaying(!isPlaying)
    }
  
    const toggleMute = () => {
      if (audioRef.current) {
        audioRef.current.muted = !isMuted
        setIsMuted(!isMuted)
      }
    }
  
    const handleVolumeChange = (newVolume: number[]) => {
      const volumeValue = newVolume[0]
      setVolume(volumeValue)
      if (audioRef.current) {
        audioRef.current.volume = volumeValue
        if (volumeValue === 0) {
          setIsMuted(true)
          audioRef.current.muted = true
        } else if (isMuted) {
          setIsMuted(false)
          audioRef.current.muted = false
        }
      }
    }
  
    const handleProgressChange = (newTime: number[]) => {
      const timeValue = newTime[0]

      setCurrentTime(timeValue)
      console.log(audioRef);
      if (audioRef.current) {
        audioRef.current.currentTime = timeValue
      }
    }
  
    const formatTime = (time: number) => {
      const minutes = Math.floor(time / 60)
      const seconds = Math.floor(time % 60)
      return `${minutes}:${seconds.toString().padStart(2, "0")}`
    }
  
    
    // Example usage:
   
    
   // Output will depend on the current date and time
   

     
        const handleReaction = async (type:string) => {
          setReaction(type);
          let result = [];
          const addNotif = await fetch('http://localhost:3000/api/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `
                    mutation {
                            addNotification(
                            recipientID: "${userID}",
                            initiatorID:"${userid}", 
                            postID: "${postID}", 
                            description:"Reacted to your Comment",
                            is_seen:false
                         
                        ) {
                            id
                            recipientID
                            initiatorID
                            postID
                            description
                            is_seen
                            
                        }
                      }
                    
                `,
            }),
        });
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
            <Card className={`${type=="pros"?"bg-[#416F5F]":"bg-[#6F4141]"}`}>
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
              <div className="rounded-lg p-4 space-y-2">
                    
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20"
                  onClick={togglePlay}
                >
                  {isPlaying ? (
                    <div className="rounded-[100%] bg-black white h-8 w-8 text-justify text-white">
                    <Pause className="h-4 w-4 mt-2 ml-2"  />
                    </div>
                  ) : (
                    <div className="rounded-[100%] bg-black white h-8 w-8 text-justify text-white">
                    <Play className="h-4 w-4 mt-2 ml-2" />
              
                  </div>
                  )}
              <span className="sr-only">{isPlaying ? "Pause" : "Play"}</span>
                </Button>
                    <div className="flex-grow">
                      <Slider
                        value={[currentTime]}
                        max={duration || 100}
                        step={0.1}
                        onValueChange={handleProgressChange}
                        className="cursor-pointer"
                      />
                    </div>
                
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={toggleMute} className="text-gray-400 hover:text-white">
                      {isMuted || volume === 0 ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                      <span className="sr-only">{isMuted ? "Unmute" : "Mute"}</span>
                    </Button>
                    <Slider
                      value={[isMuted ? 0 : volume]}
                      max={1}
                      step={0.01}
                      onValueChange={handleVolumeChange}
                      className="w-24 cursor-pointer"
                    />
                   <audio ref={audioRef} src={`/audios/audio-1740572927128.mp3`} />
                  </div>
            </div>
              <div className="flex items-center space-x-2 mt-2 text-white">
            
                  {
                  reaction==="LIKE"?<AiFillLike className={`mr-1 h-4 w-4 `}/>:<ThumbsUp className={`mr-1 h-4 w-4 `} onClick = {()=>handleReaction("LIKE")}/>
                    
                  }
                  <span>{countLike}</span>
               
             
                 
                  {

                  reaction==="DISLIKE"?<BiSolidDislike className={`mr-1 h-4 w-4 `}/>:<ThumbsDown className={`mr-1 h-4 w-4`}  onClick = {()=>handleReaction("DISLIKE")}/>
                  
                  }
                  <span>{countDislike}</span>
              
            </div>
            </div>
            
          </Card>
        )
      }
    