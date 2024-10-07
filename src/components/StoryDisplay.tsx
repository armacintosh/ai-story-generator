import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, RefreshCw } from 'lucide-react'

interface Story {
  pages: { text: string; imageUrl: string }[]
}

interface StoryDisplayProps {
  story: Story
  onReset: () => void
}

const StoryDisplay: React.FC<StoryDisplayProps> = ({ story, onReset }) => {
  const [currentPage, setCurrentPage] = useState(0)
  const [currentText, setCurrentText] = useState('')

  useEffect(() => {
    setCurrentText(story.pages[currentPage].text)
  }, [currentPage, story])

  const nextPage = () => {
    if (currentPage < story.pages.length - 1) {
      setCurrentPage(prevPage => prevPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prevPage => prevPage - 1)
    }
  }

  return (
    <div className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 w-full max-w-2xl">
      <div className="mb-4 relative">
        <img
          src={story.pages[currentPage].imageUrl}
          alt={`Story page ${currentPage + 1}`}
          className="w-full h-64 object-cover rounded-lg shadow-md"
        />
        <div className="absolute bottom-2 right-2 bg-white bg-opacity-75 px-2 py-1 rounded text-sm">
          Page {currentPage + 1} of {story.pages.length}
        </div>
      </div>
      <p className="text-gray-700 text-lg mb-6 leading-relaxed">{currentText}</p>
      <div className="flex justify-between items-center">
        <button
          onClick={prevPage}
          disabled={currentPage === 0}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline disabled:opacity-50 transition duration-300 ease-in-out transform hover:scale-105"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextPage}
          disabled={currentPage === story.pages.length - 1}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline disabled:opacity-50 transition duration-300 ease-in-out transform hover:scale-105"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
      <div className="mt-8 text-center">
        <button
          onClick={onReset}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline flex items-center justify-center mx-auto transition duration-300 ease-in-out transform hover:scale-105"
        >
          <RefreshCw className="w-5 h-5 mr-2" />
          Create New Story
        </button>
      </div>
    </div>
  )
}

export default StoryDisplay