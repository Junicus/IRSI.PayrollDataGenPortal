import React, { Component } from 'react';
import { Panel, Alert, Button, FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap';

import DatePicker from 'react-datepicker';
import * as moment from 'moment'; 

import 'react-datepicker/dist/react-datepicker.css';
import './GeneratePayroll.css';

class GeneratePayroll extends Component {
    state = {
        startDate: moment().subtract(7, 'days'),
        endDate: moment().subtract(1, 'days'),
        error: ''
    }

    handleSubmit = (formSubmitEvent) => {
        formSubmitEvent.preventDefault();
        console.log(this.state);
    }

    FieldGroup = ({ id, label, help, ...props }) => {
        return (
            <FormGroup controlId={id}>
                <ControlLabel>{label}</ControlLabel>
                <DatePicker {...props} />
                {help && <HelpBlock>{help}</HelpBlock>}
            </FormGroup>
        );
    }

    render() {
        return (
            <Panel header="Generate Payroll">
                {this.state.error && <Alert bsStyle="danger">{this.state.error}</Alert>}
                <form onSubmit={this.handleSubmit}>
                    <this.FieldGroup 
                        id="startDate" 
                        label="Start Date" 
                        selected={this.state.startDate} 
                        onChange={(date)=>(this.setState({startDate: date}))} />
                    <this.FieldGroup 
                        id="endDate"
                        label="End Date"
                        selected={this.state.endDate}
                        onChange={(date)=>(this.setState({endDate: date}))} />
                    <Button bsStyle="primary" type="submit"
                        disabled={this.state.items &&
                            this.state.items.every((e) => (!e.checked))}>
                        {'Generate'}
                    </Button>
                </form>
            </Panel >
        );
    }
}

export default GeneratePayroll;