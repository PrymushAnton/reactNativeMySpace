import * as React from "react"
import Svg, { Path, SvgProps, Rect } from "react-native-svg"

export function PlusIcon(props: SvgProps) {
  return (
    <Svg
      viewBox="0 0 40 40"
      {...props}
    >
      <Rect
        x={0.5}
        y={0.5}
        width={39}
        height={39}
        rx={19.5}
        stroke="#543C52"
        strokeOpacity={1}
      />
      <Path
        d="M26.49 21.08h-5.408v5.409a1.082 1.082 0 11-2.164 0V21.08H13.51a1.082 1.082 0 010-2.163h5.41v-5.409a1.082 1.082 0 012.163 0v5.409h5.408a1.082 1.082 0 010 2.163z"
        fill="#543C52"
        fillOpacity={1}
      />
    </Svg>
  )
}