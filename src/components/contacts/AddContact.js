import React, { Component } from 'react';
import { Consumer } from '../../context';
import axios from 'axios';
import FormGroup from '../layout/FormGroup';

class AddContact extends Component {

  state = {
    name: '',
    email: '',
    phone: '',
    error: {}
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

    const newContact = {
      name,
      email,
      phone
    }

    const res = await axios.post('https://jsonplaceholder.typicode.com/users', newContact);
    dispatch({ type: 'ADD_CONTACT', payload: res.data });

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
                <h2>Add Contact</h2>
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
                  <button className="btn btn-primary btn-block" type="submit">Add contact</button>
                </form>
              </div>
            </div>
          )
        }}
      </Consumer>
    )
  }
}

export default AddContact;