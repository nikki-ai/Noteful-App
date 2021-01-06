import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import ApiContext from '../ApiContext';
import ErrorBoundaries from '../ErrorBoundaries';

class Notes extends React.Component {

    static contextType = ApiContext;

    //functions that compare the note and folder id to the ones in the store and return them when they match
    getNoteName = () =>{
        let noteMatch = this.context.notes.find((note) => note.id === this.props.id)
        return noteMatch.name
    }
    
    getNoteModified = () =>{
        let noteModified = this.context.notes.find((noteMod) => noteMod.id === this.props.id)
        return noteModified.modified
    }

  render() {
    return (
      <ErrorBoundaries>
        <div>
        <fieldset>
          <h2>
            <Link to={`/note/${this.props.id}`}>{this.getNoteName()}</Link>
          </h2>
          <h3>{moment(this.getNoteModified()).format('MM-DD-YY')}</h3>
          <button onClick = {() => this.context.deleteNote(this.props.id)}>Delete</button>
        </fieldset>
      </div>
      </ErrorBoundaries>
    );
  }
}

export default Notes;
