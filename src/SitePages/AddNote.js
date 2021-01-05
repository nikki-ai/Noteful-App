import React from 'react';
import { Component } from 'react';
import ApiContext from '../ApiContext';
import PropTypes from 'prop-types';
import '../Split.css';
import config from '../config';

class AddNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noteName: null,
      error: null,
    };
  }

  static contextType = ApiContext;

  handleSubmit(e) {
    e.preventDefault();
    const nName = e.target.noteName.value;
    const fId = e.target.targetFolder.value;
    const content = e.target.noteContent.value;

    fetch(`${config.url}/notes`, {
      method: 'POST',
      body: JSON.stringify({ 
        name: nName,
        folderId: fId,
        content: content
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Something went wrong, could not add new note');
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        this.context.addNote(data);
        this.props.history.goBack();
      })
      .catch((err) => {
        alert(err);
      });
  }

  updateNote(newNoteName) {
    this.setState({ noteName: newNoteName });
  }

  updateContent(newNoteContent) {
    this.setState({ noteContent: newNoteContent });
  }

  updateTargetFolder(newTargetFolder) {
    this.setState({ targetFolder: newTargetFolder });
  }

  selectOptions = () => {
    let selectOptions = this.context.folders.map((folder) => {
      return (

        <option
          key={folder.id} value={folder.id}>
          {' '}
          {folder.name}{' '}
        </option>
        
      );
    });
    return selectOptions;
  };

  render() {
    const error = this.state.error ? <div>{this.state.error}</div> : '';

    return (
      <div className='formStyling'>
        <form className='addNote' onSubmit={(e) => this.handleSubmit(e)}>
          <fieldset>
            <h2>Create a New Note</h2>
            <label htmlFor='name'>Name:</label>
            <input type='text' name='noteName' placeholder='Enter your note name here:' required />
            <br />
            <label htmlFor='content'>Content:</label>
            <textarea name='noteContent' placeholder='Enter your note content here: ' required />
            <br />
            <label htmlFor='SelectFolder'>Select folder</label>
            <select name='targetFolder' id='targetFolder'>
              <option value={''}>Select a Folder</option>
              {this.selectOptions()}
            </select>
            <br/>
            
            <div className='form-buttons'>
              <button type='submit'>Submit</button>
              <button onClick={() => this.props.history.goBack()}>
                Cancel
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
}

export default AddNote;
