import * as React from 'react';
import { ChangeEvent } from 'react';
import { Admin } from './Admin';
import { RoleMessage } from '../../../src/projections';

interface LoginState {
    email?: string;
    password?: string;
    role?: string;
}

export class Login extends React.Component<{}, LoginState> {
    constructor(props: {}) {
        super(props);
        this.state = { email: '', password: '', role: '' };
    }

    render() {
        if (this.state.role === 'admin') {
            return <Admin />
        } else {
            return (
                <div>
                    <label>email</label>
                    <input value={this.state.email} type="email" onChange={this.emailChangeHandler} />
                    <label>password</label>
                    <input value={this.state.password} type="password" onChange={this.passwordChangeHandler} />
                    <button onClick={this.onLogin}>Login</button>
                </div>
            )
        }

    }
    private readonly emailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({ email: event.target.value });
    }

    private readonly passwordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({ password: event.target.value });
    }

    private readonly onLogin = () => {
        if (this.state.email && this.state.password) {
            fetch('/login', {
                method: 'POST',
                body: JSON.stringify(
                    {
                        credentials: {
                            email: this.state.email,
                            password: this.state.password
                        }
                    }
                ),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                response.json().then((jsonResponse: RoleMessage) => {
                    this.setState({ role: jsonResponse.role });
                });
            });
        }
    }
}