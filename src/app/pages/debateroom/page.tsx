import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, Clock, Plus, Minus, ThumbsUp, ThumbsDown,Play} from "lucide-react"

export default function Component() {
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
              <h2 className="font-semibold">Jhersy Fernandez</h2>
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
                <Clock className="h-4 w-4" />
                <span>100</span>
              </div>
              <div className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                <span>100</span>
              </div>
            </div>
          </div>

          {/* Yes/No Section */}
          <div className="grid grid-cols-2 gap-px bg-gray-800">
            <div className="bg-gray-900 p-4 flex items-center gap-3">
              <Plus className="h-6 w-6" />
              <span className="text-green-400 text-xl font-bold">YES</span>
            </div>
            <div className="bg-gray-900 p-4 flex items-center gap-3">
              <Minus className="h-6 w-6" />
              <span className="text-red-400 text-xl font-bold">NO</span>
            </div>
          </div>

          {/* Comments Section */}
          <div className="grid grid-cols-2 gap-4">
            {/* Green Comments */}
            <div className="space-y-4">
              <Card className="bg-green-800/50">
                <div className="p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="/placeholder.svg" alt="Jhersy Fernandez" />
                      <AvatarFallback>JF</AvatarFallback>
                    </Avatar>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Jhersy Fernandez</span>
                      <span className="text-xs text-gray-400">1 min</span>
                    </div>
                  </div>
                  <p className="text-sm">
                    Should genetically modified organisms (GMOs) be banned from agriculture?
                  </p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Button variant="ghost" size="sm">
                      <Play className="mr-2 h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <ThumbsUp className="mr-2 h-4 w-4" />
                      100
                    </Button>
                    <Button variant="ghost" size="sm">
                      <ThumbsDown className="mr-2 h-4 w-4" />
                      100
                    </Button>
                </div>
                </div>
              </Card>

              <Card className="bg-green-800/50">
                <div className="p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="/placeholder.svg" alt="Jhersy Fernandez" />
                      <AvatarFallback>JF</AvatarFallback>
                    </Avatar>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Jhersy Fernandez</span>
                      <span className="text-xs text-gray-400">1 min</span>
                    </div>
                  </div>
                  <p className="text-sm">Bullshit</p>
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                    <span className="text-sm">100</span>
                    <span className="text-sm">100</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Red Comments */}
            <div className="space-y-4">
              <Card className="bg-red-900/50">
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
                  <div className="flex items-center gap-4 text-white">
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                    <span className="text-sm">100</span>
    
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Comment Input */}
          <div className="relative">
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
  )
}