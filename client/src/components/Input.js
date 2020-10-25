import React from 'react';
// import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
// import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles((theme) => ({
// 	root: {
// 		'& .MuiTextField-root': {
// 			margin: theme.spacing(1),
// 			width: '25rem',
// 			backgroundColor: '#fff',
// 			zIndex: '2000',
// 		},
// 	},
// }));

const Container = styled.div`
	z-index: 100;
	text-align: center;
	background-color: #fff;
	position: absolute;
	top: 4rem;
	width: 100%;
`;

const InputField = styled.input`
	z-index: 200;
	text-align: center;
	background-color: #fff;
`;

// const Field = styled(TextField)`
// 	z-index: 100;
// `;

const Input = ({ val, setVal, label }) => {
	// const classes = useStyles();

	return (
		<Container>
			<label>{label}</label>
			<InputField
				onChange={(e) => setVal(e.target.value)}
				value={val}></InputField>
			{/* <TextField
				id='outlined-search'
				label={label}
				onChange={(e) => setVal(e.target.value)}
				value={val}
				type='search'
				variant='outlined'
				className={classes.root}
			/> */}
		</Container>
	);
};

export default Input;
