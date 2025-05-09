import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

export function SeenIcon(props: SvgProps) {
    return (
        <Svg
            viewBox="0 0 20 20"
            {...props}
        >
            <Path
                d="M13 10a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                stroke="#81818D"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeOpacity={1}
            />
            <Path
                d="M2.167 10C3.5 6.586 6.612 4.167 10.5 4.167c3.886 0 7 2.419 8.333 5.833-1.333 3.414-4.446 5.833-8.333 5.833-3.887 0-7-2.419-8.334-5.833z"
                stroke="#81818D"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeOpacity={1}
            />
        </Svg>
    )
}


