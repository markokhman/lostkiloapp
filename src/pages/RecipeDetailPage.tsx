import { useParams, Link } from 'react-router-dom'
import { useCourse } from '../context/CourseContext'
import VideoOrText from '../components/VideoOrText'
import { getRecipeImage } from '../data/images'
import { recipes, recipeTranscripts } from '../data/recipes'

const RecipeDetailPage = () => {
  const { recipeId } = useParams()
  const { progress } = useCourse()
  const recipe = recipes[recipeId || '']

  if (!recipe) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-400 mb-4">Рецепт не найден</p>
          <Link to="/recipes" className="text-emerald-400">← Назад к рецептам</Link>
        </div>
      </div>
    )
  }

  const applyCoefficient = (text: string) => {
    if (!recipe.multiply) return text
    const match = text.match(/(\d+)г/)
    if (match) {
      const amount = parseInt(match[1])
      const adjusted = Math.round(amount * progress.coefficient)
      return text.replace(/(\d+)г/, `${adjusted}г`)
    }
    return text
  }

  // Get image URL using standardized function
  const imageUrl = getRecipeImage(recipe.id)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600/20 to-red-600/20 px-4 pt-20 pb-8 safe-area-pt">
        <div className="flex items-center gap-3 mt-2">
          <span className="text-5xl">{recipe.emoji}</span>
          <div>
            <h1 className="text-2xl font-bold text-white">{recipe.name}</h1>
            {recipe.time && <p className="text-orange-200/70 text-sm">⏱️ {recipe.time}</p>}
          </div>
        </div>
      </div>

      <div className="px-4 -mt-4 space-y-4">
        {/* Multiply note */}
        {recipe.multiply && (
          <div className="bg-blue-900/30 border border-blue-500/30 rounded-xl p-3">
            <p className="text-blue-200 text-sm">
              📊 Порции умножены на ваш коэффициент: <strong>{progress.coefficient}</strong>
            </p>
          </div>
        )}

        {/* Recipe Image */}
        <div className="rounded-xl overflow-hidden border border-slate-700/50">
          <img 
            src={imageUrl}
            alt={recipe.name}
            className="w-full h-48 object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none'
            }}
          />
        </div>

        {/* Video with transcript */}
        {recipe.videoFile && (
          <VideoOrText
            videoFile={recipe.videoFile}
            text={recipeTranscripts[recipe.videoFile]}
            title="Видео рецепта"
            showBothByDefault={true}
          />
        )}

        {/* Ingredients */}
        <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/50">
          <h3 className="font-semibold text-white mb-3">🥘 Ингредиенты</h3>
          
          {recipe.ingredients && typeof recipe.ingredients === 'object' && !Array.isArray(recipe.ingredients) ? (
            <div className="space-y-4">
              {recipe.ingredients.vegetables && (
                <div>
                  <h4 className="text-sm text-emerald-400 mb-2">Овощи</h4>
                  <ul className="space-y-1">
                    {recipe.ingredients.vegetables.map((ing: string, idx: number) => (
                      <li key={idx} className="text-slate-300 text-sm">• {applyCoefficient(ing)}</li>
                    ))}
                  </ul>
                </div>
              )}
              {recipe.ingredients.optional && (
                <div>
                  <h4 className="text-sm text-amber-400 mb-2">Опционально</h4>
                  <ul className="space-y-1">
                    {recipe.ingredients.optional.map((ing: string, idx: number) => (
                      <li key={idx} className="text-slate-300 text-sm">• {ing}</li>
                    ))}
                  </ul>
                </div>
              )}
              {recipe.ingredients.protein && (
                <div>
                  <h4 className="text-sm text-red-400 mb-2">Белок ({recipe.ingredients.protein.note})</h4>
                  <ul className="space-y-1">
                    {recipe.ingredients.protein.options.map((ing: string, idx: number) => (
                      <li key={idx} className="text-slate-300 text-sm">• {applyCoefficient(ing)}</li>
                    ))}
                  </ul>
                </div>
              )}
              {recipe.ingredients.sauce && (
                <p className="text-slate-400 text-sm">🥄 {recipe.ingredients.sauce}</p>
              )}
            </div>
          ) : Array.isArray(recipe.ingredients) ? (
            <ul className="space-y-1">
              {recipe.ingredients.map((ing: string, idx: number) => (
                <li key={idx} className="text-slate-300 text-sm">• {applyCoefficient(ing)}</li>
              ))}
            </ul>
          ) : null}
        </div>

        {/* Marinade */}
        {recipe.marinade && (
          <div className="bg-amber-900/30 rounded-xl p-4 border border-amber-500/30">
            <h3 className="font-semibold text-amber-300 mb-3">🫙 Маринад</h3>
            <ul className="space-y-1">
              {recipe.marinade.map((ing: string, idx: number) => (
                <li key={idx} className="text-amber-200/70 text-sm">• {ing}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Instructions */}
        {recipe.instructions && (
          <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/50">
            <h3 className="font-semibold text-white mb-3">📝 Приготовление</h3>
            <ol className="space-y-3">
              {recipe.instructions.map((step: string, idx: number) => (
                <li key={idx} className="flex gap-3">
                  <span className="bg-emerald-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0">
                    {idx + 1}
                  </span>
                  <span className="text-slate-300 text-sm">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Note */}
        {recipe.note && (
          <div className="bg-blue-900/30 border border-blue-500/30 rounded-xl p-4">
            <p className="text-blue-200/70 text-sm">💡 {recipe.note}</p>
          </div>
        )}

        {/* Portion */}
        {recipe.portion && (
          <div className="bg-slate-700/50 rounded-xl p-3 text-center">
            <span className="text-slate-300 text-sm">Порция: {recipe.portion}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default RecipeDetailPage