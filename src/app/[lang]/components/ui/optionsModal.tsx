import { useAnimate } from 'motion/react'
import React from 'react'
import Switch from './switch'
import { usePuzzleContext } from '@/src/app/[lang]/context/puzzle/puzzleContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'

type Props = { closeModal: () => void }

function OptionsModal({ closeModal }: Props) {

  const { showId, setShowId, highlightCorrect, setHighlightCorrect } = usePuzzleContext()
  
  return (
    <div className='relative lg:w-96 w-72 flex flex-col items-center gap-2 rounded-lg bg-gradient-to-t from-green-600 to-green-500 p-4'>
      <div className='absolute top-4 left-4'>
        <button
          onClick={closeModal}
        >
          <FontAwesomeIcon icon={faClose} />
        </button>
      </div>
      <h2 className='font-bold'>Options</h2>
      <div className='flex self-stretch justify-between gap-2'>
        <p>Show cell numbers</p>
        <Switch value={showId} toggleValue={() => setShowId(!showId)} /> 
      </div>
      <div className='flex self-stretch justify-between gap-2'>
        <p>Highlight cells in correct place</p>
        <Switch value={highlightCorrect} toggleValue={() => setHighlightCorrect(!highlightCorrect)} /> 
      </div>
    </div>
  )
}


export default OptionsModal