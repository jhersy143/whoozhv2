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
export default function Debateroom() {
  interface Comment {
    comment: string;
    createdAt:string;
    type:string;
    postID:string;
    user: {
      firstname: string;
      lastname: string;
      email:string;
      avatar:string;
    };
    
  }
  const [isGreenActive,setisGreenActive] = useState(true);
  const params = useParams();
  const router = useRouter();
  const [commentCount, setCommentCount] = useState(0);
  const [countPros, setcountPros] = useState(0);
  const [countCons, setcountCons] = useState(0);
  const changeActiveComments = ()=>{
    setisGreenActive(!isGreenActive);
  }
  const [userID, setUserID] = useState<string|null>(null);
  const[posts, setPosts] = useState<any>(null);
  const[prosComments, setprosComments] = useState<any>([]);
  const[consComments, setconsComments] = useState<any>(null);
  //const postID = params?.postID as string
  const SearchParams = useSearchParams();
  const postID = SearchParams?.get('postID');
  useEffect(() => {
    setUserID(localStorage.getItem('userID'));
  },[])
  useEffect(() => {
  
    const getPosts = async () => {
      if(postID){

        const post = await PostByID(postID);
        if(post){
          setPosts(post);
        }
    
     
        const commentCount = await countComment(postID);
        setCommentCount(commentCount);

        const prosCount = await countChoice(postID,"pros");
        setcountPros(prosCount);

        const consCount = await countChoice(postID,"cons");
        setcountCons(consCount);

        const pros = await CommentByPostID(postID,"pros")
        setprosComments(pros)

        const cons = await CommentByPostID(postID,"cons")
        setconsComments(cons)

        console.log(pros);
      }
      
    }
    
    getPosts();

  }, [postID]);
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
              <h2 className="font-semibold text-white">{`${posts?.user.firstname} ${posts?.user.lastname}`}</h2>
              <p className="text-sm text-gray-400">1 min</p>
            </div>
          </div>

          {/* Question */}
          <div className="space-y-4">
            <h1 className="text-2xl font-semibold">
              {`${posts?.content}`}
            </h1>
            
            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                <span>{commentCount}</span>
              </div>
              <div className="flex items-center gap-2">
                <CirclePlus className="h-4 w-4" />
                <span>{countPros}</span>
              </div>
              <div className="flex items-center gap-2">
                <CirclePlus className="h-4 w-4" />
                <span>{countCons}</span>
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
          <div className="grid lg:grid-cols-6 gap-4 h-[450px] min-[320px]:grid-cols-4 md:grid-cols-4">
            {/* Green Comments */}
            {
              prosComments && prosComments.length > 0 && prosComments.map((comment:Comment) =>(
                <div className = {`${isGreenActive?"":"md:hidden"} lg:block space-y-4 md:col-span-4 lg:col-span-2 min-[320px]:col-span-4`}>
                  <CommentCard 
                    firstname = {comment.user.firstname}
                    lastname = {comment.user.lastname}
                    comment = {comment.comment}
                    time = {comment.createdAt}
                    postID = {comment.postID}
                    />
             
            </div>
              )
            )
            }
           

            {/* Red Comments */}
            <div className = {`${isGreenActive?"md:hidden":""} lg:block space-y-4 md:col-span-4 lg:col-span-2 min-[320px]:col-span-4`}>
            {
              consComments && consComments.length > 0 && consComments.map((comment:Comment) =>(
            <CommentCard 
                    firstname = {comment.user.firstname}
                    lastname = {comment.user.lastname}
                    comment = {comment.comment}
                    time = {comment.createdAt}
                    postID = {comment.postID}
                    />
                 )    
              )      
            }
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