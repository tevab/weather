import React, { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import loader from '../Animations/loader.json';
import Temperature from './Temperature';
import Time from './Time';
import PropTypes from 'prop-types';

const Greeting = (props) => {
	return (
		<div
			style={{
				opacity: props.showGreeting ? 1 : 0,
				transition: 'opacity 400ms ease-in-out'
			}}
		>
      Good {props.timeOfDay}, {props.profileName}!
		</div>
	);
};

function MainContainer (props) {
	const [showGreeting, setShowGreeting] = useState(false);
	const [profileName, setProfileName] = useState('');

	useEffect(() => {
		if (props.profile.length >= 0) {
			setShowGreeting(false);
			setTimeout(() => {
				setProfileName('');
			}, 400);
		} else {
			setShowGreeting(true);
			setProfileName(props.profile.givenName);
		}
	}, [props.profile]);

	return (
		<div
			className='main-container'
			style={{
				flex: '1 0 auto',
				display: 'flex',
				alignContent: 'center',
				justifyContent: 'center',
				alignItems: 'center',
				color: '#f5f5f5',
				textShadow: '0px 4px 4px rgb(30 18 18 / 52%)',
				marginTop: -20
			}}>
			{props.loading
				? <Lottie
					animationData={loader}
					loop={true}
					style={{
						width: 200
					}}
				/>
				: (
					<div style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center'
					}}>
						<Greeting showGreeting={showGreeting} timeOfDay={props.timeOfDay} profileName={profileName} />
						<Temperature
							temperature={props.temperature}
							degree={props.degree}
							style={{
								fontSize: 110,
								lineHeight: '100px',
								letterSpacing: -10,
								margin: '6px auto'
							}}
						/>
						<Time
							currentCountry={props.currentCountry}
							currentCity={props.currentCity}
							timezone={props.timezone}
							setCurrentTime={props.setCurrentTime}
							weatherDescription={props.weatherDescription}
							currentTime={props.currentTime}
							timeOfDay={props.timeOfDay}
							style={{
								fontSize: 22,
								height: 26
							}}
						/>
						{/* <News
               currentCity={props.currentCity}
            /> */}
					</div>
				)
			}
		</div>
	);
}

Greeting.propTypes = {
	showGreeting: PropTypes.bool,
	timeOfDay: PropTypes.string,
	profileName: PropTypes.string,
};

MainContainer.propTypes = {
	profile: PropTypes.any,
	loading: PropTypes.bool,
	timeOfDay: PropTypes.string,
	temperature: PropTypes.any,
	degree: PropTypes.string,
	currentCountry: PropTypes.string,
	currentCity: PropTypes.string,
	timezone: PropTypes.any,
	setCurrentTime: PropTypes.func,
	weatherDescription: PropTypes.string,
	currentTime: PropTypes.string,
};

export default MainContainer;
