import React from 'react';

const ApiContext = React.createContext({
    folders: [],
    notes: [],
    addFolder: () => {},
    addNote: () => {},
    deleteNote: () => {},
    getNotes: () => {},
})

export default ApiContext;