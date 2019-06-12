import React, {Component} from 'react'
import Note from './Note'


export default class NoteError extends Component {
    constructor(props){
        super(props)
        this.state = {
            hasError: false
        }
    }

    static getDerivedStateFromError(error){
        return {hasError: error}
    }

    render(){
        if(this.state.hasError){
            return(
                <Note 
                    id={'error'}
                    name={'Oops'}
                    content={'This note was not able to be created. Please delete and try again'}
                />
            );
        }
        return this.props.children;
    }
}