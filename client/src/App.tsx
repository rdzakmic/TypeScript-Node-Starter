import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Login } from "./components/Login";
import { Admin } from "./components/Admin";

enum Authenticated {
  login,
  authenticated,
  idle
}

interface AppState {
  isAuthenticated: Authenticated;
}
export class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = { isAuthenticated: Authenticated.idle };
  }

  componentDidMount() {
    this.ifAuthenticated();
  }

  render() {
    return (
      <div>
        <p>Shredding App</p>
        {this.renderAuthenticatedUser()}
      </div>
    );
  }


  private renderAuthenticatedUser() {
    if (this.state.isAuthenticated === Authenticated.authenticated) {
      return <Admin />
    } else if (this.state.isAuthenticated === Authenticated.login) {
      return <Login />
    } else {
      return null;
    }

  }

  private readonly ifAuthenticated = () => {
    fetch('/authenticated', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      if (response.status === 401) {
        this.setState({ isAuthenticated: Authenticated.login });
        return;
      }
      response.json().then((jsonResponse) => {
        this.setState({ isAuthenticated: Authenticated.authenticated });
      })
    }).catch(() => {
      this.setState({ isAuthenticated: Authenticated.login })
    })
  }
};