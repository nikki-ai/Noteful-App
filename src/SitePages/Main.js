import React from 'react';
import '../Split.css';
import Notes from './Notes';
import Folder from './Folder';
import ApiContext from '../ApiContext';
import { Link } from 'react-router-dom';

class Main extends React.Component {
  static contextType = ApiContext;

  handleDeleteNote = (noteId) => {
    this.props.history.push('/');
  };

  generateNoteList = () => {
    let currentFolderId = Number(this.props.match.params.folderId);
    let notes;

    if (currentFolderId) {
      notes = this.context.notes.map((note) => {
        if (note.assigned_folder === currentFolderId) {
          return (
            <li key={note.id}>
              <Notes
                id={note.id}
                name={note.name}
                modified={note.modified}
                onDeleteNote={this.handleDeleteNote}
              />
              <br />
            </li>
          );
        } else {
          return '';
        }
      });
    } else {
      notes = this.context.notes.map((note) => {
        return (
          <li key={note.id}>
            <Notes id={note.id} />
            <br />
          </li>
        );
      });
    }
    return notes;
  };

  render() {
    const { folders } = this.context;

    return (
      <div className='mainStyling'>
        <section className='split left'>
          <h2>Folders</h2>
          <Link to='/add-folder' className='body-button'>
            Add Folder
          </Link>

          <ul>
            {folders.map((folder) => (
              <li key={folder.id}>
                <Folder id={folder.id} />
                <br />
              </li>
            ))}
          </ul>
        </section>

        <section className='split right'>
          <h2>Notes</h2>
          <Link to='/add-note' className='body-button'>
            Add Note
          </Link>
          <ul>{this.generateNoteList()}</ul>
        </section>
      </div>
    );
  }
}

export default Main;
