import React from 'react';
import ReactDOM from 'react-dom';

export default class InputText extends React.PureComponent {
  render() {
    const { onChange, className, ...rest } = this.props;

    return (
      <input
        type="text"
        onChange={onChange}
        className={className} { ...rest } />
    );
  }
}
