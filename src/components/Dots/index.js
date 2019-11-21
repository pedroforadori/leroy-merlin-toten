import React from 'react'

import theme from '../../styles/theme'

const Dot = props => (
  <span
    style={{
      display: 'inline-block',
      height: '10px',
      width: '10px',
      borderRadius: '5px',
      backgroundColor: theme.primaryDefault,
      margin: '7px 5px',
      opacity: props.selected ? '1' : '0.5',
      transitionDuration: '300ms'
    }}
  />
)

const IndicatorDots = props => {
  const wrapperStyle = {
    position: 'absolute',
    width: '100%',
    zIndex: '100',
    bottom: '20px',
    textAlign: 'center'
  }

  if (props.total < 2) {
    // Hide dots when there is only one dot.
    return <div style={wrapperStyle} />
  } else {
    return (
      <div style={wrapperStyle}>
        {Array.apply(null, Array(props.total)).map((x, i) => {
          return <Dot key={i} selected={props.index === i} />
        })}
      </div>
    )
  }
}

export default IndicatorDots
