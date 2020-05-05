import React from 'react'
import hypo from 'hypo-client'

class ExperimentSwitch extends React.Component {
  constructor(props) {
    super(props)
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

class RuntimeStylesheet extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {href, content, ...innerProps} = this.props
    if (href) {
      return (
        <link rel="stylesheet" type="text/css" href={href} {...innerProps} />
      )
    } else {
      return (<style type="text/css" {...innerProps}>
        {content}
      </style>)
    }
  }
}

class RuntimeHtml extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div dangerouslySetInnerHTML={{'__html': this.props.content}} />
    )
  }
}


export {
  hypo,
  ExperimentSwitch,
  RuntimeStylesheet,
  RuntimeHtml
}
