import React from 'react';
import ReactDOM from 'react-dom';

export default class Button extends React.PureComponent {
  render() {
    const { onClick, buttonLabel, ...rest } = this.props;

    return (
      <button onClick={ onClick } { ...rest }>
        { buttonLabel }
      </button>
    );
  }
}
