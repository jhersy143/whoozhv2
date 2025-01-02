import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '@/GlobalRedux/Features/showModalSlice';
import type { RootState } from '@/GlobalRedux/store'
import { getPostByID } from '@/hooks/useFetchData'
export default function choices({postID, question, pros, cons }:{postID:string, question: string, pros: string, cons: string}) {
  const [content, setContent] = useState('')

  const dispatch = useDispatch()
  const [post, setPost] = useState<any[] | null>(null);
  const [userID, setUserID] = useState<string | null>(null);
  const modalname = useSelector((state: RootState)=>state.modalSlice.modalname)
  const showModal = useSelector((state: RootState)=>state.modalSlice.showmodal)
  useEffect(()=>{
  
    setUserID(localStorage.getItem('userID'))
   
  },[])
  useEffect(()=>{

    const fetchPost = async (postID:string) => {
      const postbyID = await getPostByID(postID);
      setPost(postbyID) 
      console.log(postbyID)
    }
    fetchPost(postID);
  },[])
  const handleSubmit = async (e: React.FormEvent, choice:string) => {
    e.preventDefault()
    // Handle form submission logic here
    const addAccount = await fetch('http://localhost:3000/api/graphql', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          query: `
              mutation {
                      addChoice(
                      userID: "${userID}", 
                      postID: "${postID}", 
                      choice:"${choice}"
                   
                  ) {
                      id
                      userID
                      postID
                      choice
                      
                  }
                }
              
          `,
      }),
  });
 console.log(addAccount)
  }
  const handleCloseCreate = (e: React.FormEvent) =>{
    e.preventDefault()
    dispatch(closeModal());
  }

 // handle closing the modal when clicking around it 
  const handleOutsideClick = (e: MouseEvent) => {
    const target = e.target as Element;
    if (!target.closest('#modal')) {
      dispatch(closeModal());
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [showModal]);

  return (
    <div className={`${showModal&&modalname==="joindebate"?"flex":"hidden"}  fixed inset-0 bg-black bg-opacity-50 items-center justify-center p-4 z-50`}>
      <div className="bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6 relative " id = "modal">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Please Choose</h2>
          <button className="text-gray-400 hover:text-gray-200" aria-label="Close" onClick={handleCloseCreate}>
            <X size={24} />
          </button>
        </div>
        <form  className="space-y-4">
          <div>
          <h3 className=" font-bold text-white">{question}</h3>
          </div>
       
        
          <div className="flex space-x-4">
            <Button type="button" className="flex-1 bg-green-600 hover:bg-green-700 text-white" onClick={(e)=>handleSubmit(e,"pros")}>
              {pros}
            </Button>
            <Button type="button" className="flex-1 bg-red-600 hover:bg-red-700
             text-white" onClick={(e)=>handleSubmit(e,"cons")}>
              {cons}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}