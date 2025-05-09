import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

export function DateIcon(props: SvgProps) {
  return (
    <Svg
    //   width={20}
    //   height={23}
      viewBox="0 0 20 23"
    //   fill="none"
    //   xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M18 2.5h-1v-2h-2v2H5v-2H3v2H2c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-16c0-1.1-.9-2-2-2zm0 18H2v-11h16v11zm0-13H2v-3h16v3z"
        fill="#fff"
      />
    </Svg>
  )
}