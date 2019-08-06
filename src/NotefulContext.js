import React from 'react'

const NotefulContext = React.createContext({
    notes: [],
    folders: [],
    getNotesForFolder: () => {},
    findNote: () => {},
    findFolder: () => {},
    addFolder: () => {},
    addNote: () => {},
    deleteNote: () => {},
    deleteFolder: () => {}
})

export default NotefulContext