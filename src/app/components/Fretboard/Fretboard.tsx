'use client'
import React, { useState } from 'react'
import styles from './Fretboard.module.scss'
import Options from '../Options/Options'

type Props = {
    frets: number,
    tuning: string[],
}

const Fretboard = ({ frets, tuning }: Props) => {
    const [selectedKey, setSelectedKey] = useState('');
    const [visibleNotes, setVisibleNotes] = useState<string[]>([]);

    const createChromaticScale = (startingNote: string, length: number) => {
        const chromaticScale = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
        const startingNoteIndex = chromaticScale.indexOf(startingNote.toUpperCase())

        return Array.from({ length }, (_, i) => chromaticScale[(startingNoteIndex + i + 1) % chromaticScale.length])
    }

    const stringNotes = tuning.map((note) => {
        return createChromaticScale(note, frets + 1)
    })

    const handleNoteSelect = (note: string) => {
        setSelectedKey(note)
    }

    const handleVisibleNotes = (notes: string[]) => {
        setVisibleNotes(notes)
    }

    return (
        <div className="w-full flex flex-col gap-4">
            <Options onKeySelect={handleNoteSelect} onIntervalSelect={handleVisibleNotes}/>
            <div className='w-full flex flex-row'>
                <div className="flex flex-col-reverse justify-end">
                    {
                        tuning.map((note, index) => {
                            return (
                                <div key={`${note}-${index}`} className={`${styles.fret} w-1/12 flex flex-col gap-2 border-l border-white`}>
                                    <div className="relative flex items-center justify-center border-white py-2">
                                        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-1 bg-white"></span>
                                        <div className="relative w-6 h-6 flex items-center justify-center p-3 py-1 rounded-[100%] bg-slate-800">
                                            <div className="text-white text-[10px]">
                                                {note.toUpperCase()}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="w-full flex flex-col-reverse">
                    <div className="w-full flex flex-row pt-4">
                        {
                            Array.from({ length: frets + 1 }).map((_, index) => {
                                return (
                                    <div key={index} className="w-1/12 flex items-center justify-center">
                                        <div className="relative flex items-center justify-center border-white">
                                            <span>{index + 1}</span>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    {
                        stringNotes.map((notes, index) => {
                            return (
                                <div key={index} className="flex flex-row grow">
                                    {
                                        notes.map((note, index) => {
                                            // check if there's a selected key, and if the note is the same as the selected key or if the note is in the visible notes
                                            const isVisible = (selectedKey == '') || (note === selectedKey) || visibleNotes.includes(note)
                                            return (
                                                <div key={`${note}-${index}`} className="note relative flex items-center justify-center grow shrink border-l py-2">
                                                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-slate-200"></span>

                                                    <div className={`relative w-6 h-6 flex items-center justify-center p-3 py-1 rounded-[100%] bg-slate-800 ${isVisible ? '' : 'opacity-20'}`}>
                                                        {
                                                            <div className="text-white text-[10px]">
                                                                {note}
                                                            </div>
                                                        }
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            )
                        })
                    }

                </div>
            </div>

        </div>
    )
}

export default Fretboard