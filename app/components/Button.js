import React from 'react'

export default function Button({ children, ...props }) {
  return (
    <button className="mdl-button mdl-button--raised mdl-button--colored" {...props}>
      {children}
    </button>
  )
}
