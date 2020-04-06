import React, { Component } from "react";
import firebase from "../../firebase";
import { Segment, Button, Input } from "semantic-ui-react";

export default class MessageForm extends Component {
	state = {
		message: "",
		channel: this.props.currentChannel,
		loading: false,
		user: this.props.currentUser,
		errors: [],
	};

	handleChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};
	createMessage = () => {
		const message = {
			timestamp: firebase.database.ServerValue.TIMESTAMP,
			user: {
				id: this.state.user.uid,
				name: this.state.user.displayName,
				avatar: this.state.user.photoURL,
			},
			content: this.state.message,
		};
		return message;
	};

	sendMessage = () => {
		const { messagesRef } = this.props;
		const { message, channel } = this.state;
		if (message) {
			this.setState({ loading: true });
			messagesRef
				.child(channel.id)
				.push()
				.set(this.createMessage())
				.then(() => {
					this.setState({ loading: false, message: "", errors: [] });
				})
				.catch((error) => {
					console.error(error);
					this.setState({
						loading: false,
						errors: this.state.errors.concat(error),
					});
				});
			//
		} else {
			this.setState({
				errors: this.state.errors.concat({ message: "Add a message" }),
			});
		}
	};

	render() {
		const { errors } = this.state;
		return (
			<Segment className='message__form'>
				<Input
					fluid
					name='message'
					style={{ marginBottom: "0.7em" }}
					label={<Button icon={"add"} />}
					labelPosition='left'
					placeholder='Write your message'
					onChange={this.handleChange}
					className={
						errors.some((error) => error.message.includes("message"))
							? "error"
							: ""
					}
				/>
				<Button.Group icon widths='2'>
					<Button
						color='orange'
						content='Add reply'
						labelPosition='left'
						icon='edit'
						onClick={this.sendMessage}
					/>
					<Button
						color='teal'
						content='Upload Media'
						labelPosition='right'
						icon='cloud upload'
					/>
				</Button.Group>
			</Segment>
		);
	}
}
