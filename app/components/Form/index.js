import React from 'react';
import ReactDOM from 'react-dom';

export default class Form extends React.PureComponent {

  render() {
    const { ...rest } = this.props;

    return (
      <form { ...rest }>
        {this.props.children}
      </form>
    );
  }

}