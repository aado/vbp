import React, { Component } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';
import { FormGroup, Label, Input,  ListGroup, ListGroupItem,CardBody, CardText, Button, Form } from 'reactstrap';
import Moment from 'react-moment';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import base64 from 'base-64';
import Parser from 'html-react-parser';


const socket = new Pusher('223aca0f0c8175acf4b3', {
	cluster: 'ap1',
	encrypted: true
});

export default class ClientNotes extends Component {
    constructor(props) {
		super(props);
		this.state = {
			open: false,
			roles: [],
			heads:[],
			realNotes: [],
			notes: [],
			editorState: EditorState.createEmpty(),
		}
		// this.onChange = (editorState) => this.setState({editorState});
	}
	
	componentDidMount() {
		// Notes
		this.notes();
		// const channel = socket.subscribe('note');
		// channel.bind('notes', (data) => {
		// 	this.setState({ realNotes: [...this.state.realNotes, data]});
		// });
	}

	notes () {
		fetch(`http://localhost/vbp/api/vbpapi/companies/allnotes/`+this.props.id)
		.then(results => {
			return results.json();
		}).then(data => {
			this.setState({notes:data});
		});
	}

	onEditorStateChange = (editorState) => {
		// console.log(editorState);
		// console.log(editorState.getCurrentContent());
		
		this.setState({editorState,});
	}

	// onEditorStateChange: Function = (editorState) => {
	// 	this.setState({
	// 	  editorState,
	// 	});
	//   };

	addRow = () => {
		const { otherContact } = this.state
		otherContact.push({ _id: _.uniqueId() })
		this.setState({ otherContact, open: true })
	}

	removeRow = (index) => {
		const { otherContact } = this.state
		if (otherContact.length >= 1) {
			otherContact.splice(index, 1)
			this.setState({ otherContact })
		}
	}

	removeRowExist = (index, id) => {
			const { another_contact_person } = this.state
			if (another_contact_person.length >= 1) {
				axios.request({
					method:'post',
					url:'http://localhost/vbp/api/vbpapi/companies/deletecontact/'+id,
				}).then(response => {
					console.log('deleted successfully');
				}).catch(err => console.log(err));

				another_contact_person.splice(index, 1)
				this.setState({ another_contact_person, popoverOpen: !this.state.popoverOpen });
			}
	}

	onNotesSubmit = () => {
		const noteValues = {
			clientid: this.props.id,
			title: $(".addUserForm").find('input#title').val(),
			user: 'testuser',
			notes: new Buffer($(".addUserForm").find('textarea#notes').val()).toString('base64'),
		}
		console.log(noteValues);
		axios.request({
			method:'post',
			url:'http://localhost/vbp/api/vbpapi/companies/addnotes',
			data: noteValues
		}).then(response => {
			// const payload = {
			// 	title: noteValues.title,
			// 	notes: noteValues.notes,
			// 	user: noteValues.user,
			// 	created: response.data.created,
			// 	id: response.data.id
			// };
			this.notes();
			$(".addUserForm").find('input#title').val("")
			$(".addUserForm").find('textarea#notes').val("")
			this.setState({ EditorState: EditorState.createEmpty() });
			// axios.post('http://localhost:8080/notes', payload);
		}).catch(err => console.log(err));
	}

   render() {
		const { row, id } = this.props;
		const { notes, realNotes, editorState } = this.state;
        return (
			<div>
				<FormGroup>
					<Label for="city">Title</Label>
					<Input type="text" id="title" name="title" placeholder="Enter Title" />
				</FormGroup>
				<FormGroup>
					<Label for="city">Notes</Label>
					<Editor
						editorState={editorState}
						toolbarClassName="toolbarClassName"
						wrapperClassName="wrapperClassName"
						editorClassName="editorClassName"
						onEditorStateChange={this.onEditorStateChange}
						/>
					<textarea placeholder="Enter Notes" id="notes" disabled style={{display: 'none'}} value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}> </textarea>
				</FormGroup>
				<br />
				<Button type="button" className="btn btn-success" style={{float:'right'}} onClick={this.onNotesSubmit}>Post</Button>
				<br /><br />
				<h4>History</h4>
				<div style={{color:'white',overflow:'scroll', height: '400px'}}>
					{ notes.map((note, i) => (
						<ListGroup key={note.id}>
							<ListGroupItem>
								<i className="fa fa-clock-o text-success"></i> <Moment>{note.created}</Moment> Added By {note.user}
								<CardBody>
									<h6>{note.title}</h6>
									{/* <CardText> */}
									{Parser(base64.decode(note.notes))}
									{/* </CardText> */}
								</CardBody>
							</ListGroupItem>
						</ListGroup>
					))}
					{ realNotes.map(result => {
							return (
								<ListGroup key={result.id}>
									<ListGroupItem>
										<i className="fa fa-clock-o text-success"></i> <Moment interval={30000}>{result.created}</Moment> Added By {result.user}
										<CardBody>
											<h6>{result.title}</h6>
											<CardText>{result.notes}</CardText>
										</CardBody>
									</ListGroupItem>
								</ListGroup>
							)
						})
					}
				</div>
			</div>
        )
    }
}

