'use client'
import { useState } from "react"
import { Home, User, Bookmark, Bell, MessageSquare, RotateCcw, Plus, Menu, X } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export default function Homepage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="flex bg-gray-900 text-white ">
   
      <div className="container mx-auto mt-6 px-4 md:px-0 md:h-full  lg:h-screen">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:p-3">
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center space-x-4 ">
              <Avatar className="w-12 h-12 ">
                <AvatarImage src="/placeholder.svg" alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <Button className="flex-grow bg-blue-600 hover:bg-blue-700">Create New</Button>
            </div>

            <DebateCard
              user="Jhersy Fernandez"
              time="1 min"
              question="Should cell phones be allowed in schools?"
            />

            <DebateCard
              user="Jhersy Fernandez"
              time="1 min"
              question="Should genetically modified organisms (GMOs) be banned from agriculture?"
            />
          </div>

          <div className="bg-gray-800 p-4 rounded-lg">
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

function DebateCard({ user, time, question }: { user: string; time: string; question: string }) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg z-0">
      <div className="flex items-center space-x-2 mb-2">
        <Avatar className="w-8 h-8">
          <AvatarImage src="/placeholder.svg" alt={user} />
          <AvatarFallback>{user[0]}</AvatarFallback>
        </Avatar>
        <span className="font-semibold">{user}</span>
        <span className="text-gray-400 text-sm">{time}</span>
      </div>
      <p className="mb-4">{question}</p>
      <div className="flex flex-wrap justify-between items-center">
        <div className="flex space-x-4 mb-2 sm:mb-0">
          <span className="flex items-center">
            <MessageSquare className="w-5 h-5 mr-1" />
            100
          </span>
          <span className="flex items-center">
            <RotateCcw className="w-5 h-5 mr-1" />
            100
          </span>
          <span className="flex items-center">
            <Plus className="w-5 h-5 mr-1" />
            100
          </span>
        </div>
        <Button variant="secondary">Join</Button>
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
          <RotateCcw className="w-4 h-4 mr-1" />
          100
        </span>
        <span className="flex items-center">
          <Plus className="w-4 h-4 mr-1" />
          100
        </span>
      </div>
    </div>
  )
}