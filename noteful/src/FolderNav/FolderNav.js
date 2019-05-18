import React from 'react'
import './FolderNav.css'

import FolderItem from '../FolderItem/FolderItem'

export default class FolderNav extends React.Component{
    render(){
        const folders = this.props.folders.map(folder =>(
            <FolderItem 
                openFolder={this.props.openFolder} 
                id={folder.id} 
                key={folder.id} 
                name={folder.name}/>
        ))

        return(
            <div className='folder-nav'>
                <h1>Folders Here</h1>
                { folders }
                <button>Add Folder</button>
            </div>
        )
    }
}