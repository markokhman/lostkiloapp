import { useState } from 'react'
import { useSettings } from '../context/SettingsContext'
import VideoPlayer from './VideoPlayer'
import { Video, AlignLeft, Play, ChevronDown, ChevronUp } from 'lucide-react'

interface VideoOrTextProps {
  videoFile?: string  // Filename like "День 1.MOV"
  text?: string
  title: string
  showBothByDefault?: boolean  // Show both video and text
}

const VideoOrText = ({ videoFile, text, title, showBothByDefault = false }: VideoOrTextProps) => {
  const { textMode } = useSettings()
  const [showFullText, setShowFullText] = useState(false)
  const [showVideo, setShowVideo] = useState(!textMode)
  const [showText, setShowText] = useState(textMode || showBothByDefault)

  if (!text && !videoFile) {
    return null
  }

  const isLongText = text ? text.length > 500 : false
  const displayText = !showFullText && isLongText ? text?.slice(0, 500) + '...' : text

  return (
    <div className="space-y-4">
      {/* Video Section */}
      {videoFile && showVideo && (
        <div className="bg-slate-800/80 rounded-xl overflow-hidden border border-slate-700/50">
          <div className="p-4 border-b border-slate-700/50 flex items-center justify-between">
            <h3 className="font-semibold text-white flex items-center gap-2">
              <Video size={18} />
              {title}
            </h3>
            {text && (
              <button
                onClick={() => {
                  setShowVideo(false)
                  setShowText(true)
                }}
                className="text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-1"
              >
                <AlignLeft size={14} />
                Только текст
              </button>
            )}
          </div>
          
          <VideoPlayer filename={videoFile} />
        </div>
      )}

      {/* Text Section */}
      {text && showText && (
        <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/50">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-white flex items-center gap-2">
              <AlignLeft size={18} />
              {!showVideo ? title : 'Текстовая версия'}
            </h3>
            {videoFile && !showVideo && (
              <button
                onClick={() => {
                  setShowVideo(true)
                }}
                className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1"
              >
                <Play size={14} fill="currentColor" />
                Смотреть видео
              </button>
            )}
          </div>
          
          <div className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
            {displayText}
          </div>
          
          {isLongText && (
            <button
              onClick={() => setShowFullText(!showFullText)}
              className="mt-3 text-emerald-400 hover:text-emerald-300 text-sm font-medium flex items-center gap-1"
            >
              {showFullText ? <><ChevronUp size={16} /> Свернуть</> : <><ChevronDown size={16} /> Читать полностью</>}
            </button>
          )}
        </div>
      )}

      {/* Toggle buttons when both are hidden */}
      {!showVideo && !showText && (
        <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/50">
          <h3 className="font-semibold text-white mb-3">{title}</h3>
          <div className="flex gap-2">
            {videoFile && (
              <button
                onClick={() => setShowVideo(true)}
                className="flex-1 py-2 bg-emerald-600/30 hover:bg-emerald-600/50 rounded-lg text-emerald-200 text-sm font-medium transition-all flex items-center justify-center gap-2"
              >
                <Play size={16} fill="currentColor" />
                Смотреть видео
              </button>
            )}
            {text && (
              <button
                onClick={() => setShowText(true)}
                className="flex-1 py-2 bg-blue-600/30 hover:bg-blue-600/50 rounded-lg text-blue-200 text-sm font-medium transition-all flex items-center justify-center gap-2"
              >
                <AlignLeft size={16} />
                Читать текст
              </button>
            )}
          </div>
        </div>
      )}

      {/* Show both toggle */}
      {videoFile && text && (showVideo !== showText) && (
        <button
          onClick={() => {
            setShowVideo(true)
            setShowText(true)
          }}
          className="w-full py-2 bg-slate-700/30 hover:bg-slate-700/50 rounded-lg text-slate-400 hover:text-white text-xs transition-all"
        >
          Показать и видео, и текст
        </button>
      )}
    </div>
  )
}

export default VideoOrText
