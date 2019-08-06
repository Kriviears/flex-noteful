import React from 'react'
import './FolderItem.css'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NotefulContext from '../NotefulContext'
import config from '../config'

export default class FolderItem extends React.Component{

    handleClickDelete = e =>{
        e.preventDefault()
        const folderId = this.props.id
        console.log(folderId);
    
        fetch(`${config.API_ENDPOINT}/folders/${folderId}`,{
          method: 'DELETE',
          headers: {
            'content-type': 'application/json'
          }
        })
        .then(res =>{
          if(!res.ok)
            return res.json().then(e => Promise.reject(e))
          return res.json
        })
        .then(() => {
          this.context.deleteNote(folderId)
        })
        .catch(error =>{
          console.error({ error })
        })
      }

    render(){
        return(
            <div className='folder-item' onClick={()=>this.props.openFolder(this.props.id)}>
                <h1>{this.props.name}</h1>
                <button 
                    className='Folder__delete' 
                    type='button' 
                    onClick={this.handleClickDelete} >
                    <FontAwesomeIcon icon='trash-alt' />
                    {' '}
                    remove
                </button>
            </div>
        )
    }
}