import React from 'react';
import {FormGroup, Input, Label} from 'reactstrap';

const InputField = ({ id, label, type, value, onChange }) => (
    <FormGroup>
        <Label for={id}>{label}</Label>
        <Input id={id} name={id} type={type} onChange={(event) => onChange(event, id)} value={value} />
    </FormGroup>
);
export default InputField;