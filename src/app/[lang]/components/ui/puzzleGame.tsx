import { ProcessImageRequest } from '@/src/app/[lang]/api/generate/route';
import { usePuzzleContext } from '@/src/app/[lang]/context/puzzle/puzzleContext';
import { useMutation } from '@tanstack/react-query';
import React, { useEffect, useRef, useState } from 'react'
import PuzzleGrid from '../puzzle/grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faCog, faMagnifyingGlass, faStopwatch } from '@fortawesome/free-solid-svg-icons'
import { PuzzleRowType } from '@/src/db/tables';
import { createPortal } from 'react-dom';
import OptionsModal from './optionsModal';
import { AnimatePresence, motion } from 'motion/react';
import { formatMsTime } from '@/src/utils/misc';
import { solveAStar, manhattanHeuristic } from '@/src/lib/solve';
import SolvedModal from './SolvedModal';
import { useDictionary } from '../../context/i18n/dictionaryProvider';
import LoadingScreen from './loadingScreen';

interface Props {
  puzzleInfo: PuzzleRowType,
  puzzleWidth: number,
  cellGap: number
}

function PuzzleGame({ puzzleInfo, puzzleWidth, cellGap }: Props) {

  const { dictionary, locale } = useDictionary()

  // the array of images
  const [cells, setCells] = useState<string[]>([]);
  const [cropped, setCropped] = useState<string>("");

  // the puzzle state context
  const { puzzle } = usePuzzleContext()

  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showSolvedModal, setShowSolvedModal] = useState(false);

  const [solveTS, setSolveTS] = useState(0)
  const [elapsedTimeMs, setElapsedTimeMs] = useState(0)
  const [active, setActive] = useState(false)

  const startTimeRef = useRef<number | null>(null); // Store the start time
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Function to start the timer
  const handleStartTimer = () => {
    if (!active) {
      setActive(true);
      startTimeRef.current = Date.now() - elapsedTimeMs; // Adjust for existing elapsed time
      timerIntervalRef.current = setInterval(() => {
        setElapsedTimeMs(Date.now() - (startTimeRef.current ?? Date.now()));
      }, 100); // Update every 100ms
    }
  };

  // Function to stop the timer
  const handleStopTimer = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    setSolveTS(Date.now() - (startTimeRef.current ?? Date.now()))
    setActive(false); // Ensure the active state is updated
  }

  /**
   * Mutation to check for changes in the state of the puzzle images
   */
  const processImageMutation = useMutation({
    mutationFn: async ({ imagePath, gridSize }: ProcessImageRequest) => {

      return fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imagePath, gridSize }),
      }).then(r => r.json());
    },
    onSuccess: (data: { cells: string[], original: string, cropped: string }) => {
      setCells(data.cells.slice(0, -1));
      setCropped(data.original);

      handleStartTimer()
    },
  });

  // Function to reset the timer
  const handleResetTimer = () => {
    setActive(false);
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    setElapsedTimeMs(0);
    startTimeRef.current = null;
  };

  // Cleanup the timer when the component unmounts
  useEffect(() => {
    if ( puzzle.isSolved() )
    {
      onSolve()
    }

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, []);

  // onSolve function
  const onSolve = () => {
    handleStopTimer();

    // show modal
    setShowSolvedModal(true)
  };

  // Trigger image processing when the component mounts
  useEffect(() => {
    processImageMutation.mutate({ imagePath: puzzleInfo.image, gridSize: puzzle.getSize() });
  }, [puzzleInfo.image]);

  if (processImageMutation.isError) {
    return (
      <p>Error: {processImageMutation.error?.message}</p>
    )
  }

  if (processImageMutation.isIdle || processImageMutation.isPending) {
    return (
      <LoadingScreen message={dictionary.processing} />
    )
  }

  return (
    <>
      <div className='flex w-full h-full justify-center items-center'>
        <div className='flex flex-col gap-4'>
          <div className='flex justify-center items-center text-lg gap-2'>
            <FontAwesomeIcon icon={faStopwatch} />
            <p className='text-green-100'>
              {formatMsTime(elapsedTimeMs)}
            </p>
          </div>
          <div className='bg-gradient-to-t from-green-700 to-green-500 backdrop-blur rounded-lg filter shadow-lg p-4'>
            <PuzzleGrid
              cells={cells}
              puzzleWidth={puzzleWidth}
              cellGap={cellGap}
              onSolve={onSolve}
              active={active}
            />
          </div>
          <button
            onClick={() => setShowSettingsModal(true)}
            className='bg-gradient-to-t from-green-700 to-green-600 flex justify-center items-center w-full p-1 bg-green-600 hover:from-green-600 hover:to-green-500 rounded-md'
          >
            <p className='self-center text-green-100 font-bold'>Settings</p>
            <FontAwesomeIcon className='text-green-100 aspect-square pl-2 p-2' icon={faCog} />
          </button>
          {/* Not finishing this in time... */}
          {/* <div className='flex gap-4'>
            <button
              onClick={handleHint}
              className='bg-gradient-to-t from-green-700 to-green-600 divide-x flex justify-between items-center w-full p-1 bg-green-600 hover:from-green-600 hover:to-green-500 rounded-md'
            >
              <p className='self-center w-full text-green-100 font-bold flex-grow'>Hint</p>
              <FontAwesomeIcon className='text-green-100  aspect-square pl-3 p-2' icon={faMagnifyingGlass} />
            </button>
            <button
              onClick={handleSolution}
              className='bg-gradient-to-t from-green-700 to-green-600 divide-x flex justify-between items-center w-full p-1 bg-green-600 hover:from-green-600 hover:to-green-500 rounded-md'
            >
              <p className='self-center w-full text-green-100 font-bold flex-grow'>Solution</p>
              <FontAwesomeIcon className='text-green-100 aspect-square pl-3 p-2' icon={faCheck} />
            </button>
          </div> */}
        </div>
      </div>

      {createPortal(
        showSettingsModal &&
        <AnimatePresence mode='wait'>
          <motion.div
            className='fixed top-0 left-0 h-screen w-screen z-50 flex justify-center items-center backdrop-blur-sm'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <OptionsModal closeModal={() => setShowSettingsModal(false)} />
          </motion.div>
        </AnimatePresence>
        ,
        document.body
      )}

      {createPortal(
        showSolvedModal &&
        <AnimatePresence mode='wait'>
          <motion.div
            className='fixed top-0 left-0 h-screen w-screen z-50 flex justify-center items-center backdrop-blur-sm'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <SolvedModal 
              id={puzzleInfo.id} 
              solveTS={solveTS}
              cropped={cropped} 
              closeModal={() => setShowSolvedModal(false)} />
          </motion.div>
        </AnimatePresence>
        ,
        document.body
      )}
    </>
  )
}

export default PuzzleGame
