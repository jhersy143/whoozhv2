import { useState } from 'react'
import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Component() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6 relative">
        <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-200" aria-label="Close">
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