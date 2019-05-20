import React from 'react';
import './NoteNav.css';
import { Link } from 'react-router-dom'


import NoteItem from '../NoteItem/NoteItem'

export default class NoteNav extends React.Component{
    formatDate(date){
        const dateString = new Date(date);
        return dateString.toDateString();
    }
    render(){
        const notes = this.props.notes.map(note=>(
                <li key={note.id}> 
                    <Link to={`/note/${note.id}`}>
                        {note.name}
                    </Link>
                </li>
        ))


        return(
            <div className='note-nav'>
                <h1>Notes Here</h1>

                { notes }
            </div>
        )
    }
}

// 2019-01-03T00:00:00.000Z