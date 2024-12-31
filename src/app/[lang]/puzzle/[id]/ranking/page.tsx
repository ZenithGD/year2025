import { getDictionary } from '@/get-dictionary';
import { Locale } from '@/i18n-config';
import { db } from '@/src/db';
import { puzzle, PuzzleRowType, ranking, RankingRowType } from '@/src/db/schema'
import { formatMsTime } from '@/src/utils/misc';
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

  const id = parseInt(awaitedParams.id)
  
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
    <div className='flex flex-col items-center self-center h-full w-full'>
      <div>
        <Link href={`/puzzle/${id}`} className='flex items-center gap-2 mb-4 text-pretty word-break'>
          <FontAwesomeIcon icon={faArrowLeft} />
          <p>{dictionary.backToPuzzle}</p>
        </Link>
      </div>
      <h1 className='text-center lg:text-4xl text-2xl font-christmas mb-4'>{puzzleData[0].title}</h1>
      <ul className='flex flex-col pb-4 gap-2 lg:w-1/2 w-full'>
      {puzzleRanking.map((r : RankingRowType, key: number) => (
        <li key={key} className="flex gap-1 text-green-900 justify-between bg-green-500 rounded-md filter drop-shadow-md p-2">
          <div className="flex gap-2">
            <p>{key + 1}</p>
            <p>{r.uname}</p>
          </div>
          <div className="flex gap-2">
            <FontAwesomeIcon icon={faStopwatch} />
            <p className=''>
              {formatMsTime(r.solveTS)}
            </p>
          </div>
        </li>
      ))}
      </ul>
    </div>
  )
}

export default PuzzleRanking