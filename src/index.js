import React from 'react';
import hypo from 'hypo-client'

class ExperimentSwitch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      isEligible: true,
      assignment: null,
      error: null,
    };
  }

  componentDidMount() {
    if (typeof this.props.isEligible === "function" && this.props.isEligible() === false) {
      this.setState({isEligible: false, isLoaded: true});
      return;
    }
    hypo.getGroupAssignment(this.props.experimentId).then(
      (grp) => {
        this.setState({assignment: grp, isLoaded: true});
      }, (err) => {
        this.setState({error: err, isLoaded: true});
      }
    )
  }

  render() {
    return this.props.render(this.state);
  }
}


class RuntimeStylesheet extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {href, content, ...innerProps} = this.props;
    if (href) {
      return (
        <link rel="stylesheet" type="text/css" href={href} {...innerProps} />
      );
    } else {
      return (<style type="text/css" {...innerProps}>
        {content}
      </style>);
    }
  }
}

class RuntimeHtml extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div dangerouslySetInnerHTML={{'__html': this.props.content}} />
    );
  }
}


export {
  hypo,
  ExperimentSwitch,
  RuntimeStylesheet,
  RuntimeHtml
}
