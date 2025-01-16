'use client'
import { Button } from "@/components/ui/button"
import { MessageCircle} from "lucide-react"

export default function DebateList({content}:{content:string}){

    return(
        <Button variant="ghost" className="w-full justify-start text-sm">
        <MessageCircle className="h-4 w-4 mr-2" />
        {content} asdasd
      </Button>

    )
}