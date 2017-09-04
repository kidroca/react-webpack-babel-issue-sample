import React from 'react';

export default ({onLogin}) => (
    <form onSubmit={onLogin}>
        <input type="text" name="email" />
        <input type="password" name="password" />

        <button type="submit">Sign In</button>
    </form>
);
