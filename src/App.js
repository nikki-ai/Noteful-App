import React from 'react';
import Main from './SitePages/Main';
import { Route, Link } from 'react-router-dom';
import DummyStore from './DummyStore';
import Content from './SitePages/ContentPage';
import ApiContext from './ApiContext';
import './Split.css';
import config from './config';
import AddFolder from './SitePages/AddFolder';
import AddNote from './SitePages/AddNote';
import ErrorBoundaries from './ErrorBoundaries';



class App extends React.Component {
  constructor() {
    super();
    this.state = {
      notes: [],
      folders: [],
    };
  }

  componentDidMount = () => {
    Promise.all([
      fetch(`${config.url}/notes`),
      fetch(`${config.url}/folders`)
    ])
    .then(([notesResponse, foldersResponse]) =>{
      if(!notesResponse.ok)
      return notesResponse.json().then(error => Promise.reject(error));
      if(!foldersResponse.ok)
      return foldersResponse.json().then(error => Promise.reject(error));
      return Promise.all([notesResponse.json(), foldersResponse.json()])
    })
    .then(([notes, folders]) =>{
      console.log(notes,folders)
      this.setState({notes, folders});
    })
    .catch(error =>{
      console.error({error});
    });
  };

  getNotes = (notes = [], folderId) =>
    !folderId ? notes : notes.filter((note) => note.folderId === folderId);

  /* Function that finds notes for given note clicked on */
  findNote = (notes = [], noteId) => notes.find((note) => note.id === noteId);

  handleDeleteNote = noteId => {
    const deleteUrl = `${config.url}/notes/${noteId}`;
    fetch(deleteUrl, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.status);
        } else {
          this.setState({
            notes: this.state.notes.filter(note => note.id !== noteId)
          });
        }
      })
      .catch((error) => console.log(error));
}

  addFolder = (newFolder) => {
    const addFolder = [...this.state.folders, newFolder];
    this.setState({ folders: addFolder });
  };

  addNote = (newNote) => {
    const addNote = [...this.state.notes, newNote];
    this.setState({ notes: addNote });
  };

  render() {
    // Set global prop value

    const value = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.handleDeleteNote,
      getNotes: this.getNotes,
      addFolder: this.addFolder,
      addNote: this.addNote
    };

    
    return (
      <ApiContext.Provider value = {value}>
        <ErrorBoundaries>
          <header>
          <Link to='/'>
            <h1>Noteful</h1>
          </Link>
        </header>
        {/* Create for loop that maps through list items */}
        {['/', '/folder/:folderId'].map((path) => (
          <Route
            exact
            key={path}
            path={path}
            component = {Main}
          />
        ))}

        <Route
          path='/note/:noteId'
          component = {Content}
        />

        <Route
          path='/add-folder'
          component = {AddFolder}
        />

        <Route
          path='/add-note'
          component = {AddNote}
        />
        <footer></footer>
        </ErrorBoundaries>
      </ApiContext.Provider>
    );
  }
}

export default App;
