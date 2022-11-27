import React from 'react'
import { Usage } from '~/types'

export const DexContext = React.createContext<Usage | null>(null)

export const useCurrentDexItem = () => React.useContext(DexContext) as Usage
