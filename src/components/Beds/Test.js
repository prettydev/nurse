import React from 'react';

export default function() {
    const test = 'name';
    return (
        <div style={{height: 200, background: 'red'}}>
            <div style={{textAlign: 'center', width:'100%', fontSize:16}}>{test}</div>
            <div>something else</div>
        </div>
    )
}