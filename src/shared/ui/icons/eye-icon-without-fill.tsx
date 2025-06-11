import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

export function EyeIconWithoutFill(props: SvgProps) {
  return (
    <Svg
    //   width={19}
    //   height={14}
      viewBox="0 0 19 14"
    //   fill="none"
      {...props}
    >
      <Path
        d="M1.225 7s2.5-5.833 8.333-5.833S17.89 7 17.89 7s-2.5 5.833-8.333 5.833S1.225 7 1.225 7z"
        stroke="#543C52"
        // strokeWidth={2}
        // strokeLinecap="round"
        // strokeLinejoin="round"
        // strokeOpacity={1}
      />
      <Path
        d="M9.558 9.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
        stroke="#FFFFFF"
        // strokeWidth={2}
        // strokeLinecap="round"
        // strokeLinejoin="round"
        // strokeOpacity={1}
      />
    </Svg>
  )
}

