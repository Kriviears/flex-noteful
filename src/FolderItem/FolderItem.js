import React from 'react'
import './FolderItem.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NotefulContext from '../NotefulContext'
import config from '../config'
import {NavLink} from 'react-router-dom'
import {countNotesForFolder} from '../helper-functions';

export default class FolderItem extends React.Component{
    static defaultProps = {
      onDeleteFolder: () => {}
    }

    static contextType = NotefulContext;

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
          this.context.deleteFolder(folderId)
        })
        .catch(error =>{
          console.error({ error })
        })
      }

    render(){
        return(
            <div className='Folder' 
            // onClick={()=>this.props.openFolder(this.props.id)}
            >
              <NavLink
                className='Folder__title'
                to={`/folder/${this.props.id}`}
              >
              {this.props.name}
                <span className='num-notes'>
                  {countNotesForFolder(this.context.notes, this.props.id)}
                </span>
              </NavLink>
                <button 
                    className='Folder__delete' 
                    type='button' 
                    onClick={this.handleClickDelete} >
                    <FontAwesomeIcon icon='trash-alt' />
                    {' '}
                    
                </button>
            </div>
        )
    }
}