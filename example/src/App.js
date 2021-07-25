import React from 'react'

import { ExperimentSwitch, hypo, RuntimeStylesheet } from 'hypo-client-react'

hypo.init({
  baseUrl: "http://localhost:5000",
  project: "test"
})

const App = () => {
  const handleClick = (event) => {
    // stop the browser from navigating
    event.preventDefault();
    // save url so that you have the value after the event was disposed
    const redirectUrl = event.target.href;
    hypo.event('paid').finally(() => {
      window.location.href = redirectUrl;
    })
  }
  return (
    <ExperimentSwitch
      experimentId="exp1"
      onError={console.log}
      loadingIndicator={<div>Loading...</div>}
      render={
        ({group, variables, reasonCode}) => {
          return (<>
            <div>Reason Code: {reasonCode}</div>
            <div>Assignment: {group}</div>
            {variables && variables.image_url && <img src={variables.image_url} alt="foo" width="300" />}
            <p><a id="convert-link" href="https://www.google.com" onClick={handleClick}>Pay!</a></p>
            {variables && variables.styles && <RuntimeStylesheet
              content={variables.styles}
            />}
          </>)
        }
      }
    />
  )
}

export default App
