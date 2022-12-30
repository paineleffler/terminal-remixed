import React from 'react'

import { TerminalContextProvider } from './TerminalContextProvider'
import History from './History'
import Command from './Command'

export default function Terminal () {
  return (
    <TerminalContextProvider>
      <div className="terminal-container">
        <History />
        <Command />
      </div>
    </TerminalContextProvider>
  )
}
