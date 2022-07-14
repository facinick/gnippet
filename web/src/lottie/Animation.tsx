import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import Lottie from 'react-lottie'

interface Props {
  animationDataJSON: JSON
  loop?: boolean
  autoplay?: boolean
  width?: number
  height?: number
}

interface Ref {
  play: () => void
  pause: () => void
  stop: () => void
  replay: () => void
  toggle: () => void
}

const LottieAnimation = forwardRef<Ref, Props>(
  (
    { animationDataJSON, loop = true, autoplay = true, width, height }: Props,
    ref
  ) => {
    const lottieRef = useRef()
    const [stopped, setStopped] = useState(true)
    const [paused, setPaused] = useState(true)

    const play = () => {
      setPaused(false)
      setStopped(false)
    }

    const replay = () => {
      stop()
      setPaused(false)
      setStopped(false)
    }

    const pause = () => {
      setPaused(true)
    }

    const toggle = () => {
      setPaused((paused) => !paused)
    }

    const stop = async () => {
      setStopped(true)
    }

    useImperativeHandle(ref, () => ({
      play,
      pause,
      stop,
      replay,
      toggle,
    }))

    const defaultOptions = {
      loop,
      autoplay,
      animationData: animationDataJSON,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
      },
      isClickToPauseDisabled: false,
    }

    return (
      <Lottie
        ref={lottieRef}
        options={defaultOptions}
        style={{
          height: height ? height : '100%',
          width: width ? width : '100%',
        }}
        isStopped={stopped}
        isPaused={paused}
      />
    )
  }
)

export default LottieAnimation
