import React from 'react';
import '../Split.css';
import Notes from './Notes';
import ApiContext from '../ApiContext';
import ErrorBoundaries from '../ErrorBoundaries';

class Content extends React.Component {
  static contextType = ApiContext;

  findNote = (notes = [], noteId) => notes.find((note) => note.id === noteId);

  findFolder = (folders, folderId) => {
    return folders.find((folder) => folder.id === folderId);
  };

  render() {
    const { notes = [] } = this.context;
    const noteId = this.props.match.params.noteId;
    const note = this.findNote(notes, noteId) || { content: '' };
    const currentFolder = this.findFolder(this.context.folders, note.folderId);

    return (
    <ErrorBoundaries>
        <div className='mainStyling'>
        <div className='split left'>
          <button
            className='body-button'
            onClick={() => this.props.history.goBack()}
          >
            Go Back
          </button>
          <div>{currentFolder.title}</div>
        </div>
        <div className='split right'>
            <Notes id={note.id} />
            {note.content}
        </div>
      </div>
    </ErrorBoundaries>
      
    );
  }
}

export default Content;
