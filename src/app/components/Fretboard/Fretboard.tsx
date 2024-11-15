import React from 'react'
import styles from './Fretboard.module.scss'

type Props = {
    frets: number,
    tuning: string[],
}

const Fretboard = ({ frets, tuning }: Props) => {

    const createChromaticScale = (startingNote: string, length: number) => {
        const chromaticScale = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
        const startingNoteIndex = chromaticScale.indexOf(startingNote.toUpperCase())

        return Array.from({ length }, (_, i) => chromaticScale[(startingNoteIndex + i + 1) % chromaticScale.length])
    }

    const stringNotes = tuning.map((note) => {

        return createChromaticScale(note, frets + 1)
    })

    return (
        <div className='w-full flex flex-row'>
            <div className="flex flex-col-reverse gap-2">
                {
                    tuning.map((note, index) => {
                        return (
                            <div key={`${note}-${index}`} className={`${styles.fret} w-1/12 flex flex-col gap-2 border-l border-white`}>
                                <div className="relative flex items-center justify-center border-white">
                                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-1 bg-white"></span>
                                    <div className="relative flex p-3 py-1 rounded-[100%] bg-slate-800">
                                        <span className="text-white">
                                            {note}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className="w-full flex flex-col-reverse">
                {
                    stringNotes.map((notes, index) => {
                        return (
                            <div key={index} className="flex flex-row grow">
                                {
                                    notes.map((note, index) => {
                                        return (
                                            <div key={`${note}-${index}`} className="note relative flex items-center justify-center grow border-l">
                                                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-white"></span>
                                                <div className="relative w-6 h-6 flex items-center justify-center p-3 py-1 rounded-[100%] bg-slate-800">
                                                    <div className="text-white text-[10px]">
                                                        {note}
                                                    </div>
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
    )
}

export default Fretboard