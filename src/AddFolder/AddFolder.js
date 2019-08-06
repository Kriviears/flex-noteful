import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import './AddFolder.css'
import NotefulContext from "../NotefulContext";
import config from '../config'
import ValidationError from '../ValidationError';
import idGenerator from 'react-id-generator'

export default class AddFolder extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: '',
      nameValid: false,
      formValid: false,
      validateMessages: {
        name: ''
      }
    }
  }

  updateName(name){
    this.setState({name}, ()=>{this.validateName(name)})
  }

  validateName(fieldValue){
    const fieldErrors = {...this.state.validateMessages}
    let hasError = false

    fieldValue = fieldValue.trim();
    if(fieldValue.length === 0){
      fieldErrors.name = 'Name is required';
      hasError = true;
    } else {
      if(fieldValue.length < 3){
        fieldErrors.name = 'Folder name must be at least 3 characters long';
        hasError = true;
      } else {
        fieldErrors.name = '';
        hasError = false;
      }
    }

    this.setState({
      validateMessages: fieldErrors,
      nameValid: !hasError
    }, ()=>{this.formValid()})
  }

  formValid(){
    this.setState({
      formValid: this.state.nameValid
    })
  }


  static defaultProps = {
    history: {
      push: () => { }
    }
  }


  static contextType = NotefulContext

  handleSubmit = e =>{
    e.preventDefault();
    const newFolder = {
      title: this.state.name,
      id: idGenerator()
    }

    fetch(`${config.API_ENDPOINT}/folders`,{
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newFolder)
    })
    .then(res => {
      if(!res.ok)
       return res.json().then(e => Promise.reject(e))
      return res.json()
    })
    .then(folder =>{
      console.log(folder)
      folder = {
        "id": String(folder.id),
        "name": folder.title,
      };
      this.context.addFolder(folder)
      this.props.history.push(`/`)
    })
    .catch(error =>{
      console.error({ error })
    })
  }

  render() {
    return (
      <section className='AddFolder'>
        <h2>Create a folder</h2>
        <NotefulForm onSubmit={this.handleSubmit}>
          <div className='field'>
            <label htmlFor='folder-name-input'>
              Name
            </label>
            <input type='text' id='folder-name-input' name='folder-name' onChange={e=>this.updateName(e.target.value)}/>
            <ValidationError hasError={!this.state.nameValid} message={this.state.validateMessages.name}/>
          </div>
          <div className='buttons'>
            <button type='submit' disabled={!this.state.formValid}>
              Add folder
            </button>
          </div>
        </NotefulForm>
      </section>
    )
  }
}

