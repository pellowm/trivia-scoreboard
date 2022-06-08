import React from 'react';

const Scroll = (props) => {
    return (
        <div style={{overflowY: 'scroll', height: '15000px'}}>
            {props.children}
        </div>
    );
};

export default Scroll;