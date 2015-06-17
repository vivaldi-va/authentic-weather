/**
 * Created by zaccary.price on 17/06/2015.
 */

var React = require('react');

var AuthenticWeather = React.createClass({
	getInitialState: function() {
		return {
			celsius: false,
			forcast: {
				icon: ')',
				temp: 9001,
				location: "I'm looking you up...",
				message: {
					primary: "We're looking out the window for you",
					secondary: "Tap to show celsius"
				}
			}
		}
	},
	componentDidMount: function() {

	},
	render: function() {
		console.log(this.state);

		var celsius;

		if(this.state.celsius) {
			celsius = (
				<div className="celsius">
					<div className="celsius__Temp">{ this.state.forcast.temp }&deg;C</div>
				</div>
			);
		}

		return (
			<div className="appWrapper">
				{celsius}
				<div className="weather">
					<div className="weather__Primary">
						<div className="weather__Icon">{ this.state.forcast.icon }</div>
						<div className="weather__Location">{ this.state.forcast.location }</div>
					</div>
					<div className="weather__Secondary">
						<div className="weather__Message">
							{ this.state.forcast.message.primary }
						</div>
						<div className="weather__SecondaryMessage">
							{ this.state.forcast.message.secondary }
						</div>
					</div>
				</div>

			</div>
		)
	}
});

module.exports = AuthenticWeather;