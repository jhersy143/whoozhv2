'use client'
import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { RootState } from '../../GlobalRedux/store';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '../../GlobalRedux/Features/showModalSlice';
import { useRouter } from 'next/navigation'
export default function login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch();
  const router = useRouter();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("hi");

     if (router) {
      router.push('/pages/homepage'); // Ensure router is not null before using it
    }
    else{
      console.log("bs")
    }
   
    // Handle form submission logic here
  }
  const handleCloselogin = (e: React.FormEvent) =>{
    e.preventDefault()
    dispatch(closeModal());
  }
  const showmodal = useSelector((state: RootState) => state.modalSlice.showmodal);
  const modalname = useSelector((state:RootState) =>state.modalSlice.modalname)

   // handle closing the modal when clicking around it 
  const handleOutsideClick = (e: MouseEvent) => {
    const target = e.target as Element;
    if (!target.closest('#modal')) {
      dispatch(closeModal());
    }
  };

  useEffect(() => {
    console.log(modalname)
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [showmodal]);

  return (
  
    <div className={`${showmodal&&modalname==="login"?'flex':'hidden'} fixed inset-0 bg-black bg-opacity-50  items-center justify-center p-4 `} >
      <div className="bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6 relative " id ="modal">
        <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-200" aria-label="Close" onClick={handleCloselogin}>
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-6 text-white">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="sr-only">Email</label>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-700 text-white border-gray-600 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <Input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-700 text-white border-gray-600 focus:border-blue-500"
              required
            />
          </div>
          <div className="text-right">
            <a href="#" className="text-sm text-blue-400 hover:underline">Forgot Password?</a>
          </div>
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            Login
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-400">
          <a href="#" className="text-blue-400 hover:underline">Create new account</a>
        </p>
      </div>
    </div>
  )
}