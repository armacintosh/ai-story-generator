import React, { useState } from 'react'
import { Book } from 'lucide-react'
import StoryForm from './components/StoryForm'
import StoryDisplay from './components/StoryDisplay'
import LoadingScreen from './components/LoadingScreen'
import { generateStory } from './utils/storyGenerator'

interface Story {
  pages: { text: string; imageUrl: string }[]
}

function App() {
  const [story, setStory] = useState<Story | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loadingProgress, setLoadingProgress] = useState({ current: 0, total: 0 })

  const handleGenerateStory = async (storyOutline: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const generatedStory = await generateStory(storyOutline, setLoadingProgress)
      setStory(generatedStory)
    } catch (error) {
      console.error('Error generating story:', error)
      setError(error.message || 'An unexpected error occurred while generating the story.')
    } finally {
      setIsLoading(false)
      setLoadingProgress({ current: 0, total: 0 })
    }
  }

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-4 bg-cover bg-center"
      style={{
        backgroundImage: `url('https://image.pollinations.ai/prompt/cartoon%20anime%20style%20sunset%20over%20nature%20with%20beautful%20warm%20colors')`,
      }}
    >
      <div className="bg-gray-800 bg-opacity-75 rounded-lg p-8 max-w-md w-full">
        <header className="mb-8 text-center">
          <Book className="w-16 h-16 mx-auto mb-4 text-purple-600" />
          <h1 className="text-4xl font-bold text-gray-100">A Story from Today</h1>
          <p className="text-xl text-gray-300">Create unique stories with AI-generated content!</p>
        </header>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        {isLoading ? (
          <LoadingScreen progress={loadingProgress} />
        ) : !story ? (
          <StoryForm onSubmit={handleGenerateStory} isLoading={isLoading} />
        ) : (
          <StoryDisplay story={story} onReset={() => {setStory(null); setError(null);}} />
        )}
      </div>
    </div>
  )
}

export default App