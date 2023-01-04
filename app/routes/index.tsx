import React from 'react'
import { json } from "@remix-run/node";
import twilio from 'twilio';

import Terminal from '../components/Terminal'
import styles from 'styles/terminal.css';

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export async function action({ request }) {
  const client = new twilio(process.env.SID, process.env.TOKEN)
  const text = (await request.formData()).get('text');
  if (!text) {
    return json({ error : 'no input' })
  }
  try {
    await client.messages.create({
      body: text,
      to: process.env.MY_NUMBER,
      from: process.env.TWILIO_NUMBER
    })
    return json({ ok: 'Message was sent.' });
  } catch (error) {
    return json({ error: 'error making request' });
  }
}

function TerminalPage () {
  return (
    <div className="page-container">
      <Terminal />
    </div>
  )
}

export default TerminalPage
