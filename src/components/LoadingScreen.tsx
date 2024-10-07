import React from 'react'
import { Loader } from 'lucide-react'

interface LoadingScreenProps {
  progress: { current: number; total: number }
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ progress }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Loader className="animate-spin w-16 h-16 text-blue-500 mb-4" />
      <p className="text-xl font-semibold text-gray-700 mb-2">Creating your story...</p>
      {progress.total > 0 && (
        <p className="text-lg text-gray-600">
          Writing page {progress.current} of {progress.total}
        </p>
      )}
    </div>
  )
}

export default LoadingScreen