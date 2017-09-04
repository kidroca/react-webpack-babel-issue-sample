import React from 'react';

export default ({ plan = null, onDecline = f => f }) => {

  if (plan) {
    return (
      <section>
        <h2>{plan.type} - {plan.state.name}</h2>
        <section>
          <button onClick={notImplemented}>Accept</button>
          <button onClick={notImplemented}>Question</button>
          <button onClick={onDecline}>Decline</button>
          <button onClick={notImplemented}>Pickup</button>
        </section>
        <pre>{JSON.stringify(plan, null, '\t')}</pre>
      </section>
    )
  }

  return <h3>No active recommendation</h3>;
}

function notImplemented() {
  alert('Not implemented');
}
