import React from 'react';
import { NavLink } from 'react-router-dom';
import ApiContext from '../ApiContext';

class Folder extends React.Component {
  static contextType = ApiContext;

  getFolderLength = () => {

    let length = this.context.notes.filter(
      (note) => note.folderId === this.props.id
    ).length;
    return length;
  };

  getFolderName = () => {
    let currentFolder = this.context.folders.find(
      (folder) => folder.id === this.props.id
    );
    return currentFolder.name;
  };

  render() {
    return (
      <div>
        <fieldset>
          <NavLink to={`/folder/${this.props.id}`}>
              {this.getFolderName()}
              {' '}
          </NavLink>
          {this.getFolderLength()}
        </fieldset>
      </div>
    );
  }
}

export default Folder;
