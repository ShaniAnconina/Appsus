const { useState } = React

import { noteService } from "../services/note.service.js"


export function NoteAdd({ loadNotes }) {
    const [noteInfoToEdit, setNoteInfoToEdit] = useState(noteService.getEmptyNoteInfo())


    function handleChange({ target }) {
        let { value, name: field } = target
        setNoteInfoToEdit((prevNote) => ({ ...prevNote, [field]: value }))
    }

    function onSaveNote(ev) {
        ev.preventDefault()
        const note = noteService.getEmptyNote()
        note.info = noteInfoToEdit
        noteService.save(note)
            .then(() => {
                setNoteInfoToEdit(noteService.getEmptyNoteInfo())
                loadNotes()
            })
    }

    return <section className="note-add">
            <form onSubmit={onSaveNote}>
                <input type="text"
                    name="txt"
                    id="title"
                    value={noteInfoToEdit.txt}
                    onChange={handleChange}
                    onClick={(ev) => {ev.stopPropagation()}} 
                />
                <button onClick={(ev) => {ev.stopPropagation()}}  >Save</button>
            </form>
    </section >
}