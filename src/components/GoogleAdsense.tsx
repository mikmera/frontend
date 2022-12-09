import React, { useEffect } from 'react'
import { Adsense } from '@ctrl/react-adsense'

export const GoogleAdsense: React.FC = () => {
  return (
    <Adsense
      client="ca-pub-8773700446981720"
      slot="6420350414"
      style={{ width: 500, height: 300 }}
      format="auto"
    />
  )
}
