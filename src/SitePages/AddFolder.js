import React from "react";
import { Component } from "react";
import ApiContext from "../ApiContext";
import PropTypes from "prop-types";
import '../Split.css';
import config from '../config';


class AddFolder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      folderName: null,
      error: null
    };
  }

  static contextType = ApiContext;

  handleSubmit(e) {
    e.preventDefault();
    const fName = e.target.folderName.value;

    fetch(`${config.url}/folders`, {
      method: "POST",
      body: JSON.stringify({ name: fName }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Something went wrong, could not add new folder");
        }
        return res.json();
      })
      .then((data) => {
        this.context.addFolder(data);
        console.log(data);

        this.props.history.goBack();
      })
      .catch((err) => {
        alert(err);
      });
  }

  render() {
    const error = this.state.error ? (
      <div>{this.state.error}</div>
    ) : ("");

    return (
      <div className='formStyling'>
        <form className="addForm" onSubmit={(e) => this.handleSubmit(e)}>
          <fieldset>
            <h2>Create a New Folder</h2>
            <label htmlFor="name">Enter your folder name here:</label>
            <br />
            <input type="text" name="folderName" required/>
            <br />
            <div className='form-buttons'>
              <button type="submit">Submit</button>
              <button onClick={() => this.props.history.goBack()}>Cancel</button>
            </div>
            
          </fieldset>
        </form>
        
      </div>
    );
  }
}


export default AddFolder;