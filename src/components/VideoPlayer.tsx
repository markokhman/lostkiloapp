import { useState, useRef, useEffect } from 'react'
import { getVideoUrl, getThumbnailUrl } from '../lib/supabase'

interface VideoPlayerProps {
  filename: string
  title?: string
  onClose?: () => void
}

const VideoPlayer = ({ filename, title, onClose }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [videoError, setVideoError] = useState(false)
  const [thumbError, setThumbError] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const videoUrl = getVideoUrl(filename)
  const thumbUrl = getThumbnailUrl(filename)

  // Lock body scroll when fullscreen
  useEffect(() => {
    if (isPlaying) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isPlaying])

  const handlePlay = () => {
    setIsPlaying(true)
    setVideoError(false)
    setTimeout(() => {
      videoRef.current?.play().catch(() => setVideoError(true))
    }, 100)
  }

  const handleClose = () => {
    setIsPlaying(false)
    if (videoRef.current) {
      videoRef.current.pause()
    }
    onClose?.()
  }

  // Thumbnail preview (not playing)
  if (!isPlaying) {
    return (
      <div className="relative w-full bg-slate-900 rounded-xl overflow-visible">
        <div className="aspect-video">
          <button 
            onClick={handlePlay}
            className="w-full h-full relative group rounded-xl overflow-hidden"
          >
            {thumbUrl && !thumbError ? (
              <img 
                src={thumbUrl} 
                alt={title || filename}
                className="w-full h-full object-cover"
                onError={() => setThumbError(true)}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900">
                {/* Decorative pattern instead of emoji */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-1/4 left-1/4 w-16 h-16 border-2 border-slate-500 rounded-full" />
                  <div className="absolute bottom-1/4 right-1/4 w-12 h-12 border-2 border-slate-500 rounded-lg rotate-45" />
                </div>
              </div>
            )}
            
            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-all">
              <div className="w-16 h-16 rounded-full bg-white/90 group-hover:bg-white flex items-center justify-center shadow-xl transition-all group-hover:scale-110">
                <svg className="w-8 h-8 text-slate-900 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>

            {/* Title overlay */}
            {title && (
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-white text-sm font-medium">{title}</p>
              </div>
            )}
          </button>
        </div>
      </div>
    )
  }

  // Fullscreen video player
  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col">
      {/* Video container */}
      <div className="flex-1 flex items-center justify-center min-h-0">
        {videoError ? (
          <div className="text-center text-slate-400 p-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-800 flex items-center justify-center">
              <svg className="w-8 h-8 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <p className="text-lg mb-2">Видео ещё не загружено</p>
            <p className="text-sm text-slate-500 mb-6">
              Большие файлы сжимаются для загрузки
            </p>
            <button 
              onClick={handleClose}
              className="px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-xl text-white transition-all"
            >
              Закрыть
            </button>
          </div>
        ) : (
          <video
            ref={videoRef}
            src={videoUrl || ''}
            controls
            autoPlay
            playsInline
            className="w-full h-full max-w-full max-h-full object-contain"
            onError={() => setVideoError(true)}
            poster={thumbUrl && !thumbError ? thumbUrl : undefined}
          >
            Ваш браузер не поддерживает видео
          </video>
        )}
      </div>

      {/* Bottom close button */}
      {!videoError && (
        <div className="flex-shrink-0 p-4 pb-8 bg-gradient-to-t from-black to-transparent">
          <button
            onClick={handleClose}
            className="w-full py-4 bg-slate-800/90 hover:bg-slate-700 rounded-2xl text-white font-medium transition-all flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Закрыть
          </button>
        </div>
      )}
    </div>
  )
}

export default VideoPlayer
