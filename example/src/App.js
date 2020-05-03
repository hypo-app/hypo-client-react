import React from 'react'

import { ExperimentSwitch, hypo } from 'hypo-client-react'

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
            <p><a href="#" onClick={() => {hypo.event('paid')}}>Pay!</a></p>
          </>)
        }
      }
    />
  )
}

export default App
