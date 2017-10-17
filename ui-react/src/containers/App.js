import React, { Component } from 'react';
import { PageHeader } from 'react-bootstrap'

import GeneratePayroll from '../components/payroll/GeneratePayroll';
import ExistingPayroll from '../components/payroll/ExistingPayroll';

class App extends Component {
    render() {
        return (
            <div style={{ padding: 5 }}>
                <PageHeader>Payroll Tools</PageHeader>
                <GeneratePayroll />
                <ExistingPayroll />
            </div>
        );
    }
}

export default App;