import { getDictionary } from '@/get-dictionary';
import { Locale } from '@/i18n-config';
import { db } from '@/src/db';
import { puzzle, PuzzleRowType, ranking, RankingRowType } from '@/src/db/tables'
import { cn, formatMsTime, getTitleWithLocale } from '@/src/utils/misc';
import { faArrowLeft, faStopwatch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { eq } from 'drizzle-orm';
import Link from 'next/link';
import React from 'react'
import { asc } from 'drizzle-orm';

type Props = {
  params: Promise<{
    id: string;
    locale: Locale;
  }>
}

async function PuzzleRanking({params}: Props) {

  const awaitedParams = await params

  const dictionary = await getDictionary(awaitedParams.locale)
  
  let id: number;
  try {
    id = parseInt(awaitedParams.id)
  }
  catch {
    return <p>Invalid puzzle!</p>
  }
  
  const [ puzzleData, puzzleRanking ] = await Promise.all([
    db
      .select()
      .from(puzzle)
      .where(eq(puzzle.id, id)), 
    db
      .select()
      .from(ranking)
      .where(eq(ranking.id, id))
      .orderBy(asc(ranking.solveTS))])

  return (
    <div className='flex flex-col self-center h-full w-full'>
      <div className='self-start'>
        <Link href={`/puzzle/${id}`} className='flex items-center gap-2 mb-4 text-pretty word-break'>
          <FontAwesomeIcon icon={faArrowLeft} />
          <p>{dictionary.backToPuzzle}</p>
        </Link>
      </div>
      <h1 className='text-center lg:text-4xl text-2xl font-christmas mb-4'>{getTitleWithLocale(puzzleData[0], awaitedParams.locale)}</h1>
      <div className='flex w-full justify-center'>
      <ul className='flex flex-col pb-4 gap-2 lg:w-1/2 w-full'>
      {puzzleRanking.map((r : RankingRowType, key: number) => (
        <li key={key} className="flex gap-1 text-green-950 justify-between bg-green-500 rounded-md filter drop-shadow-md">
          <div className="flex gap-2">
            <p className={
              cn("rounded-l-md p-2 font-extrabold",
                { "bg-yellow-100 text-yellow-500": key === 0 },
                { "bg-gray-100 text-gray-400": key === 1 },
                { "bg-orange-400 text-orange-900": key === 2 })}>{key + 1}</p>
            <p className='py-2'>{r.uname}</p>
          </div>
          <div className="flex items-center gap-2 p-2">
            <FontAwesomeIcon icon={faStopwatch} />
            <p className=''>
              {formatMsTime(r.solveTS)}
            </p>
          </div>
        </li>
      ))}
      </ul>
      </div>
      
    </div>
  )
}

export default PuzzleRanking