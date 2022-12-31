import React from 'react';
import TestItem from "./TestItem.js";

const TestList = (props) => {
    return (
        <div>
            {props.test.map(id => (
                <TestItem key={id.id} id={id} />
            ))}
        </div>
    );
};

export default TestList;