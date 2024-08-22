import React from 'react';
import './App.css';
import RecipeList from './components/RecipeList';
import axios from 'axios';

const getCsrfToken = () => {
    const tokenMeta = document.querySelector('meta[name="csrf-token"]');
    return tokenMeta ? tokenMeta.getAttribute('content') : '';
};


axios.defaults.headers.common['X-CSRFToken'] = getCsrfToken();
axios.defaults.withCredentials = true;

function App() {
    return (
        <div className="App">
            <RecipeList />
        </div>
    );
}

export default App;
