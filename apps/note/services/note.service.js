import { storageService } from "../../../services/async-storage.service.js"
import { utilService } from "../../../services/util.service.js"

const NOTE_KEY = 'noteDB'
_createNote()

export const noteService = {
    query,
    remove,
    save,
    get,
    getEmptyNoteInfoForTxt,
    getEmptyNoteInfoForImg,
    getEmptyNoteInfoForTodos,
    getEmptyNoteTxt,
    getEmptyNoteImg,
    getEmptyNoteTodos,

}

function save(note) {
    if (note.id) {
        return storageService.put(NOTE_KEY, note)
    } else {
        if (note.type === 'note-todos') note.info.todos.forEach((todo) => todo.id = utilService.makeId())
        return storageService.post(NOTE_KEY, note)
    }
}

function get(id) {
    return storageService.get(NOTE_KEY, id)
}

function getEmptyNoteInfoForTxt() {
    return { txt: '' }
}

function getEmptyNoteInfoForImg() {
    return { title: '', url: '' }
}

function getEmptyNoteInfoForTodos() {
    return { title: '', todos: [] }
}

function getEmptyNoteTxt() {
    return {
        type: "note-txt", isPinned: false, style: { backgroundColor: utilService.getRandomColor() }
    }
}

function getEmptyNoteImg() {
    return {
        type: "note-img", isPinned: false, style: { backgroundColor: utilService.getRandomColor() }
    }
}

function getEmptyNoteTodos() {
    return {
        type: "note-todos", isPinned: false, style: { backgroundColor: utilService.getRandomColor() }
    }
}

function remove(id) {
    return storageService.remove(NOTE_KEY, id)
}

function query() {
    return storageService.query(NOTE_KEY)
}

function _createNote() {
    let notes = utilService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        notes = [
            {
                id: 'n101',
                createdAt: 1112222,
                type: 'note-txt',
                isPinned: true,
                style: { backgroundColor: '#00d' },
                info: { txt: 'Fullstack Me Baby!' }
            },

            {
                id: 'n102',
                type: 'note-img',
                isPinned: false,
                info: {
                    url: 'https://flxt.tmsimg.com/assets/p185008_b_h10_ai.jpg',
                    title: 'Bobi and Me'
                },
                style: { backgroundColor: '#00d' }
            },
            {
                id: 'n103'
                , type: 'note-todos',
                isPinned: false,
                info: {
                    title: 'Get my stuff together',
                    todos: [{

                        txt: 'Driving liscence',
                        doneAt: null
                    },
                    {
                        txt: 'Coding power',
                        doneAt: 187111111
                    }]
                }
            }
        ]

        notes.forEach((note) => {
            note.style = { backgroundColor: utilService.getRandomColor() }
            if (note.type === 'note-todos') note.info.todos.forEach((todo) => todo.id = utilService.makeId())
        })
        utilService.saveToStorage(NOTE_KEY, notes)
    }
}