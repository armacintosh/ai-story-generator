import React, { useState } from 'react'
import { Mic, Loader } from 'lucide-react'

interface StoryFormProps {
  onSubmit: (storyOutline: string) => void
  isLoading: boolean
}

const StoryForm: React.FC<StoryFormProps> = ({ onSubmit, isLoading }) => {
  const [storyOutline, setStoryOutline] = useState('')
  const [isListening, setIsListening] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(storyOutline)
  }

  const handleSpeechRecognition = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition()
      recognition.continuous = true
      recognition.interimResults = true

      recognition.onstart = () => {
        setIsListening(true)
      }

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result) => result.transcript)
          .join('')

        setStoryOutline(transcript)
      }

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error', event.error)
        setIsListening(false)
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      if (isListening) {
        recognition.stop()
      } else {
        recognition.start()
      }
    } else {
      alert('Speech recognition is not supported in your browser.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-700 shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 w-full max-w-md">
      <div className="mb-4">
        <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="storyOutline">
          Story Outline
        </label>
        <div className="relative">
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32 bg-gray-200"
            id="storyOutline"
            value={storyOutline}
            onChange={(e) => setStoryOutline(e.target.value)}
            placeholder="Type or speak your story outline here..."
            required
          />
          <button
            type="button"
            onClick={handleSpeechRecognition}
            className={`absolute bottom-2 right-2 p-2 rounded-full ${
              isListening ? 'bg-red-500 text-white' : 'bg-gray-500 text-gray-200'
            } hover:bg-gray-600 focus:outline-none focus:shadow-outline`}
          >
            <Mic className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <button
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader className="animate-spin mr-2" />
              Generating Story...
            </>
          ) : (
            'Generate Story'
          )}
        </button>
      </div>
    </form>
  )
}

export default StoryForm