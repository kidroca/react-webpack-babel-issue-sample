import React from 'react';

export default ({onLogin}) => (
    <form onSubmit={onLogin}>
        <fieldset>

          <legend>Login Form</legend>

          <input type="text" name="email" />
          <input type="password" name="password" />

          <input type="submit" value="Sign In" />
        </fieldset>
    </form>
);
