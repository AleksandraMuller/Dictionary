import React from 'react';

const Input = ({ val, setVal, label }) => {
	return (
		<div>
			<label>{label}</label>
			<input onChange={(e) => setVal(e.target.value)} value={val}></input>
		</div>
	);
};

export default Input;
