import React from 'react'

const Loader = ({ className }: { className?: string }) => {
  return (
    <div
      role="progressbar"
      aria-label="loading"
      className={`border-y-2 border-l-2 rounded-full h-6 w-6 animate-spin border-blue-400 ${className}`}
    />
  )
}

export default Loader
