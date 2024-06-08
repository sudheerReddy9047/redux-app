import React from 'react';

const Collapsible = (props) => {
    return (
        <>
            {props.isOpen ? props.children : null}
        </>
    );
}

export default Collapsible;
