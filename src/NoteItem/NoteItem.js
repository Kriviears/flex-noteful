import React from 'react'
import './NoteItem.css'

export default class NoteItem extends React.Component{
    render(){
        console.log(this.props.date)
        return(
            <div className='note-item'>
                <h1>{this.props.name}</h1>
                <p>{this.props.date}</p>
                <button>Delete Note</button>
            </div>
        )
    }
}