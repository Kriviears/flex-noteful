export const findFolder = (folders=[], folderId) =>
  folders.find(folder => folder.id === folderId)

export const findNote = (notes=[], noteId) =>
  notes.find(note => note.id === noteId)

export const getNotesForFolder = (notes=[], folderId) => (
  (!folderId)
    ? notes
    : notes.filter(note => note.folderId === folderId)
)

export const countNotesForFolder = (notes=[], folderId) =>
  notes.filter(note => note.folderId === folderId).length

export const handleAddFolder = folder => {
  this.setState({
    folders: [
      ...this.state.folders, folder
    ]
  })
}

export const handleAddNote = note => {
  this.setState({
    notes: [
      ...this.state.notes, note
    ]
  })
}

export const handleDeleteNote = noteId => {
  console.log(`deleting from ${this.state}`)
  this.setState({
    notes: this.state.notes.folder(note => note.id !== noteId)
  })
}