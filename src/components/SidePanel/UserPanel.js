import React from "react";
import firebase from "../../firebase";
import { connect } from "react-redux";
import { Grid, Header, Icon, Dropdown, Image } from "semantic-ui-react";

class UserPanel extends React.Component {
	state = {
		user: this.props.currentUser,
	};

	dropdownOptions = () => [
		// {
		// 	key: "user",
		// 	text: (
		// 		<span>
		// 			Signed in as <strong>{this.state.user.displayName}</strong>
		// 		</span>
		// 	),
		// 	disabled: true
		// },
		{
			key: "avatar",
			text: <span>Change Avatar</span>,
		},
		{
			key: "signout",
			text: <span onClick={this.handleSignOut}>Sign Out</span>,
		},
	];

	handleSignOut = () => {
		firebase
			.auth()
			.signOut()
			.then(() => {
				console.log("Signed Out");
			});
	};

	render() {
		const { user } = this.state;
		return (
			<Grid style={{ background: this.props.primaryColor }}>
				<Grid.Column>
					<Grid.Row style={{ padding: "1.2 em", margin: 0 }}>
						{/* App header */}
						<Header inverted floated='left' as='h2'>
							<Icon name='bell' />
							<Header.Content>VeryChat</Header.Content>
						</Header>
						{/* User Dropdown */}
						<Header style={{ padding: "0.25em" }} as='h4' inverted>
							<Dropdown
								trigger={
									<span>
										<br />
										{/*   Some space here */}
										<Image src={user.photoURL} spaced='right' avatar />
										{this.state.user.displayName}
									</span>
								}
								options={this.dropdownOptions()}
							/>
						</Header>
					</Grid.Row>
				</Grid.Column>
			</Grid>
		);
	}
}

export default UserPanel;
