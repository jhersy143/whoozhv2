import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { RootState } from '../../GlobalRedux/store';
import { useSelector, useDispatch } from 'react-redux';
import { showModal,closeModal } from '@/GlobalRedux/Features/showModalSlice';
import bcrypt from 'bcryptjs';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
export default function Component() {
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [provider,setProvider] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [providerAccountID,setproviderAccountID] = useState('')
  const [image,setImage] = useState('')
  const dispatch = useDispatch();
  let userId = ""
  const handleCloseregister= (e: React.FormEvent) =>{
    e.preventDefault()
    dispatch(closeModal());
  }
  const validateEmail = (email: string) => {
    // Simple regex for email validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (validateEmail(email)) {
    setError('');
    // Proceed with form submission (e.g., send to API)
    console.log('Email is valid:', email);
  } else {
    setError('Please enter a valid email address.');
  }
  const addUser = await fetch('http://localhost:3000/api/graphql', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          query: `
              mutation {
                  addUser(
                      email: "${email}", 
                      firstname: "${firstName}", 
                      lastname: "${lastName}", 
                  
                  ) {
                      id
                      email
                      firstname
                      lastname
                  }
              }
          `,
      }),
  });
  const result = await addUser.json();
 // Hash the password
 const salt = bcrypt.genSaltSync(10);
 const hashedPassword = bcrypt.hashSync(password, salt);

  if (result.errors) {
    setMessage('Error creating user');

} else {
    setMessage('User created successfully!');
    userId = result.data.addUser.id;
    // Optionally reset the form
    setEmail('');
    setFirstName('');
    setLastName('');

}

  const addAccount = await fetch('http://localhost:3000/api/graphql', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        query: `
            mutation {
                    addAccount(
                    userID: "${userId}", 
                    provider: "${provider}", 
                    providerAccountID: "${providerAccountID}", 
                    password: "${hashedPassword}", 
                    image: "${image}",
                ) {
                    id
                    userID
                    provider
                    providerAccountID
                    image
                }
              }
            
        `,
    }),
});

  
  console.log(message)
};
  //redux states
  const modalname = useSelector((state: RootState) => state.modalSlice.modalname);
  const showModal =useSelector((state: RootState)=>state.modalSlice.showmodal)

 
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
    <div className={`${showModal&&modalname==="register"?'flex':'hidden'} fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4`}>
      <div className="bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6 relative" id = "modal">
        <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-200"  onClick={handleCloseregister}>
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-6 text-white">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-gray-700 text-white border-gray-600 focus:border-blue-500"
          />
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <Input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full bg-gray-700 text-white border-gray-600 focus:border-blue-500"
          />
          <Input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full bg-gray-700 text-white border-gray-600 focus:border-blue-500"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-gray-700 text-white border-gray-600 focus:border-blue-500"
          />
          <Input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full bg-gray-700 text-white border-gray-600 focus:border-blue-500"
          />
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            Submit
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-400">
          Already have an account?{' '}
          <a href="#" className="text-blue-400 hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  )
}