import React, { Component } from 'react';
import { Panel, Alert, Button, FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap';

import DatePicker from 'react-datepicker';
import * as moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';
import './GeneratePayroll.css';

class GeneratePayroll extends Component {
    state = {
        startDate: moment().startOf('day').subtract(7, 'days'),
        endDate: moment().startOf('day').subtract(1, 'days'),
        error: ''
    }

    getQueryString(params) {
        var esc = encodeURIComponent;
        return Object.keys(params)
            .map(k => esc(k) + '=' + esc(params[k]))
            .join('&');
    }

    handleSubmit = event => {
        event.preventDefault();
        const { startDate, endDate } = this.state;

        const qs = this.getQueryString({
            startDate: startDate.format('YYYYMMDD'),
            endDate: endDate.format('YYYYMMDD')
        });

        fetch(`/api/payroll?${qs}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then((res) => {
            if (res.status === 200) {
                return res.json();
            } else {
                this.setState({
                    ...this.state,
                    error: res.statusText
                });
                throw Error(res.statusText);
            }
        }).then((json) => {
            console.log(json);
            const result = json.PayrollGenPostResult;
            console.log(result);
            /*var blob = new Blob([json], { type: 'application/json' });
            if (window.navigator.msSaveOrOpenBlob)
                window.navigator.msSaveBlob(blob, "payroll.xml");
            else {
                var a = window.document.createElement("a");
                a.href = window.URL.createObjectURL(blob);
                a.download = "payroll.xml";
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            }*/
        }).catch(error => console.log(error));
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
                        onChange={(date) => (this.setState({ startDate: date }))} />
                    <this.FieldGroup
                        id="endDate"
                        label="End Date"
                        selected={this.state.endDate}
                        onChange={(date) => (this.setState({ endDate: date }))} />
                    <Button bsStyle="primary" type="submit">
                        {'Generate'}
                    </Button>
                </form>
            </Panel >
        );
    }
}

export default GeneratePayroll;