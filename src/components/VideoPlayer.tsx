import { useState, useRef, useEffect } from 'react'
import { getVideoUrl, getThumbnailUrl } from '../lib/supabase'
import { X, Play } from 'lucide-react'

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
      <div className="relative w-full bg-slate-900 rounded-xl overflow-hidden shadow-lg border border-slate-700/50">
        <div className="aspect-video">
          <button 
            onClick={handlePlay}
            className="w-full h-full relative group"
          >
            {thumbUrl && !thumbError ? (
              <img 
                src={thumbUrl} 
                alt={title || filename}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                onError={() => setThumbError(true)}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 flex items-center justify-center">
                <div className="text-slate-700">
                   <Play size={48} className="opacity-20" />
                </div>
              </div>
            )}
            
            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-all">
              <div className="w-14 h-14 rounded-full bg-white/90 group-hover:bg-white flex items-center justify-center shadow-xl backdrop-blur-sm transition-all group-hover:scale-110">
                <Play size={24} className="text-slate-900 ml-1" fill="currentColor" />
              </div>
            </div>

            {/* Title overlay */}
            {title && (
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-white text-sm font-medium truncate">{title}</p>
              </div>
            )}
          </button>
        </div>
      </div>
    )
  }

  // Fullscreen video player
  return (
    <div className="fixed inset-0 z-[100] bg-black">
      {/* Close button overlay - always visible and accessible */}
      <div className="absolute top-0 right-0 p-4 safe-area-pt z-[110]">
        <button
          onClick={handleClose}
          className="w-10 h-10 flex items-center justify-center bg-black/50 backdrop-blur-md rounded-full text-white/90 hover:bg-black/70 hover:text-white transition-all border border-white/10"
        >
          <X size={20} />
        </button>
      </div>

      {videoError ? (
        <div className="flex items-center justify-center h-full w-full">
          <div className="text-center text-slate-400 p-8 max-w-sm">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-800 flex items-center justify-center">
              <X size={32} className="text-slate-500" />
            </div>
            <p className="text-lg font-medium text-white mb-2">Видео недоступно</p>
            <p className="text-sm text-slate-500">
              Возможно, файл еще загружается или произошла ошибка воспроизведения
            </p>
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-black">
          <video
            ref={videoRef}
            src={videoUrl || ''}
            controls
            autoPlay
            playsInline
            className="w-full h-full object-contain"
            onError={() => setVideoError(true)}
            poster={thumbUrl && !thumbError ? thumbUrl : undefined}
          >
            Ваш браузер не поддерживает видео
          </video>
        </div>
      )}
    </div>
  )
}

export default VideoPlayer
