import React, { Component } from 'react';
import { Panel, Alert, Button, FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import * as moment from 'moment';

import 'react-day-picker/lib/style.css';
import './GeneratePayroll.css';

class GeneratePayroll extends Component {
    state = {
        startDate: moment().subtract(7, 'days').format('L'),
        endDate: moment().subtract(1, 'days').format('L'),
        error: ''
    }

    handleSubmit = (formSubmitEvent) => {
        formSubmitEvent.preventDefault();
        console.log(formSubmitEvent);
    }

    FieldGroup = ({ id, label, help, ...props }) => {
        return (
            <FormGroup controlId={id}>
                <ControlLabel>{label}</ControlLabel>
                <DayPickerInput { ...props} className={`form-control ${props.className}`} />
                {help && <HelpBlock>{help}</HelpBlock>}
            </FormGroup>
        );
    }

    render() {
        return (
            <Panel header="Generate Payroll">
                {this.state.error && <Alert bsStyle="danger">{this.state.error}</Alert>}
                <form onSubmit={this.handleSubmit}>
                    <this.FieldGroup className="generate-date-selector" id="startDate" value={this.state.startDate} label="Start Date: " />
                    <this.FieldGroup className="generate-date-selector" id="endDate" value={this.state.endDate} label="End Date: " />
                    <Button bsStyle="primary" type="submit"
                        disabled={this.state.items &&
                            this.state.items.every((e) => (!e.checked))}>
                        {'Generate'}
                    </Button>
                </form>
            </Panel>
        );
    }
}

export default GeneratePayroll;