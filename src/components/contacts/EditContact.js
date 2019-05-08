import React, { Component } from 'react';
import { Consumer } from '../../context';
import axios from 'axios';
import FormGroup from '../layout/FormGroup';

class EditContact extends Component {

  state = {
    name: '',
    email: '',
    phone: '',
    error: {}
  }

  async componentDidMount() {
    const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${this.props.match.params.id}`);
    
    const contact = res.data;

    this.setState({
      name: contact.name,
      email: contact.email,
      phone: contact.phone
    });
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = async (dispatch, e) => {
    e.preventDefault();

    const { name, email, phone } = this.state;

    if(name === '') {
      this.setState({
        error: {
          name: 'Name is required'
        }
      });
      return;
    }
    if(email === '') {
      this.setState({
        error: {
          email: 'Email is required'
        }
      });
      return;
    }
    if(phone === '') {
      this.setState({
        error: {
          phone: 'Phone is required'
        }
      });
      return;
    }

    const updatedContact = {
      name,
      email,
      phone
    }

    const res = await axios.put(`https://jsonplaceholder.typicode.com/users/${this.props.match.params.id}`, updatedContact);
    dispatch({ type: 'UPDATE_CONTACT', payload: res.data });

    this.setState({
      name: '',
      email: '',
      phone: '',
      error: ''
    });

    this.props.history.push('/');
  }

  render() {
    const { name, email, phone, error } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card mb-3 mt-4">
              <div className="card-header">
                <h2>Edit Contact</h2>
              </div>
              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <FormGroup
                    name="name"
                    label="Name"
                    placeholder="Enter name"
                    value={name}
                    onChange={this.onChange}
                    error={error.name}
                  />
                  <FormGroup
                    name="email"
                    type="email"
                    label="Email"
                    placeholder="Enter email"
                    value={email}
                    onChange={this.onChange}
                    error={error.email}
                  />
                  <FormGroup
                    name="phone"
                    label="Phone"
                    placeholder="Enter phone"
                    value={phone}
                    onChange={this.onChange}
                    error={error.phone}
                  />
                  <button className="btn btn-primary btn-block" type="submit">Update contact</button>
                </form>
              </div>
            </div>
          )
        }}
      </Consumer>
    )
  }
}

export default EditContact;