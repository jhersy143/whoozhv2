import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { RootState } from '../../GlobalRedux/store';
import { useSelector, useDispatch } from 'react-redux';
import { showModal,closeModal } from '@/GlobalRedux/Features/showModalSlice';

import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
export default function Component() {
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const dispatch = useDispatch();

  const handleCloseregister= (e: React.FormEvent) =>{
    e.preventDefault()
    dispatch(closeModal());
  }
  const validateEmail = (email: string) => {
    // Simple regex for email validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  
const CREATE_USER = gql`
mutation CreateUser($email: String!, $firstname: String!, $lastname: String!, $location: String, $work: String, $contact: Int) {
  createUser(email: $email, firstname: $firstname, lastname: $lastname, location: $location, work: $work, contact: $contact) {
    id
    email
    firstname
    lastname
  }
}
`;
 const CREATE_ACCOUNT = gql`
mutation CreateAccount($userID: ID!, $provider: String!, $providerAccountID: String!, $password: String, $image: String) {
  createAccount(userID: $userID, provider: $provider, providerAccountID: $providerAccountID, password: $password, image: $image) {
    id
    userID
    provider
    providerAccountID
    image
  }
}
`;
  const [createUser] = useMutation(CREATE_USER);
const [createAccount] = useMutation(CREATE_ACCOUNT);

 const handleCreateUserAndAccount = async () => {
  try {
    // Step 1: Create User
    const userResponse = await createUser({
      variables: {
        email: "test@example.com",
        firstname: "John",
        lastname: "Doe",
        location: "New York",
        work: "Software Developer",
        contact: 1234567890,
      },
    });

    const userId = userResponse.data.createUser.id;

    // Step 2: Create Account
    const accountResponse = await createAccount({
      variables: {
        userID: userId,
        provider: "google",
        providerAccountID: "google_account_id",
        password: "securepassword",
        image: "http://example.com/image.jpg",
      },
    });

    console.log('Account created:', accountResponse.data.createAccount);
  } catch (error) {
    console.error('Error creating user or account:', error);
  }
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
  const res = await fetch('http://localhost:3000/api/graphql', {
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

  const result = await res.json();
  if (result.errors) {
      setMessage('Error creating user');
  } else {
      setMessage('User created successfully!');
      // Optionally reset the form
      setEmail('');
      setFirstName('');
      setLastName('');
 
  }
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
        <form onSubmit={handleCreateUserAndAccount} className="space-y-4">
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