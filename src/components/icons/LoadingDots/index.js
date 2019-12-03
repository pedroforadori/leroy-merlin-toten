import React from 'react'

import theme from '../../../styles/theme'

export default function LoadingDotsAnimation({
  width = 24,
  height = 24,
  color = theme.greenDefault
}) {
  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      class="lds-ellipsis"
    >
      {/* <!--circle(cx="16",cy="50",r="10")--> */}
      <circle cx="84" cy="50" r="0" fill={color}>
        <animate
          attributeName="r"
          values="8;0;0;0;0"
          keyTimes="0;0.25;0.5;0.75;1"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          calcMode="spline"
          dur="2s"
          repeatCount="indefinite"
          begin="0s"
        />
        <animate
          attributeName="cx"
          values="84;84;84;84;84"
          keyTimes="0;0.25;0.5;0.75;1"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          calcMode="spline"
          dur="2s"
          repeatCount="indefinite"
          begin="0s"
        />
      </circle>
      <circle cx="44.5492" cy="50" r="8" fill={color}>
        <animate
          attributeName="r"
          values="0;8;8;8;0"
          keyTimes="0;0.25;0.5;0.75;1"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          calcMode="spline"
          dur="2s"
          repeatCount="indefinite"
          begin="-1s"
        />
        <animate
          attributeName="cx"
          values="16;16;50;84;84"
          keyTimes="0;0.25;0.5;0.75;1"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          calcMode="spline"
          dur="2s"
          repeatCount="indefinite"
          begin="-1s"
        />
      </circle>
      <circle cx="16" cy="50" r="6.71746" fill={color}>
        <animate
          attributeName="r"
          values="0;8;8;8;0"
          keyTimes="0;0.25;0.5;0.75;1"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          calcMode="spline"
          dur="2s"
          repeatCount="indefinite"
          begin="-0.5s"
        />
        <animate
          attributeName="cx"
          values="16;16;50;84;84"
          keyTimes="0;0.25;0.5;0.75;1"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          calcMode="spline"
          dur="2s"
          repeatCount="indefinite"
          begin="-0.5s"
        />
      </circle>
      <circle cx="84" cy="50" r="1.28254" fill={color}>
        <animate
          attributeName="r"
          values="0;8;8;8;0"
          keyTimes="0;0.25;0.5;0.75;1"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          calcMode="spline"
          dur="2s"
          repeatCount="indefinite"
          begin="0s"
        />
        <animate
          attributeName="cx"
          values="16;16;50;84;84"
          keyTimes="0;0.25;0.5;0.75;1"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          calcMode="spline"
          dur="2s"
          repeatCount="indefinite"
          begin="0s"
        />
      </circle>
      <circle cx="78.5492" cy="50" r="8" fill={color}>
        <animate
          attributeName="r"
          values="0;0;8;8;8"
          keyTimes="0;0.25;0.5;0.75;1"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          calcMode="spline"
          dur="2s"
          repeatCount="indefinite"
          begin="0s"
        />
        <animate
          attributeName="cx"
          values="16;16;16;50;84"
          keyTimes="0;0.25;0.5;0.75;1"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          calcMode="spline"
          dur="2s"
          repeatCount="indefinite"
          begin="0s"
        />
      </circle>
    </svg>
  )
}
