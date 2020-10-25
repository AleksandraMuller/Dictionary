import React from 'react';
import heroVideo from '../assets/herovideo.mp4';
import bookVideo from '../assets/bookvideo.mp4';
import parkVideo from '../assets/parkvideo.mp4';
import datorVideo from '../assets/datorvideo.mp4';
import styled from 'styled-components';

const VideoTag = styled.video`
	overflow: hidden;
	object-fit: cover;
	width: 100%;
	height: 100%;
	opacity: 0.5;
`;

const Video = () => {
	return (
		<VideoTag autoPlay playsInline muted loop>
			<source src={datorVideo} type='video/mp4'></source>
			"Your browser is not supported!"
		</VideoTag>
	);
};

export default Video;
