import React from 'react'
import './NoteListNav.css'
import NotefulContext from '../NotefulContext'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import CircleButton from '../CircleButton/CircleButton'
import FolderItem from '../FolderItem/FolderItem'


export default class NoteListNav extends React.Component {
  static contextType = NotefulContext;

  render(){
    const { folders=[] } = this.context
    return (
      <div className='NoteListNav'>
        <ul className='NoteListNav__list'>
          {folders.map(folder =>
            <li key={folder.id}>
              {/* <NavLink
                className='NoteListNav__folder-link'
                to={`/folder/${folder.id}`}
              >
                <span className='NoteListNav__num-notes'>
                  {countNotesForFolder(notes, folder.id)}
                </span>
                {folder.name}
              </NavLink> */}
              <FolderItem
                name={folder.name}
                id={folder.id}
                countNotesForFolder={this.countNotesForFolder}
              />
            </li>
          )}
        </ul>
        <div className='NoteListNav__button-wrapper'>
          <CircleButton
            tag={Link}
            to='/add-folder'
            type='button'
            className='NoteListNav__add-folder-button'
          >
            <FontAwesomeIcon icon='plus' />
            <br />
            Add Folder
          </CircleButton>
        </div>
      </div>
    )
  }
}
