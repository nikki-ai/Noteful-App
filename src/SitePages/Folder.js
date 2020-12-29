import React from 'react';
import { NavLink } from 'react-router-dom';



function Folder(props) {console.log(`${props.id}`);
    return (
        <div>
            <fieldset>
                <NavLink to = {`/folder/${props.id}`}>
                    {props.name}
                </NavLink>
                {props.number}
            </fieldset>
        </div> 
    )
    
}

export default Folder;