import CreditsCard from '@/src/app/[lang]/components/ui/creditsCard'
import React from 'react'

type Props = {}

function Credits({}: Props) {
  return (
    <div className='grid xl:grid-cold-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 place-items-center gap-8'>
      <CreditsCard
        name="Star icon"
        author="pngtree"
        url="https://pngtree.com/freepng/realistic-golden-shooting-star-trail-vector_5570946.html"
        asset="/images/star.png"
      />
      <CreditsCard
        name="Star icon"
        author="pngtree"
        url="https://pngtree.com/freepng/realistic-golden-shooting-star-trail-vector_5570946.html"
        asset="/images/star.png"
      />
    </div>
  )
}

export default Credits