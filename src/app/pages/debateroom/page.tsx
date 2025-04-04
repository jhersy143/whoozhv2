'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { MessageCircle, CirclePlus, CircleMinus} from "lucide-react"
import { useState, useEffect } from "react"
import { styles } from '@/app/pages/style'
import { PostByID, countComment, countChoice, CommentByPostID, getPostByUserID, getAllJoinedByUserID } from "@/hooks/useFetchData"
import { useSearchParams  } from "next/navigation"
import  CommentCard  from "@/components/ui/comment"
import AddComment from  "@/components/ui/addComment"
import DebateList from "@/components/ui/debateList"
import { useSelector } from "react-redux"
import { RootState } from "@/GlobalRedux/store"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
export default function Debateroom() {
  interface Comment {
    comment: string;
    createdAt:string;
    type:string;
    id:string;
    audioUrl:string;
    user: {
      firstname: string;
      lastname: string;
      email:string;
      avatar:string;
    };
    
  }
  type Joined = {
     id: string;
    post:{
        id:string
        content:string;
    }
  }
  type Post = {
    id: string;
    content:string;
 }
  const [isGreenActive,setisGreenActive] = useState(true);
  const [commentCount, setCommentCount] = useState(0);
  const [countPros, setcountPros] = useState(0);
  const [countCons, setcountCons] = useState(0);
  const changeActiveComments = ()=>{
    setisGreenActive(!isGreenActive);
  }
  const [userID, setUserID] = useState<string|null>(null);
  const[posts, setPosts] = useState<any>(null);
  const[joined,setJoined] = useState<any>(null);
  const[yourPost, setYourpost] = useState<any>(null); 
  const[prosComments, setprosComments] = useState<any>([]);
  const[consComments, setconsComments] = useState<any>(null);
  const reload = useSelector((state:RootState) => state.commentModalSlice.reload);

  //const postID = params?.postID as string
  const SearchParams = useSearchParams();
  const postID = SearchParams?.get('postID');
  const router = useRouter();
  useEffect(() => {
    setUserID(localStorage.getItem('userID'));
  
  },[])
  const handleLeave = async() =>{
    try {
      const addUser = await fetch('http://localhost:3000/api/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            mutation {
              leaveDebate(
                postID: "${postID}", 
               
              ) {
                id
              
              }
            }
          `,
        }),
      });
      const result = await addUser.json();
      console.log(result)
      router.push(`/pages/debateroom?postID=${postID}`)
      return result;
    } catch (error) {
        return error;
    }
  
 
  }
  useEffect(() => {
  
    const getPosts = async () => {
      if(postID){

        const post = await PostByID(postID);
        console.log(post)
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
   
        if(userID){
          const joinedList = await getAllJoinedByUserID(userID);
          setJoined(joinedList);
       
          const yourPostlist = await getPostByUserID(userID)
          setYourpost(yourPostlist);

        }
     
     
      }
      
    }
    
    getPosts();

  }, [userID,postID,reload]);
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
                {
                
               joined && joined.length > 0 && joined.map((joined:Joined)=>(
                  <DebateList
                  key = {joined.id}
                  content = {joined.post.content}
                  postID = {joined.post.id}
                  />
                ))
                
              }
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-sm font-semibold text-gray-400">Your Debates</h2>
              <div className="space-y-1">
                {
                 yourPost && yourPost.length > 0 && yourPost.map((post:Post)=>(
                    <DebateList
                        key = {joined.id}
                        postID = {post.id}
                        content= {post.content}
                    />

                  ))
                }
               
              </div>
            </div>
            <div className="flex items-center p-0 m-0 "> 
                {
                  userID !== posts?.user.id?<Button type="button" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white p-0 m-0 h-8 w-8" onClick={handleLeave}>
                  Leave
                </Button>:<></>
                }
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
          <div className="space-y-4 flex gap-2">
            <div className="flex flex-col gap-4  ">
                <h1 className="text-2xl font-semibold text-wrap">
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
            
        
          </div>

          {/* Yes/No Section */}
          <div className="grid lg:grid-cols-6  gap-px min-[320px]:grid-cols-4 md:grid-cols-4">
            <div className={`${isGreenActive?styles.greenCommentActive:""}  p-4 flex items-center gap-3 md:col-span-2 lg:col-span-2 min-[320px]:col-span-2 text-[#416F5F] lg:border-none`} onClick={isGreenActive?()=>{}:changeActiveComments}>
              <CirclePlus className="h-6 w-6  "/>
              <span className="text-xl font-bold ">{posts?.pros}</span>
            </div>
            <div className={`${!isGreenActive?styles.redCommentActive:""}  p-4 flex items-center gap-3 md:col-span-2 lg:col-span-2 min-[320px]:col-span-2 text-[#6F4141] lg:border-none`} onClick={!isGreenActive?()=>{}:changeActiveComments}>
              <CircleMinus className="h-6 w-6" />
              <span className= "text-xl font-bold ">{posts?.cons}</span>
            </div>
          </div>

          {/* Comments Section */}
          <div className="grid lg:grid-cols-6 gap-4 h-[450px] min-[320px]:grid-cols-4 md:grid-cols-4 overflow-y-scroll">
            <div className = {`${isGreenActive?"":"md:hidden"} lg:block space-y-4 md:col-span-4 lg:col-span-2 min-[320px]:col-span-4`} >
              {/* Green Comments */}
              {
                prosComments && prosComments.length > 0 && prosComments.map((comment:Comment,index:number) =>(
                
                    <CommentCard key = {index}
                      firstname = {comment.user.firstname}
                      lastname = {comment.user.lastname}
                      comment = {comment.comment}
                      time = {comment.createdAt}
                      commentID = {comment.id}
                      type = "pros"
                      userid ={posts?.user.id}
                      postID= {posts?.id}
                      audioUrl = {comment.audioUrl}
                      />
              
            
                )
              )
            }
             </div>   

            {/* Red Comments */}
              <div className = {`${isGreenActive?"md:hidden":""} lg:block space-y-4 md:col-span-4 lg:col-span-2 min-[320px]:col-span-4`} >
                    {
                          
                      consComments && consComments.length > 0 && consComments.map((comment:Comment) =>(
                      
                          <CommentCard key ={comment.id}
                              firstname = {comment.user.firstname}
                              lastname = {comment.user.lastname}
                              comment = {comment.comment}
                              time = {comment.createdAt}
                              commentID = {comment.id}
                              type = "cons"
                              userid ={posts?.user.id}
                              postID= {posts?.id}
                              audioUrl = {comment.audioUrl}
                              />
                        
                        )    
                      )      
            
                    }
              </div>
            </div>
        

            {/* Comment Input */}
                  {
                  postID && 
                  <AddComment 
                    postID={postID} 
                    userid ={posts?.user.id}
                  />
                  }
            </div>
        </div>
      </div>
  
  )
}