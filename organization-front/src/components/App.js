import React from 'react';
import Organization from './Organization';
import {SnackbarProvider} from 'notistack';

function App() {
    return (
        <SnackbarProvider maxSnack={3}>
            <div className="App">
                <Organization/>
            </div>
        </SnackbarProvider>
    );
}

export default App;
