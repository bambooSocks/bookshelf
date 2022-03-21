import React, {ReactNode, useEffect, useState} from "react"
import ReactPlayer from "react-player"
import styled from "styled-components"
import {SvgIcon} from "../icon/SvgIcon"
import PlaySVG from "../icon/play.svg"
import PauseSVG from "../icon/pause.svg"
import Repeat30sSVG from "../icon/repeat30s.svg"
import Forward30sSVG from "../icon/forward30s.svg"
import SlideDownSVG from "../icon/slidedown.svg"
import SlideUpSVG from "../icon/slideup.svg"
import {atom, useRecoilState} from "recoil"
import {Button, Slider} from "antd"
import {useMediaQuery} from "react-responsive"

interface PlayerState {
  show: boolean
  play: boolean
  title: string
  url: string
  cover: string
}

export const playerState = atom<PlayerState>({
  key: "playerState",
  default: {show: false, play: false, title: "", cover: "", url: ""}
})

const PlayerContainer = styled.div`
  @media only screen and (min-width: 768px) {
    height: 100px;
  }
  display: flex;
  justify-content: center;
  position: sticky;
  bottom: 0;
  width: 100%;
  background-color: #001529;
  z-index: 100;
  padding: 40px 0;
`

const PlayerDashboard = styled.div`
  @media only screen and (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  width: 700px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
  margin: 0 5px;
  align-items: center;
  justify-content: center;
`

const ControlsContainer = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
`

const SliderContainer = styled.div`
  @media only screen and (min-width: 768px) {
    width: 100%;
  }
  width: 90%;
`

const DetailsContainer = styled.div`
  flex-direction: row;
  justify-content: space-between;
  color: white;
  padding: 2px 10px;
  display: flex;
  gap: 5px;
`

export const Player: React.FC = () => {
  const [plState, setPlState] = useRecoilState(playerState)
  const [player, setPlayer] = useState<ReactPlayer>()
  const [playing, setPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [played, setPlayed] = useState(0)
  const [expanded, setExpanded] = useState(true)

  const isLargeScreen = useMediaQuery({query: "only screen and (min-width: 768px)"})

  const secondsToTime = (seconds: number) => {
    const secs = Math.floor(seconds % 60)
    const mins = Math.floor(seconds / 60) % 60
    const hours = Math.floor(seconds / 3600)
    return hours + ":" + mins.toString().padStart(2, "0") + ":" + secs.toString().padStart(2, "0")
  }

  useEffect(() => {
    if (plState.play) setPlaying(true)
  }, [plState])

  return plState.show ? (
    <PlayerContainer>
      <PlayerDashboard>
        {!isLargeScreen && (
          <div
            style={{margin: "-45px 0 -30px", cursor: "pointer"}}
            onClick={() => setExpanded((old) => !old)}
          >
            <SvgIcon svg={expanded ? SlideDownSVG : SlideUpSVG} size={expanded ? "64px" : "56px"} />
          </div>
        )}
        {!isLargeScreen && expanded && <img src={plState.cover} width="90%" />}
        <ControlsContainer>
          <Button
            type="text"
            size="large"
            shape="circle"
            icon={<SvgIcon svg={Repeat30sSVG} size="32px" />}
            onClick={() => player?.seekTo(played - 30 < 0 ? 0 : played - 30, "seconds")}
          />
          <Button
            style={
              isLargeScreen || expanded
                ? {height: "64px", width: "64px"}
                : {height: "48px", width: "48px"}
            }
            shape="circle"
            icon={
              <div style={{marginTop: "1px"}}>
                <SvgIcon
                  svg={playing ? PauseSVG : PlaySVG}
                  size={isLargeScreen || expanded ? "40px" : "32px"}
                />
              </div>
            }
            onClick={() => setPlaying((old) => !old)}
          />
          <Button
            type="text"
            size="large"
            shape="circle"
            icon={<SvgIcon svg={Forward30sSVG} size="32px" />}
            onClick={() =>
              player?.seekTo(played + 30 > duration ? duration : played + 30, "seconds")
            }
          />
        </ControlsContainer>
        {isLargeScreen || expanded ? (
          <SliderContainer>
            <DetailsContainer>
              <div>{plState.title}</div>
              <div>
                {secondsToTime(played)} / {secondsToTime(duration)}
              </div>
            </DetailsContainer>
            <Slider
              min={0}
              max={duration}
              value={played}
              onChange={(e) => player?.seekTo(e, "seconds")}
              tipFormatter={(sec?: number) => secondsToTime(sec ?? 0)}
            />
          </SliderContainer>
        ) : (
          <DetailsContainer style={{gap: "25px", margin: "-5px 0 -15px"}}>
            <div>{plState.title}</div>
            <div>
              {secondsToTime(played)} / {secondsToTime(duration)}
            </div>
          </DetailsContainer>
        )}
        {isLargeScreen && <img src={plState.cover} height="75px" />}
      </PlayerDashboard>
      <ReactPlayer
        ref={(p) => setPlayer(p ?? undefined)}
        url={plState.url}
        playing={playing}
        onProgress={(e) => setPlayed(e.playedSeconds)}
        onSeek={(s) => setPlayed(s)}
        onDuration={(e) => setDuration(e)}
        style={{display: "none"}}
      />
    </PlayerContainer>
  ) : (
    <></>
  )
}
