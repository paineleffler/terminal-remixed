import React, { useContext } from 'react'

import {TerminalContext} from './TerminalContextProvider'
import Line from './Line'

export default function History () {
  const {history} = useContext(TerminalContext)

  return (
    history.map(({type, content, success}, index) => {
      return <Line type={type} content={content} success={success} key={index} />
    })
  )
}
