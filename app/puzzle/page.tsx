import React from 'react'

type Props = {
  params: Promise<{ slug: string }>
}

async function PuzzleSelectionPage({ params, }: Props) {
  
  const slug = (await params).slug

  return (
    <div>PuzzleSelectionPage</div>
  )
}

export default PuzzleSelectionPage