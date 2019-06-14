import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Note from '../Note/Note'
import CircleButton from '../CircleButton/CircleButton'
import './NoteListMain.css'
import NoteError from '../Note/NoteError'
import NotefulContext from '../NotefulContext'
import { getNotesForFolder } from '../helper-functions';

export default class NoteListMain extends React.Component {

  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = NotefulContext

  render(){
    const {folderId} = this.props.match.params
    const {notes=[]} = this.context
    const notesForFolder = getNotesForFolder(notes, folderId)

    return (
      <section className='NoteListMain'>
        <ul>
          {notesForFolder.map(note =>
            <li key={note.id}>
              <NoteError>
                <Note
                  id={note.id}
                  name={note.name}
                  modified={note.modified}
                />
              </NoteError>
            </li>
          )}
        </ul>
        <div className='NoteListMain__button-container'>
          <CircleButton
            tag={Link}
            to='/add-note'
            type='button'
            className='NoteListMain__add-note-button'
          >
            <FontAwesomeIcon icon='plus' />
            <br />
            Add Note
          </CircleButton>
        </div>
      </section>
    )
  }
}

