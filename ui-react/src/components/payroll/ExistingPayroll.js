import React, { Component } from 'react';
import {
    Panel,
    Button
} from 'react-bootstrap';
import Checkbox from '../Checkbox';

class ExistingPayroll extends Component {
    state = {
        items: [],

    }

    componentWillMount = () => {
        this.selectedCheckboxes = new Set();
    }

    toggleCheckbox = label => {
        if (this.selectedCheckboxes.has(label)) {
            this.selectedCheckboxes.delete(label);
        } else {
            this.selectedCheckboxes.add(label);
        }
    }

    handleSubmit = event => {
        event.preventDefault();
    }

    createCheckbox = label => (
        <Checkbox label={label} handleCheckboxChange={this.toggleCheckbox} key={label} />
    );

    createCheckboxes = () => (
        this.state.items.map(this.createCheckbox)
    );

    render() {
        let submitClass = `btn`;
        submitClass += (this.state.items && this.state.items.length > 0) ? '' : ' '
        return (
            <Panel header="Existing Payroll">
                <form onSubmit={this.handleSubmit}>
                    {this.createCheckboxes()}
                    <Button bsStyle="primary" type="submit"
                        disabled={
                            (this.state.items && this.state.items.length === 0) ||
                            this.selectedCheckboxes.length === 0
                        }>
                        Download
                    </Button>
                </form>
            </Panel>
        );
    }
}

export default ExistingPayroll