import React from 'react';
import '../Split.css';
import Notes from './Notes';
import Folder from './Folder';
import ApiContext from '../ApiContext';
import { Link } from 'react-router-dom';


class Main extends React.Component {
  static contextType = ApiContext;
  generateNoteList = () => {
    let currentFolderId = this.props.match.params.folderId;
    let notes;

    if (currentFolderId) {
      notes = this.context.notes.map((note) => {
        if (note.folderId === currentFolderId) {
          return (
            <li key={note.id}>
              <Notes id={note.id} /><br/>
            </li>
          );
        }
      });
    } else {
      notes = this.context.notes.map((note) => {
        return (
          <li key={note.id}>
            <Notes id={note.id} /><br/>
            
          </li>
        );
      });
    }
    return notes;
  };

  render() {
    const { folders } = this.context;

    return (
        <main className='mainStyling'>
          <section className='split left'>
            <Link to='/add-folder'>
              <button className='body-button'>Add Folder</button>
            </Link>
            
            <ul>
              {folders.map((folder) => (
                <li key={folder.id}>
                  <Folder id={folder.id} /><br/>
                </li>
              ))}
            </ul>
          </section>

          <section className='split right'>
            <Link to='/add-note'>
              <button className='body-button'>Add Note</button>
            </Link>
            <ul>
            {this.generateNoteList()}
            </ul>
          </section>
        </main>
    );
  }
}

export default Main;
