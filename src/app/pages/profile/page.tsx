"use client"

import { useState, useRef, useEffect,useLayoutEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { PencilIcon, MapPinIcon, PhoneIcon, BriefcaseIcon, MailIcon, UploadIcon, ImageIcon, XIcon } from 'lucide-react'

export default function Component() {
  const [isEditing, setIsEditing] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [userID, setUserID] = useState<string | null>(null);
  const [profile, setProfile] = useState({
    firstname: '',
    email: '',
    location: '',
    contact: 0,
    work: '',
    avatar: '/images/userprofile.png'
  })
  const fileInputRef = useRef<HTMLInputElement>(null)
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
      console.log(profile)
    };

     
    fetchUser()
   
  
  }, [userID]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfile(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsEditing(false)
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfile(prev => ({ ...prev, avatar: e.target?.result as string }))
        setIsUploading(false)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const file = event.dataTransfer.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfile(prev => ({ ...prev, avatar: e.target?.result as string }))
        setIsUploading(false)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  return (
    <div className="max-w-4xl mx-auto p-4 mt-20">
      <div className="relative rounded-lg overflow-hidden shadow-lg bg-gray-800 ">
        <div className="h-48 bg-gradient-to-r from-[#B666D2] to-[#F03D5C]"></div>
        <div className="absolute top-32 left-8">
          <div className="relative">
            <img
              src={profile.avatar}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
            />
            <Button
              size="icon"
              variant="secondary"
              className="absolute bottom-0 right-0 rounded-full shadow-md"
              onClick={() => setIsUploading(true)}
            >
              <PencilIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="pt-20 pb-8 px-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-white">{profile.firstname}</h1>
              <p className="text-lg text-blue-600">{profile.email}</p>
            </div>
            <Button onClick={() => setIsEditing(true)} className="gap-2">
              <PencilIcon className="w-4 h-4" />
              Edit Profile
            </Button>
          </div>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center text-white">
              <MapPinIcon className="h-5 w-5 mr-2" />
              <span>{profile.location}</span>
            </div>
            <div className="flex items-center text-white">
              <PhoneIcon className="h-5 w-5 mr-2" />
              <span>{profile.contact}</span>
            </div>
            <div className="flex items-center text-white">
              <BriefcaseIcon className="h-5 w-5 mr-2" />
              <span>{profile.work}</span>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <PencilIcon className="w-5 h-5" />
              Edit Profile
            </DialogTitle>
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
                id="address"
                name="address"
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
              <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isUploading} onOpenChange={setIsUploading}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Upload Profile Picture</DialogTitle>
          </DialogHeader>
          <div
            className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 transition-colors duration-200 ease-in-out"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            {profile.avatar ? (
              <div className="relative">
                <img src={profile.avatar} alt="Profile" className="max-w-full max-h-64 rounded-lg" />
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute top-2 right-2"
                  onClick={() => setProfile(prev => ({ ...prev, avatar: '/placeholder.svg?height=128&width=128' }))}
                >
                  <XIcon className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div className="text-center">
                <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <Label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500"
                  >
                    <span>Upload a file</span>
                    <Input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      onChange={handleFileChange}
                      ref={fileInputRef}
                      accept="image/*"
                    />
                  </Label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
              </div>
            )}
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setIsUploading(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsUploading(false)}>
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}