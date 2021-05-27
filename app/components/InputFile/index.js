import React from 'react';
import ReactDOM from 'react-dom';

export default class InputFile extends React.PureComponent {

  render() {
    const { accept, onChange, className } = this.props;

    return (
      <input
        accept={accept}
        type="file"
        name="uploads[]"
        id="file"
        onChange={onChange}
        className={className} />
    );
  }

}
