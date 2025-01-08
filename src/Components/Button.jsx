import React from 'react'

function Button({bgcolour,onClickFunc,text}) {
  return (
    <button onClick={onClickFunc} className={`${bgcolour} text-white px-4 py-2 rounded-md text-lg font-semibold`}>
      {text}
    </button>
  )
}

export default Button