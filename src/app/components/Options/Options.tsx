import React, { useEffect, useRef, useState } from 'react'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Props {
  onKeySelect: (note: string) => void
  onIntervalSelect: (notes: string[]) => void
}

interface State {
  selectedKey: string
  isSharp: boolean
  scale: string
  intervals: string[]
  visibleNotes: string[]
}

const initialState: State = {
  selectedKey: '',
  isSharp: false,
  scale: 'MAJOR',
  intervals: [],
  visibleNotes: []
}

const Options = ({ onKeySelect: onKeySelect, onIntervalSelect: onIntervalSelect }: Props) => {
  const [options, setOptions] = useState<State>(initialState)

  const noteButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    let note = e.currentTarget.value.substring(0, 1)
    if (options.selectedKey.substring(0, 1) === note) {
      setOptions({ ...options, selectedKey: '', visibleNotes: [], intervals: [] })
      return
    }
    if (options.isSharp) {
      if (note !== 'E' && note !== 'B') {
        note += '#'
      }
    }
    const newVisibleNotes = getVisibleNotes(options.intervals, note, options.scale)
    setOptions({ ...options, selectedKey: note, visibleNotes: newVisibleNotes })
  }

  const sharpButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const selectedKey = options.selectedKey
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
      const newVisibleNotes = getVisibleNotes(options.intervals, note, options.scale)
      setOptions({ ...options, selectedKey: note, isSharp: !options.isSharp, visibleNotes: newVisibleNotes })
    }
  }

  const scaleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const newScale = e.currentTarget.value
    const newVisibleNotes = getVisibleNotes(options.intervals, options.selectedKey, newScale)
    setOptions({ ...options, scale: newScale, visibleNotes: newVisibleNotes })
  }

  const handleIntervalClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const newInterval = e.currentTarget.value
    let newIntervals = [...options.intervals]

    if (newIntervals.includes(newInterval)) {
      newIntervals = newIntervals.filter((i) => i !== newInterval)
    } else {
      newIntervals.push(newInterval)
    }

    const newVisibleNotes = getVisibleNotes(newIntervals, options.selectedKey, options.scale)

    setOptions({ ...options, intervals: newIntervals, visibleNotes: newVisibleNotes })
  }

  const prevIntervalsRef = useRef(JSON.stringify(options.visibleNotes))

  useEffect(() => {
    const currentIntervals = JSON.stringify(options.visibleNotes)
    if (prevIntervalsRef.current !== currentIntervals) {
      onIntervalSelect(options.visibleNotes);
      prevIntervalsRef.current = currentIntervals;
    }
    onKeySelect(options.selectedKey)
  }, [options, onKeySelect, onIntervalSelect])


  const getVisibleNotes = (intervals: string[], selectedKey: string, newScale: string = 'MAJOR') => {

    const newVisibleNotes: string[] = []
    const noteList = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

    intervals.forEach((interval) => {
      if (interval === '3') {
        const thirdSemitones = newScale === 'MAJOR' ? 4 : 3
        const noteIndex = noteList.indexOf(selectedKey)
        const third = noteList[(noteIndex + thirdSemitones) >= noteList.length ? noteIndex + thirdSemitones - noteList.length : noteIndex + thirdSemitones]
        newVisibleNotes.push(third)
      }

      if (interval === '5') {
        const fifthSemitones = 7
        const noteIndex = noteList.indexOf(selectedKey)
        const fifth = noteList[(noteIndex + fifthSemitones) >= noteList.length ? noteIndex + fifthSemitones - noteList.length : noteIndex + fifthSemitones]
        newVisibleNotes.push(fifth)
      }
    })

    return newVisibleNotes
  }

  return (
    <div className='flex flex-col gap-4'>
      
      <Tabs defaultValue='intervals' className='w-full flex align-center flex-col'>
        <TabsList>
          <TabsTrigger value='intervals'>Intervals</TabsTrigger>
          {/* <TabsTrigger value='scale'>Scale</TabsTrigger> */}
        </TabsList>
        <TabsContent value='intervals'>
          <Card>
            <CardContent className='flex flex-col gap-4 p-4'>
              <div className='flex flex-row gap-4 justify-center'>
                <Button variant={options.isSharp ? 'default' : 'outline'} value={'#'} onClick={sharpButtonClick}>#</Button>
                <Button variant={options.selectedKey.substring(0, 1) === 'C' ? 'default' : 'outline'} value={'C'} onClick={noteButtonClick}>C</Button>
                <Button variant={options.selectedKey.substring(0, 1) === 'D' ? 'default' : 'outline'} value={'D'} onClick={noteButtonClick}>D</Button>
                <Button variant={options.selectedKey === 'E' ? 'default' : 'outline'} value={'E'} onClick={noteButtonClick}>E</Button>
                <Button variant={options.selectedKey.substring(0, 1) === 'F' ? 'default' : 'outline'} value={'F'} onClick={noteButtonClick}>F</Button>
                <Button variant={options.selectedKey.substring(0, 1) === 'G' ? 'default' : 'outline'} value={'G'} onClick={noteButtonClick}>G</Button>
                <Button variant={options.selectedKey.substring(0, 1) === 'A' ? 'default' : 'outline'} value={'A'} onClick={noteButtonClick}>A</Button>
                <Button variant={options.selectedKey === 'B' ? 'default' : 'outline'} value={'B'} onClick={noteButtonClick}>B</Button>
              </div>
              <div className='flex flex-row gap-4 justify-center'>
                <Button disabled={!options.selectedKey} variant={options.scale === 'MAJOR' ? 'default' : 'outline'} value={'MAJOR'} onClick={scaleButtonClick}>Major</Button>
                <Button disabled={!options.selectedKey} variant={options.scale === 'MINOR' ? 'default' : 'outline'} value={'MINOR'} onClick={scaleButtonClick}>Minor</Button>
                <Button disabled={!options.selectedKey} variant={options.intervals.includes('3') ? 'default' : 'outline'} value={'3'} onClick={handleIntervalClick}>3</Button>
                <Button disabled={!options.selectedKey} variant={options.intervals.includes('5') ? 'default' : 'outline'} value={'5'} onClick={handleIntervalClick}>5</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value='scale'>
          <Card>
            <CardTitle>Scales coming soon!</CardTitle>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Options