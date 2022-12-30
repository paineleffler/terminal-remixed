import React from 'react'
import PropTypes from 'prop-types'

import Prefix from './Prefix'

export default function Line (props) {
  const { content, type, success } = props
  return (
    type === 'input'
      ? <span className="line-container">
        <Prefix success={success} />
        {content}
      </span>
      : <>{content}</>
  )
}

Line.propTypes = {
  content: PropTypes.string,
  type: PropTypes.string,
  success: PropTypes.bool
}
