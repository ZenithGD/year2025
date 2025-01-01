import { Locale } from '@/i18n-config';
import React from 'react'

type Props = {
  params: Promise<{ lang: Locale }>;
}

function HowTo({ params }: Props) {
  return (
    <div>
      <h1>How Year 2025 was made</h1>
      <p>Coming soon!</p>
    </div>
  )
}

export default HowTo