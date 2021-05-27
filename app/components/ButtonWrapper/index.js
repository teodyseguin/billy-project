import React from 'react';
import ReactDOM from 'react-dom';

export default function ButtonWrapper(props) {
	const { ...rest } = props;

	return (
		<div { ...rest }>
			{ props.children }
		</div>
	);
}
