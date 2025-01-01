'use client'

import { getDictionary } from "@/get-dictionary"
import { Locale } from "@/i18n-config"
import { createContext, ReactNode, useContext } from "react"

type Dictionary = Awaited<ReturnType<typeof getDictionary>>

const DictionaryContext = createContext < { dictionary: Dictionary, locale: Locale } | null >(null)

export default function DictionaryProvider({
  dictionary,
  locale,
  children,
}: {
  dictionary: Dictionary,
  locale: Locale,
  children: ReactNode
}) {
  return (
    <DictionaryContext.Provider value={{ dictionary, locale }}>
      {children}
    </DictionaryContext.Provider>
  )
}

export function useDictionary() {
  const dictionary = useContext(DictionaryContext)
  if (dictionary === null) {
    throw new Error('useDictionary hook must be used within DictionaryProvider')
  }

  return dictionary
}