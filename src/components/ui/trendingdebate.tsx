'use client'
import React, { useState, useEffect } from "react"
import { MessageSquare, CirclePlus, CircleMinus } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Createdebate from "@/components/modals/createdebate"
export default function TrendingDebate({ user, time, question }: { user: string; time: string; question: string}) {

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
  
      </div>
    )
  }