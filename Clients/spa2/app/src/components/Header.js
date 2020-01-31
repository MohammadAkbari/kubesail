import * as React from 'react';

export default function Header({ logoSrc, pageTitle}) {
    return (
        <header className="App-header">
            <img src={logoSrc} className="App-logo" alt="logo" />
            <h1 className="App-title">{pageTitle}</h1>
        </header>
    );
}