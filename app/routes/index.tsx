import React from 'react'

import Terminal from '../components/Terminal'
import styles from 'styles/terminal.css';

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

function TerminalPage () {
  return (
    <div className="page-container">
      <Terminal />
    </div>
  )
}

export default TerminalPage
