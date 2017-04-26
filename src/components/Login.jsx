import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '@/modules/auth/actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.login(this.state);
  }

  render() {
    return (
      <div className="login">
        <form onSubmit={this.onSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            value={this.props.username}
            onChange={this.onInputChange}
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            value={this.props.password}
            onChange={this.onInputChange}
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  login: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  userData: state.auth.userData,
});

const mapDispatchToProps = {
  ...actions,
};

// make & dispatch actions
export default connect(mapStateToProps, mapDispatchToProps)(Login);
