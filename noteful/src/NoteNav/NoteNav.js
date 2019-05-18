import React from 'react';
import './NoteNav.css';

import NoteItem from '../NoteItem/NoteItem'

export default class NoteNav extends React.Component{
    formatDate(date){
        const dateString = new Date(date);
        return dateString.toDateString();
    }
    render(){
        const notes = this.props.notes.map(note=>(
            <NoteItem key={note.id} name={note.name} date={this.formatDate(note.modified)}/>
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