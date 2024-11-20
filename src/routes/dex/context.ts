import React from 'react'
import { UsageData } from '~/types/usage'

export const DexContext = React.createContext<UsageData | null>(null)

export const useCurrentDexItem = () => React.useContext(DexContext) as UsageData
