import React, { useState } from 'react'

import { Button } from "@/components/ui/button"

interface Props {
  onKeySelect: (note: string) => void
  onIntervalSelect: (note: string) => void
}

const Options = ({ onKeySelect: onKeySelect, onIntervalSelect: onIntervalSelect }: Props) => {
  const [selectedKey, setSelectedKey] = useState('')
  const [isSharp, setIsSharp] = useState(false)
  const [scale, setScale] = useState('MAJOR')
  const [interval, setInterval] = useState<string[]>([])

  const noteButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    let note = e.currentTarget.value.substring(0, 1)
    if (selectedKey.substring(0, 1) === note) {
      setSelectedKey('')
      onKeySelect('')
      return
    }
    if (isSharp) {
      if (note !== 'E' && note !== 'B') {
        note += '#'
      }
    }
    setSelectedKey(note)
    onKeySelect(note)
  }

  const sharpButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsSharp(!isSharp)
    if (selectedKey) {
      if (selectedKey == 'E' || selectedKey == 'B') {
        return
      }
      let note = selectedKey
      if (selectedKey.endsWith('#')) {
        note = selectedKey.slice(0, -1)
      } else {
        note += '#'
      }

      setSelectedKey(note)
      onKeySelect(note)
    }
  }

  const scaleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const newScale = e.currentTarget.value
    setScale(newScale)
  }

  const handleIntervalClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const newInterval = e.currentTarget.value
    let newIntervals = [...interval]

    if (newIntervals.includes(newInterval)) {
      newIntervals = newIntervals.filter((i) => i !== newInterval)
    } else {
      newIntervals.push(newInterval)
    }

    setInterval(newIntervals)

    if (newInterval === '3') {
      const thirdSemitones = scale === 'MAJOR' ? 4 : 3
      const noteIndex = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'].indexOf(selectedKey[0])
      const third = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'][(noteIndex + thirdSemitones)]
      onIntervalSelect(third)
    }

    if (newInterval === '5') {
      const fifthSemitones = 7
      const noteIndex = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'].indexOf(selectedKey[0])
      const fifth = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'][(noteIndex + fifthSemitones)]
      onIntervalSelect(fifth)
    }
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-row gap-4 justify-center pb-8'>
        <Button variant={isSharp ? 'default' : 'outline'} value={'#'} onClick={sharpButtonClick}>#</Button>
        <Button variant={selectedKey.substring(0, 1) === 'C' ? 'default' : 'outline'} value={'C'} onClick={noteButtonClick}>C</Button>
        <Button variant={selectedKey.substring(0, 1) === 'D' ? 'default' : 'outline'} value={'D'} onClick={noteButtonClick}>D</Button>
        <Button variant={selectedKey === 'E' ? 'default' : 'outline'} value={'E'} onClick={noteButtonClick}>E</Button>
        <Button variant={selectedKey.substring(0, 1) === 'F' ? 'default' : 'outline'} value={'F'} onClick={noteButtonClick}>F</Button>
        <Button variant={selectedKey.substring(0, 1) === 'G' ? 'default' : 'outline'} value={'G'} onClick={noteButtonClick}>G</Button>
        <Button variant={selectedKey.substring(0, 1) === 'A' ? 'default' : 'outline'} value={'A'} onClick={noteButtonClick}>A</Button>
        <Button variant={selectedKey === 'B' ? 'default' : 'outline'} value={'B'} onClick={noteButtonClick}>B</Button>
      </div>
      <div className='flex flex-row gap-4 justify-center pb-8'>
        <Button disabled={!selectedKey} variant={scale === 'MAJOR' ? 'default' : 'outline'} value={'MAJOR'} onClick={scaleButtonClick}>Major</Button>
        <Button disabled={!selectedKey} variant={scale === 'MINOR' ? 'default' : 'outline'} value={'MINOR'} onClick={scaleButtonClick}>Minor</Button>
        <Button disabled={!selectedKey} variant={interval.includes('3') ? 'default' : 'outline'} value={'3'} onClick={handleIntervalClick}>3</Button>
        <Button disabled={!selectedKey} variant={interval.includes('5') ? 'default' : 'outline'} value={'5'} onClick={handleIntervalClick}>5</Button>

      </div>
    </div>
  )
}

export default Options