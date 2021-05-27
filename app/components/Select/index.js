import React from 'react';
import ReactDOM from 'react-dom';

import ButtonWrapper from '../ButtonWrapper';

export default class Select extends React.PureComponent {

  componentDidMount() {
    const { ...rest } = this.props;

    if (rest.selectAuto) {
      setTimeout(() => {
        const { dataSelectHeader } = this.props;
        const select = document.querySelector(`[data-select-header="${dataSelectHeader}"]`);

        select.selectedIndex = 0;
        select.selectedIndex = dataSelectHeader;
      }, 500);
    }
  }

  render() {
    const { dataSelectHeader, onSelectChange, ...rest } = this.props;

    return (
      <ButtonWrapper className={'btn btn-primary pl-0 pr-0'}>
        <select data-select-header={dataSelectHeader} onChange={onSelectChange}>
          { this.props.children }
        </select>
      </ButtonWrapper>
    );
  }

}
