import React from 'react'
import Image from 'next/image'
import { cn } from '@/utils/misc'
import { motion } from 'motion/react'

type Props = {
  image: string,
  id: number
  showId: boolean
}

function PuzzleCell({ image, id, showId }: Props) {

  return (
    <motion.div key={id} className={
      cn(
        "relative w-full h-auto",
        { "shadow-lg": id > 0 } 
      )}
    >
      {id > 0 &&
        <Image
          src={`data:image/png;base64,${image}`}
          alt={`cell-${id}`}
          layout="intrinsic"
          width={150}
          height={150}
          unoptimized
          className="rounded-lg"
        />
      }

      {showId && id > 0 &&
        <div className='absolute top-0 left-0 border-2 border-green-300 h-full w-full rounded-lg'>
          <div className='absolute top-0 left-0 bg-green-300 h-8 w-8 p-2 rounded-tl-sm rounded-br-md flex justify-center items-center text-green-950 text-center font-extrabold'>{id}</div>
        </div>
      }
    </motion.div>
  )
}

export default PuzzleCell