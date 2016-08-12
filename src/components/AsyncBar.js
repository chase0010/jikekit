import React, { PropTypes, Component } from 'react';

export default class AsyncBar extends Component {
  render() {
    let spinner = (this.props.isWorking) ? this.renderSpinner() : null;
    let error = (this.props.error) ? this.renderError() : null;

    return (
      <section className='Pulse-async'>
        {spinner}
        {error}
      </section>
    );
  }

  renderSpinner() {
    return (
      <p className="Pulse-async-isWorking">
        加载中...
      </p>
    );
  }

  renderError() {
    return (
      <p className="Pulse-async-error">
        {this.props.error}
      </p>
    );
  }
}

AsyncBar.propTypes = {
    isWorking: PropTypes.bool,
    error: PropTypes.string
}