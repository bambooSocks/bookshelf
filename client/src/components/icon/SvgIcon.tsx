import React from "react"

interface Props {
  svg: string
  size: string
}

export const SvgIcon: React.FC<Props> = ({svg, size}) => {
  return (
    <div style={{display: "flex", justifyContent: "center", alignContent: "center"}}>
      <img src={svg} height={size} />
    </div>
  )
}
