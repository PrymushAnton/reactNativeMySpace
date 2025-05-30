import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

export function EyeCrossedIcon(props: SvgProps) {
  return (
    <Svg
    //   width={22}
    //   height={19}
      viewBox="0 0 22 19"
    //   fill="none"
    //   xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M10.83 6L14 9.16V9a3 3 0 00-3-3h-.17zm-4.3.8l1.55 1.55C8.03 8.56 8 8.77 8 9a3 3 0 003 3c.22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53a5 5 0 01-5-5c0-.79.2-1.53.53-2.2zM1 1.27l2.28 2.28.45.45C2.08 5.3.78 7 0 9c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.43.42L18.73 19 20 17.73 2.27 0M11 4a5 5 0 015 5c0 .64-.13 1.26-.36 1.82l2.93 2.93c1.5-1.25 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-4 .7l2.17 2.15C9.74 4.13 10.35 4 11 4z"
        fill="#81818D"
      />
    </Svg>
  )
}
