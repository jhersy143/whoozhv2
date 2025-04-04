'use client'

import React, { useEffect , useState } from 'react';
import { PencilIcon } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../GlobalRedux/store';
import { closeModal } from '@/GlobalRedux/Features/showModalSlice';
export default function EditProfile() {
    const [userID, setUserID] = useState<string | null>(null);
    const [error,setError] = useState("");
    const dispatch = useDispatch();
    const [profile, setProfile] = useState({
      firstname: '',
      email: '',
      location: '',
      contact: "0",
      work: '',
      avatar: '/images/userprofile.png'
    })
     const handleClose = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(closeModal());
      };
    const show = useSelector((state: RootState) => state.modalSlice.showmodal);
    const modalname = useSelector((state: RootState) => state.modalSlice.modalname);
    useEffect(() => {
      setUserID(localStorage.getItem('userID'));
    },[])
    useEffect(() => {
      const fetchUser  = async () => {
        if (!userID) return; // Exit if userID is not set
        const response = await fetch('http://localhost:3000/api/graphql', {
          method: 'POST',
          headers: {
            'Content-Type':'application/json',
          },
          body: JSON.stringify({
            query: `
              query {
                getUserByID(id: "${userID}") {
                  id
                  firstname
                  email
                  location
                  contact
                  work
                  avatar
                }
              }
            `,
          }),
        });
     
        const result = await response.json();
        console.log(result.data.getUserByID)
        if (result.data) {
          setProfile(result.data.getUserByID);
        }
    
      };
  
       
      fetchUser()
     
    
    }, [userID]);
      
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if(name=="contact"){
     
      const numericValue = value.replace(/\D/g, ""); // Remove non-numeric characters
      const truncatedValue = numericValue.slice(0, 11); 
      setProfile((prev) => ({
        ...prev,
        [name]: truncatedValue,
      }));

      if (truncatedValue.length !== 11) {
        setError("Contact must be exactly 11 digits.");
      } else {
        setError("");
      }
    }
    else{
      setProfile(prev => ({ ...prev, [name]: value }))
    }
  
   
  }
  
    
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      if (!userID) return; // Exit if userID is not set
        const response = await fetch('http://localhost:3000/api/graphql', {
          method: 'POST',
          headers: {
            'Content-Type':'application/json',
          },
          body: JSON.stringify({
            query: `
              mutation {
                updateProfile(
                  id: "${userID}"
                  firstname:"${profile.firstname}"
                  email:"${profile.email}"
                  location:"${profile.location}"
                  contact:"${profile.contact}"
                  work:"${profile.work}"
                ) {
                  id
                  firstname
                  email
                  location
                  contact
                  work
                
                }
              }
            `,
          }),
        });
       
        const result = await response.json();
        console.log(result)
        if (result.data) {
          setProfile(result.data.updateProfile);
        }
       dispatch(closeModal());
    }
  return (
    <Dialog open={show&&modalname=='editprofile'?true:false} >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <PencilIcon className="w-5 h-5" />
              Edit Profile
            </DialogTitle>
            <DialogClose className="absolute right-6 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground" onClick={handleClose}>
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </DialogClose>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={profile.firstname}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={profile.email}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="lcoation"
                name="location"
                value={profile.location}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="contact">Contact</Label>
              <Input
                id="contact"
                name="contact"
                value={profile.contact}
                onChange={handleChange}
              />
               {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="work">Work</Label>
              <Input
                id="work"
                name="work"
                value={profile.work}
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </DialogContent>
      
      </Dialog>
  )
}
