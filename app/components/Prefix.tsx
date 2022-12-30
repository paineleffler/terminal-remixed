import React from 'react'
import PropTypes from 'prop-types'

export default function Prefix (props) {
  const { success } = props

  return (
    <>
      <span className="arrow" data-success={success}>→</span>
      <span className="current-directory">website</span>
      <span className="git">git:(<span className="branch">main</span>)</span>
    </>
  )
}

Prefix.propTypes = {
  success: PropTypes.bool
}
