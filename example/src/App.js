import React from 'react'

import { ExperimentSwitch, hypo, RuntimeStylesheet } from 'hypo-client-react'

hypo.init({
  baseUrl: "http://localhost:5000",
  project: "development"
})

const App = () => {
  return (
    <ExperimentSwitch
      experimentId="test-1"
      onError={console.log}
      loadingIndicator={<div>Loading...</div>}
      render={
        ({group, variables}) => {
          return (<>
            <div>Assignment: {group}</div>
            <img src={variables.image_url} alt="foo" width="300" />
            <p><a id="convert-link" href="#" onClick={() => {hypo.event('paid')}}>Pay!</a></p>
            <RuntimeStylesheet
              content={variables.styles}
            />
          </>)
        }
      }
    />
  )
}

export default App
