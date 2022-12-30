import React, { useContext, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import {TerminalContext} from './TerminalContextProvider'
import Prefix from './Prefix'
import { StringMatching } from '../lib/StringMatching'

export default function Command (props) {
  const { success, type, branch, currentDirectory, changes } = props
  const {history, setHistory} = useContext(TerminalContext);

  const commandInput = useRef(null)

  const DISALLOWED_KEYCODES = [10, 13]

  useEffect(() => {
    commandInput.current.focus()
    commandInput.current.addEventListener('keydown', e => {
      if (DISALLOWED_KEYCODES.includes(e.keyCode)) {
        e.preventDefault()
      }
    })

    window.addEventListener('keydown', keyPressHandler)
    window.addEventListener('click', clickHandler)

    return () => {
      window.removeEventListener('keydown', keyPressHandler)
      window.removeEventListener('click', clickHandler)
    }
  }, [history])

  async function getOutput (command) {
    if (typeof StringMatching[command] === 'string') {
      return StringMatching[command]
    } else if (/^node text.js/.test(command)) {
      return `Not available yet. Feature is currently being remixed.`
    } else {
      return `zsh: command not found: ${command}`
    }
  }

  function clickHandler () {
    commandInput.current.focus()
  }

  async function keyPressHandler (keyEvent) {
    const { keyCode } = keyEvent
    const inputValue = commandInput.current.innerText
    const enterKeys = [10, 13]
    if (enterKeys.includes(keyCode)) {
      if (inputValue === 'clear' || inputValue === 'c') {
        setHistory([])
      } else if (inputValue === 'exit') {
        window.close()
      } else {
        setHistory([
          ...history,
          {
            type: 'input',
            content: inputValue,
            success: true
          },
          {
            type: 'output',
            content: await getOutput(inputValue),
            success: true
          }
        ])
      }
      commandInput.current.innerHTML = ''
    }
  }

  return (
    <span>
      <Prefix success={success} type={type} branch={branch} currentDirectory={currentDirectory} changes={changes} />
      <span className="command" tabIndex={0} ref={commandInput} contentEditable></span>
      <span className="cursor">█</span>
    </span>
  )
}

Prefix.propTypes = {
  success: PropTypes.bool,
  type: PropTypes.string,
  branch: PropTypes.string,
  currentDirectory: PropTypes.string,
  changes: PropTypes.bool
}

Prefix.defaultProps = {
  success: true,
  type: 'input',
  branch: 'main',
  currentDirectory: 'website',
  changes: false
}
