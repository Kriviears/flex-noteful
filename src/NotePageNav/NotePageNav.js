import React from 'react'
import NotefulContext from '../NotefulContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import './NotePageNav.css'

export default class NotePageNav extends React.Component {
  static fefaultProps = {
    history: {
      goBack: () => { }
    },
    match: {
      params: {}
    }
  }

  static contextType = NotefulContext
  render(){
    const { notes, folders, findNote, findFolder } = this.context
    const { noteId } = this.props.match.params
    const note = findNote(notes, noteId) || {}
    const folder = findFolder(folders, note.folderId)
    return (
      <div className='NotePageNav'>
        <CircleButton
          tag='button'
          role='link'
          onClick={() => this.props.history.goBack()}
          className='NotePageNav__back-button'
        >
          <FontAwesomeIcon icon='chevron-left' />
          <br />
          Back
        </CircleButton>
        {folder && (
          <h3 className='NotePageNav__folder-name'>
            {folder.name}
          </h3>
        )}
      </div>
    )
  }
}