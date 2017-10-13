import React, { Component } from 'react';
import querystring from 'querystring';
import {
    Alert,
    Panel,
    Button
} from 'react-bootstrap';
import Checkbox from '../Checkbox';

class ExistingPayroll extends Component {
    state = {
        loading: false,
        items: [],
        error: ''
    }

    componentDidMount = () => {
        this.setState({
            ...this.state,
            loading: true
        });

        fetch('/api/payroll/files').then((res) => {
            if (res.status === 200) {
                return res.json();
            } else {
                this.setState({
                    ...this.state,
                    error: res.statusText,
                    loading: false
                });
                throw Error(res.statusText);
            }
        }).then((json) => {
            if (json) {
                this.setState({
                    ...this.state,
                    items: json.files.map((e) => ({ name: e, checked: false })),
                    loading: false
                });
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    toggleCheckbox = label => {
        this.setState({
            ...this.state,
            items: this.state.items.map((e) => {
                if (e.name === label) {
                    e.checked = !e.checked;
                }
                return e;
            })
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        const selectedItems = this.state.items.filter((e) => (e.checked)).map((e) => (e.name));
        const query = querystring.stringify({
            files: selectedItems.join(',')
        });
        //console.log(`${process.env.REACT_APP_API_BASE_URL}/api/payroll/getFiles?${query}`);
        window.open(`${process.env.REACT_APP_API_BASE_URL}/api/payroll/getFiles?${query}`);
    }

    createCheckbox = label => (
        <Checkbox label={label} handleCheckboxChange={this.toggleCheckbox} key={label} />
    );

    createCheckboxes = () => (
        this.state.items.map(e => (this.createCheckbox(e.name)))
    );

    render() {
        return (
            <Panel header="Existing Payroll">
                {this.state.error && <Alert bsStyle="danger">{this.state.error}</Alert>}
                <form onSubmit={this.handleSubmit}>
                    {this.state.loading && <div>Loading...</div>}
                    {this.createCheckboxes()}
                    <Button bsStyle="primary" type="submit"
                        disabled={this.state.items &&
                            this.state.items.every((e) => (!e.checked))}>
                        {'Download'}
                    </Button>
                </form>
            </Panel>
        );
    }
}

export default ExistingPayroll