import { useState } from 'react'
import { useSettings } from '../context/SettingsContext'
import VideoPlayer from './VideoPlayer'

interface VideoOrTextProps {
  videoFile?: string  // Filename like "День 1.MOV"
  text?: string
  title: string
  showBothByDefault?: boolean  // Show both video and text
}

// SVG Icons
const VideoIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
)

const TextIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
)

const PlayIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M8 5v14l11-7z" />
  </svg>
)

const ChevronDownIcon = () => (
  <svg className="w-4 h-4 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
)

const ChevronUpIcon = () => (
  <svg className="w-4 h-4 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
  </svg>
)

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
              <VideoIcon />
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
                <TextIcon />
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
              <TextIcon />
              {!showVideo ? title : 'Текстовая версия'}
            </h3>
            {videoFile && !showVideo && (
              <button
                onClick={() => {
                  setShowVideo(true)
                }}
                className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1"
              >
                <PlayIcon />
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
              {showFullText ? <><ChevronUpIcon /> Свернуть</> : <><ChevronDownIcon /> Читать полностью</>}
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
                <PlayIcon />
                Смотреть видео
              </button>
            )}
            {text && (
              <button
                onClick={() => setShowText(true)}
                className="flex-1 py-2 bg-blue-600/30 hover:bg-blue-600/50 rounded-lg text-blue-200 text-sm font-medium transition-all flex items-center justify-center gap-2"
              >
                <TextIcon />
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
