import React from 'react'
import { ifosConfig } from 'config/constants'
import { Ifo } from 'config/constants/types'
import IfoCard from './components/IfoCard'
import IfoCards from './components/IfoCards'

const inactiveIfo: Ifo[] = ifosConfig.filter((ifo) => !ifo.isActive)
const inactiveIfo2: Ifo[] = ifosConfig.filter((ifo) => !ifo.isActive2)

const PastIfo = () => {
  return (
    <IfoCards>
      {inactiveIfo.map((ifo) => (
        <IfoCard key={ifo.id} ifo={ifo} />
      ))}
      {inactiveIfo2.map((ifo) => (
        <IfoCard key={ifo.id} ifo={ifo} />
      ))}
    </IfoCards>
  )
}

export default PastIfo
