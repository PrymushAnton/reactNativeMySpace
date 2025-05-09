import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

export function LikeIcon(props: SvgProps) {
  return (
    <Svg
      viewBox="0 0 22 20"
      {...props}
    >
      {/* <Path
        d="M22 9a2 2 0 00-2-2h-6.32l.96-4.57c.02-.1.03-.21.03-.32 0-.41-.17-.79-.44-1.06L13.17 0 6.59 6.58C6.22 6.95 6 7.45 6 8v10a2 2 0 002 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73V9zM0 20h4V8H0v12z"
        fill="#fff"
      /> */}
    </Svg>
  )
}

