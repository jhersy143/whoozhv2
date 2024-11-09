'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, CirclePlus, CircleMinus, ThumbsUp, ThumbsDown,Play} from "lucide-react"
import { useState } from "react"
import { styles } from '@/app/pages/style'
export default function Component() {
  const [isGreenActive,setisGreenActive] = useState(true);
  const changeActiveComments = ()=>{
    setisGreenActive(!isGreenActive);
  }
  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <div className="grid md:grid-cols-[250px_1fr]">
        {/* Sidebar */}
        <div className="p-4 border-r border-gray-800">
          <h1 className="text-2xl font-bold mb-8">Debates</h1>
          
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-sm font-semibold text-gray-400">Joined</h2>
              <div className="space-y-1">
                <Button variant="ghost" className="w-full justify-start text-sm">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Should cell phones be...
                </Button>
                <Button variant="ghost" className="w-full justify-start text-sm">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Should genetically mo...
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-sm font-semibold text-gray-400">Your Debates</h2>
              <div className="space-y-1">
                <Button variant="ghost" className="w-full justify-start text-sm">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Should cell phones be...
                </Button>
                <Button variant="ghost" className="w-full justify-start text-sm">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Should genetically mo...
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src="/placeholder.svg" alt="Jhersy Fernandez" />
              <AvatarFallback>JF</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-semibold text-white">Jhersy Fernandez</h2>
              <p className="text-sm text-gray-400">1 min</p>
            </div>
          </div>

          {/* Question */}
          <div className="space-y-4">
            <h1 className="text-2xl font-semibold">
              Should genetically modified organisms (GMOs) be banned from agriculture?
            </h1>
            
            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                <span>100</span>
              </div>
              <div className="flex items-center gap-2">
                <CirclePlus className="h-4 w-4" />
                <span>100</span>
              </div>
              <div className="flex items-center gap-2">
                <CirclePlus className="h-4 w-4" />
                <span>100</span>
              </div>
            </div>
          </div>

          {/* Yes/No Section */}
          <div className="grid lg:grid-cols-6  gap-px min-[320px]:grid-cols-4 md:grid-cols-4">
            <div className={`${isGreenActive?styles.greenCommentActive:""}  p-4 flex items-center gap-3 md:col-span-2 lg:col-span-2 min-[320px]:col-span-2 text-[#416F5F] lg:border-none`} onClick={isGreenActive?()=>{}:changeActiveComments}>
              <CirclePlus className="h-6 w-6  "/>
              <span className="ttext-xl font-bold ">YES</span>
            </div>
            <div className={`${!isGreenActive?styles.redCommentActive:""}  p-4 flex items-center gap-3 md:col-span-2 lg:col-span-2 min-[320px]:col-span-2 text-[#6F4141] lg:border-none`} onClick={!isGreenActive?()=>{}:changeActiveComments}>
              <CircleMinus className="h-6 w-6 text-red-400" />
              <span className="text-red-400 text-xl font-bold ">NO</span>
            </div>
          </div>

          {/* Comments Section */}
          <div className="grid grid-cols-6 gap-4 h-[450px] min-[320px]:grid-cols-4 md:grid-cols-4">
            {/* Green Comments */}
            <div className = {`${isGreenActive?"":"hidden"} space-y-4 md:col-span-4 lg:col-span-2 min-[320px]:col-span-4`}>
              <Card className="bg-[#416F5F] ">
                <div className="p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="/placeholder.svg" alt="Jhersy Fernandez" />
                      <AvatarFallback>JF</AvatarFallback>
                    </Avatar>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-white">Jhersy Fernandez</span>
                      <span className="text-xs text-gray-400">1 min</span>
                    </div>
                  </div>
                  <p className="text-sm text-white">
                    Should genetically modified organisms (GMOs) be banned from agriculture?
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

              <Card className="bg-[#416F5F]">
                <div className="p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="/placeholder.svg" alt="Jhersy Fernandez" />
                      <AvatarFallback>JF</AvatarFallback>
                    </Avatar>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-white">Jhersy Fernandez</span>
                      <span className="text-xs text-gray-400">1 min</span>
                    </div>
                  </div>
                  <p className="text-sm text-white">Bullshit</p>
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
            </div>

            {/* Red Comments */}
            <div className = {`${isGreenActive?"hidden":""} space-y-4 md:col-span-4 lg:col-span-2 min-[320px]:col-span-4`}>
              <Card className="bg-[#6F4141]">
                <div className="p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="/placeholder.svg" alt="Jhersy Fernandez" />
                      <AvatarFallback>JF</AvatarFallback>
                    </Avatar>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-white">Jhersy Fernandez</span>
                      <span className="text-xs text-gray-400">1 min</span>
                    </div>
                  </div>
                  <p className="text-sm text-white">
                    Should genetically modified organisms (GMOs) be banned from agriculture?
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
            </div>
          </div>

          {/* Comment Input */}
          <div className=" grid grid-cols-6">
            <div className="col-span-6  relative">
              <Input 
                placeholder="Comment Here" 
                className="bg-gray-200 text-gray-900 border-0 pr-12"
              />
               <Button 
              size="sm" 
              className="absolute right-1 top-1 p-1"
              variant="ghost"
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
        </div>
      </div>
    </div>
  )
}