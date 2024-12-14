import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '@/GlobalRedux/Features/showModalSlice';
import type { RootState } from '@/GlobalRedux/store'
export default function createdebate() {
  const [content, setContent] = useState('')
  const [pros, setPros] = useState('')
  const [cons, setCons] = useState('')
  const dispatch = useDispatch()
  const [userID, setUserID] = useState<string | null>(null);
  const modalname = useSelector((state: RootState)=>state.modalSlice.modalname)
  const showModal = useSelector((state: RootState)=>state.modalSlice.showmodal)
  useEffect(()=>{
  
    setUserID(localStorage.getItem('userID'))
  },[])
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log(localStorage.getItem('userID'))
    const response = await fetch('http://localhost:3000/api/graphql', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          query: `
              mutation {
                  addPost(
                      userID:"${userID}",
                      content: "${content}", 
                      pros: "${pros}", 
                      cons: "${cons}",
                    
                  ) {
                    userID
                     content
                     pros
                     cons
                  }
              }
          `,
      }),
  });
  const result = await response.json();
  console.log(result)
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
    <div className={`${showModal&&modalname==="createdebate"?"flex":"hidden"}  fixed inset-0 bg-black bg-opacity-50 items-center justify-center p-4`}>
      <div className="bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6 relative " id = "modal">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Create Debate</h2>
          <button className="text-gray-400 hover:text-gray-200" aria-label="Close" onClick={handleCloseCreate}>
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Textarea
              placeholder="Content here"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full bg-gray-700 text-white border-gray-600 focus:border-blue-500 resize-none"
              rows={4}
            />
          </div>
          <div>
            <Input
              placeholder="Yes"
              value={pros}
              onChange={(e) => setPros(e.target.value)}
              className="w-full bg-gray-700 text-white border-gray-600 focus:border-blue-500 mb-2"
            />
            <label className="text-sm text-gray-400">Pros</label>
          </div>
          <div>
            <Input
              placeholder="No"
              value={cons}
              onChange={(e) => setCons(e.target.value)}
              className="w-full bg-gray-700 text-white border-gray-600 focus:border-blue-500 mb-2"
            />
            <label className="text-sm text-gray-400">Cons</label>
          </div>
          <div className="flex space-x-4">
            <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700 text-white">
              Post
            </Button>
            <Button type="button" className="flex-1 bg-red-600 hover:bg-red-700 text-white">
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}