import React,{ useRef, useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {  ImageIcon, XIcon } from 'lucide-react'
import { closeModal } from '@/GlobalRedux/Features/showModalSlice';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../GlobalRedux/store';
export default function EditPicture()  {

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | null>(null);
  const show = useSelector((state: RootState) => state.modalSlice.showmodal);
  const modalname = useSelector((state: RootState) => state.modalSlice.modalname);
  const [userID, setUserID] = useState<string | null>(null);
  const dispatch = useDispatch();
  useEffect(() => {
    setUserID(localStorage.getItem('userID'));
  },[])
   const [profile, setProfile] = useState({
        firstname: '',
        email: '',
        location: '',
        contact: "0",
        work: '',
        avatar: '/images/userprofile.png'
      })
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfile((prev) => ({ ...prev, avatar: e.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  }
  const handleClose = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(closeModal());
      };
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const file = event.dataTransfer.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfile(prev => ({ ...prev, avatar: e.target?.result as string }))
      
      }
      reader.readAsDataURL(file)
    }
  }
  const handleUpdatePic = async (event: React.MouseEvent) => {
    event.preventDefault();
    if (!file) {
      alert('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('avatar', file);

    try {

      // Upload the file to the server
      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const { fileUrl } = await uploadResponse.json();

      // Update the profile with the new avatar URL
      setProfile((prev) => ({ ...prev, avatar: fileUrl }));

      // Close the upload dialog
      dispatch(closeModal());
      const response = await fetch('http://localhost:3000/api/graphql', {
        method: 'POST',
        headers: {
          'Content-Type':'application/json',
        },
        body: JSON.stringify({
          query: `
            mutation {
              updatePhoto 
                (
                id:"${userID}"
                avatar:"${fileUrl}"
                )
              {
                id
                avatar
              }
            }
          `,
        }),
      });
     
      const result = await response.json();
      console.log(result.data.updatePhoto)
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file');
    }
  };
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }
  return (
    <Dialog open={show&&modalname=='editpicture'?true:false}>
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
                  onClick={() => setProfile(prev => ({ ...prev, avatar: '' }))}
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
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={(event) => handleUpdatePic(event)}>
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
  )
}

