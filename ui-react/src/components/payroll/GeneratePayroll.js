import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';

class GeneratePayroll extends Component {

    state = {
        loading: false,
        files: [],
        error: ''
    }

    componentDidMount() {

    }

    render() {
        return (
        <Panel header="Generate Payroll">
            Test
        </Panel>
        );
    }
}

export default GeneratePayroll;