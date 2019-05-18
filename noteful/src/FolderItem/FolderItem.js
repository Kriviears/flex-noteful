import React from 'react'
import './FolderItem.css'

export default class FolderItem extends React.Component{
    render(){
        return(
            <div className='folder-item' onClick={()=>this.props.openFolder(this.props.id)}>
                <h1>{this.props.name}</h1>
            </div>
        )
    }
}