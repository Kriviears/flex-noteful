import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NotefulContext from './NotefulContext'
import NoteListNav from './NoteListNav/NoteListNav'
import NotePageNav from './NotePageNav/NotePageNav'
import NoteListMain from './NoteListMain/NoteListMain'
import NotePageMain from './NotePageMain/NotePageMain'
import AddFolder from './AddFolder/AddFolder'
import AddNote from './AddNote/AddNote'
import { getNotesForFolder,
         findNote, 
         findFolder } from './helper-functions'
import './App.css'
import config from './config'




class App extends Component {
  state = {
    notes: [],
    folders: [],
  };

  handleAddFolder = folder => {
    this.setState({
      folders: [
        ...this.state.folders, folder
      ]
    })
  }
  
  handleAddNote = note => {
    this.setState({
      notes: [
        ...this.state.notes, note
      ]
    })
  }
  
  handleDeleteNote = noteId => {
    console.log(`deleting from ${this.state}`)
    this.setState({
      notes: this.state.notes.filter(note => note.id !== noteId)
    })
  }

  handleDeleteFolder = folderId => {
    console.log(`deleting from ${this.state}`)
    this.setState({
      folders: this.state.folders.filter(folder => folder.id !== folderId)
    })
  }

  
  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/notes`),
      fetch(`${config.API_ENDPOINT}/folders`)
    ])
      .then(([notesRes, foldersRes])=> {
        if(!notesRes.ok)
          return notesRes.json().then(e => Promise.reject(e))
        if(!foldersRes.ok)
          return foldersRes.json().then(e =>Promise.reject(e))
      return Promise.all([
        notesRes.json(),
        foldersRes.json()
      ])
    })
    .then(([notes, folders])=>{
      const cNotes = [];
      const cFolders = [];
      notes.map(note =>(
        cNotes.push({
        "id": String(note.id),
        "name": note.title,
        "content": note.content,
        "folderId": String(note.folder_id),
        "modified": note.updated,
      })));
      folders.map(folder =>(
        cFolders.push({
          "id": String(folder.id),
          "name": String(folder.title)
        })
      ));

      this.setState({notes:cNotes, folders:cFolders})
      //console.log(this.state);
    })
    .catch(error =>{
      console.error({ error })
    })
  }


  renderNavRoutes() {
    return (
      <>
        {['/', '/folder/:folderId'].map(path =>
          <Route
            exact
            key={path}
            path={path}
            component={NoteListNav}
          />
        )}
        <Route
          path='/note/:noteId'
          component={NotePageNav}
        />
        <Route
          path='/add-folder'
          component={NotePageNav}
        />
        <Route
          path='/add-note'
          component={NotePageNav}
        />
      </>
    )
  }

  renderMainRoutes() {
    return (
      <>
        {['/', '/folder/:folderId'].map(path =>
          <Route
            exact
            key={path}
            path={path}
            component={NoteListMain}
          />
        )}
        <Route
          path='/note/:noteId'
          component={NotePageMain}
        />
        <Route
          path='/add-folder'
          component={AddFolder}
        />
        <Route
          path='/add-note'
          component={AddNote}
        />
      </>
    )
  }

  render() {
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
      getNotesForFolder: getNotesForFolder,
      findNote: findNote,
      findFolder: findFolder,
      addFolder: this.handleAddFolder,
      addNote: this.handleAddNote,
      deleteNote: this.handleDeleteNote,
      deleteFolder: this.handleDeleteFolder
    }

    return (
      <NotefulContext.Provider value={contextValue}>
        <div className='App'>
          <nav className='App__nav'>
            {this.renderNavRoutes()}
          </nav>
          <header className='App__header'>
            <h1>
              <Link to='/'>Noteful</Link>
              {' '}
              <FontAwesomeIcon icon='check-double' />
            </h1>
          </header>
          <main className='App__main'>
            {this.renderMainRoutes()}
          </main>
        </div>
      </NotefulContext.Provider>
    )
  }
}

export default App