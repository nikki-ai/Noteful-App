import React from 'react';
import { NavLink } from 'react-router-dom';
import ApiContext from '../ApiContext';
import ErrorBoundaries from '../ErrorBoundaries';

class Folder extends React.Component {
  static contextType = ApiContext;

  getFolderLength = () => {

    let length = this.context.notes.filter(
      (note) => note.folderId === this.props.id
    ).length;
    return length;
  };

  getFolderTitle = () => {
    let currentFolder = this.context.folders.find(
      (folder) => folder.id === this.props.id
    );
    return currentFolder.title;
  };

  render() {
    return (
      <ErrorBoundaries>
        <div>
        <fieldset>
          <NavLink to={`/folder/${this.props.id}`}>
              {this.getFolderTitle()}
              {' '}
          </NavLink>
          {this.getFolderLength()}
        </fieldset>
      </div>
      </ErrorBoundaries>
      
    );
  }
}

export default Folder;
