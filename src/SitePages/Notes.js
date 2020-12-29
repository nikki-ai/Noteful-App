import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';



function Notes(props) {
    return (
        <div>
            <fieldset>
                <h2>
                    <Link to = {`/note/${props.id}`}>
                        {props.name}
                    </Link>
                </h2>
                <h3>
                    {moment(props.modified).format('MM-DD-YY')}
                </h3>
                {/* <button onClick={}>Delete</button> */}
            </fieldset>
        </div> 
    )
}

export default Notes;