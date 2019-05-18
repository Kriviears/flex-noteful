import React from 'react';
import { Router, Switch } from 'react-router-dom';
import FolderNav from './FolderNav/FolderNav'
import NoteNav from  './NoteNav/NoteNav'

import './App.css';
import data from './dummy-store'

class App extends React.Component {
  state = {
    data,
    currentFolder: '',
    error: null
  };

  openFolder = folderID =>{
    this.setState({
      currentFolder: folderID
    })
  }

  render(){
    const notes = this.state.currentFolder
    ? this.state.data.notes.filter(note => note.folderId === this.state.currentFolder)
    : this.state.data.notes

    const folders = this.state.data.folders

    console.log(notes);
    return (
      <div className="App">
        <header className="App-header">
          <h1>Noteful</h1>
        </header>
        <main>
          <Switch>
            <FolderNav openFolder={folderID => this.openFolder(folderID)} folders={ folders }/>
          </Switch>

          <NoteNav notes={ notes }/>
        </main>
      </div>
    );
  }
}

export default App;
