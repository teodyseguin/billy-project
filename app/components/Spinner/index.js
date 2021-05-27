import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const Wrapper = styled.div `
	.lds-spinner {
		width: 100%;
		height: 100%;
	}
`;

export default function Spinner(props) {
	const { ...rest } = props;
	let wrapperClass = 'hidden lds-css ng-scope';

	if (rest.show) {
		wrapperClass = 'lds-css ng-scope';
	}

	return (
		<Wrapper className={wrapperClass}>
			<div className="lds-spinner mx-auto">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
			<div className="text-center">{rest.messages}</div>
		</Wrapper>	
	);
}