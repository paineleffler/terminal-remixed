import React, {useState, useMemo, createContext} from "react";

export const TerminalContext = createContext({});

export function TerminalContextProvider({children}) {
  const defaultHistory = [
    {
      type: 'input',
      content: 'cat hello.txt',
      success: true
    }, {
      type: 'output',
      content: 'Hi! I\'m Paine and welcome to my terminal. There is still a lot missing but bear with me. Now migrated to Remix & Netlify (Dec 2022). Real updates and improvements may come later.'
    },
  ];

  const [history, setHistory] = useState(defaultHistory);
  const [command, setCommand] = useState('');

  const value = useMemo(() => ({
    history,
    setHistory,
    command,
    setCommand,
    }), [history]);

  return (
    <TerminalContext.Provider value={value}>
      {children}
    </TerminalContext.Provider>
  )
}