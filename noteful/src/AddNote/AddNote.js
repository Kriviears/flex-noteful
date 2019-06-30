import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import './AddNote.css'
import NotefulContext from "../NotefulContext";
import config from '../config'
import ValidationError from '../ValidationError'


export default class AddNote extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: '',
      content: '',
      folderId: '',
      modified: new Date(),
      nameValid: false,
      contentValid: false,
      folderIdValid: false,
      formValid: false,
      validationMessages: {
        name: '',
        content: '',
        folderId: ''
      }
    }
  }


  static defaultProps = {
    history: {
      push: () => { }
    }
  }
  static contextType = NotefulContext

  updateName(name){
    this.setState({name}, ()=>{this.validateName(name)})
  }

  validateName(fieldValue){
    const fieldErrors = {...this.state.validationMessages}
    let hasError = false;

    fieldValue = fieldValue.trim()
    if(fieldValue === 0){
      fieldErrors.name = 'Note must have a name'
      hasError = true;
    } else {
      if(fieldValue < 3){
        fieldErrors.name = 'Note title must be at least 3 characters long';
        hasError = true;
      } else {
        fieldErrors.name = '';
        hasError = false
      }
    }

    this.setState({
      validationMessages:fieldErrors,
      nameValid: !hasError
    }, ()=>{this.formValid()})
  }

  updateContent(content){
    this.setState({content}, ()=>{this.validateContent(content)})
  }

  validateContent(fieldValue){
    const fieldErrors ={...this.state.validationMessages}
    let hasError = false;

    fieldValue = fieldValue.trim()
    if(fieldValue.length === 0){
      fieldErrors.content = 'Some content required to make note'
      hasError = true;
    } else {
      fieldErrors.content = '';
      hasError = false;
    }

    this.setState({
      validationMessages: fieldErrors,
      contentValid: !hasError
    }, ()=>{this.formValid()})
  }

  updateFolderId(folderId){
    this.setState({folderId}, ()=>{this.validateFolderId(folderId)})
  }

  validateFolderId(fieldValue){
    const fieldErrors = {...this.state.validationMessages};
    let hasError = false;

    if(!this.context.folders.filter(folder=> folder.id === fieldValue)){
      fieldErrors.folderId = 'Please select a folder';
      hasError = true;
    } else {
      fieldErrors.folderId = '';
      hasError = false
    }

    this.setState({
      validationMessages: fieldErrors,
      folderIdValid: !hasError
    }, ()=>{this.formValid()})
  }


  formValid(){
    const {nameValid, contentValid, folderIdValid} = this.state;
    console.log(`name=${nameValid} content=${contentValid} folder=${folderIdValid}`)
    this.setState({
      formValid: nameValid && contentValid && folderIdValid
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    const newNote = {
      name: this.state.name,
      content: this.state.content,
      folderId: this.state.folderId,
      modified: this.state.modified,
    }

    fetch(`${config.API_ENDPOINT}/notes`,{
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newNote),
    })
      .then(res => {
        if(!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(note =>{
        this.context.addNote(note)
        this.props.history.push(`/folder/${note.folderId}`)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  render() {
    const { folders=[] } = this.context
    return (
      <section className='AddNote'>
        <h2>Create a note</h2>
        <NotefulForm onSubmit={this.handleSubmit}>
          <div className='field'>
            <label htmlFor='note-name-input'>
              Name
            </label>
            <input type='text' id='note-name-input' name='note-name'  onChange={e=>this.updateName(e.target.value)}/>
            <ValidationError hasError={!this.state.nameValid} message={this.state.validationMessages.name}/>
          </div>
          <div className='field'>
            <label htmlFor='note-content-input'>
              Content
            </label>
            <textarea id='note-content-input' name='note-content' onChange={e=>this.updateContent(e.target.value)}/>
            <ValidationError hasError={!this.state.contentValid} message={this.state.validationMessages.content}/>
          </div>
          <div className='field'>
            <label htmlFor='note-folder-select'>
              Folder
            </label>
            <select id='note-folder-select' name='note-folder-id' onChange={e=>this.updateFolderId(e.target.value)}>
              <option value={null}>...</option>
              {folders.map(folder =>
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              )}
            </select>
            <ValidationError hasError={!this.state.folderIdValid} message={this.state.validationMessages.folderId}/>
          </div>
          <div className='buttons'>
            <button type='submit' disabled={!this.state.formValid}>
              Add note
            </button>
          </div>
        </NotefulForm>
      </section>
    )
  }
}