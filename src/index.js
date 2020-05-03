import React from 'react'
import hypo from 'hypo-client';

class ExperimentSwitch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      group: null
    };
  }

  componentDidMount() {
    hypo.getGroupAssignment(this.props.experimentId).then(
      (grp) => {
        this.setState({group: grp, isLoaded: true})
      }, (err) => {
        if (this.props.onError) {
          this.props.onError(err)
        }
      }
    )
  }

  render() {
    if (this.state.isLoaded) {
      return this.props.render(this.state.group)
    } else if(this.props.loadingIndicator) {
      return this.props.loadingIndicator
    } else {
      return;
    }
  }
}

export {
  hypo,
  ExperimentSwitch
}
