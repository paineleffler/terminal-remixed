import React from 'react'
import { Link } from "@remix-run/react";

import styles from "styles/notfound.css";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export default function NotFound () {
  return (
    <div className="container">
      <h1 className="title">404</h1>
      <h2 className="subtitle">You're not supposed to be here...</h2>
      <Link className="link" to={'/'}>Go back</Link>
    </div>
  )
}
