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
        name="Spain icons"
        author="Flaticon"
        url="https://www.flaticon.com/free-icons/spain"
        asset="/images/flags/spain.png"
      />
      <CreditsCard
        name="UK Flag icons"
        author="Flaticon"
        url="https://www.flaticon.com/free-icons/uk-flag"
        asset="/images/flags/united-kingdom.png"
      />
      <CreditsCard
        name="France icons"
        author="Flaticon"
        url="https://www.flaticon.com/free-icons/france"
        asset="/images/flags/france.png"
      />
    </div>
  )
}

export default Credits