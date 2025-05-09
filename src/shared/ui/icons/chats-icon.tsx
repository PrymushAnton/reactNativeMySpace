import * as React from "react"
import Svg, { Path, Rect, SvgProps } from "react-native-svg"

export function ChatsIcon(props: SvgProps) {
    return (
      <Svg
        viewBox="0 0 26 26"
        {...props}
      >
        <Path
          d="M2.985 16a7.515 7.515 0 0115.03 0v4.782c0 .796 0 1.193-.118 1.511a1.88 1.88 0 01-1.104 1.104c-.318.118-.716.118-1.511.118H10.5A7.515 7.515 0 012.985 16z"
          strokeWidth={1.66667}
          strokeOpacity={1}
        />
        <Path
          d="M7.682 15.06h5.636M10.5 18.819h2.818"
          // stroke="color(display-p3 .0275 .0392 .1098)"
          strokeWidth={1.66667}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity={1}
        />
        <Rect
          x={10.375}
          y={1.875}
          width={14.25}
          height={14.25}
          rx={7.125}
          // fill="color(display-p3 .9569 .2471 .3686)"
          fillOpacity={1}
        />
        <Rect
          x={10.375}
          y={1.875}
          width={14.25}
          height={14.25}
          rx={7.125}
          stroke="#fff"
          strokeWidth={2.25}
          strokeOpacity={1}
        />
        <Path
          d="M15.295 12.063v-1.08l1.8-1.854c.354-.366.621-.654.801-.864.186-.216.312-.396.378-.54a.942.942 0 00.108-.423c0-.246-.081-.438-.243-.576a.842.842 0 00-.594-.216c-.246 0-.465.072-.657.216-.192.138-.333.351-.423.639l-1.215-.396c.072-.348.222-.651.45-.909s.504-.456.828-.594a2.477 2.477 0 011.017-.216c.444 0 .834.078 1.17.234.336.156.597.375.783.657.186.282.279.612.279.99 0 .24-.042.477-.126.711a2.94 2.94 0 01-.387.702 6.75 6.75 0 01-.657.765l-1.539 1.584h2.772v1.17h-4.545z"
          fill="#fff"
          fillOpacity={1}
        />
      </Svg>
    )
}