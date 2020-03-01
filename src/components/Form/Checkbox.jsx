import React from 'react';
import { Form, Icon } from 'semantic-ui-react';

const renderCheckbox = (field) => {
  if (field.inputProps.readOnly) {
    return (
      <Form.Field>
        <label>{field.label}</label>
        {
          field.input.value
            ? <Icon name="check" color="green" />
            : <Icon name="cancel" color="red" />
        }
      </Form.Field>
    );
  }

  if (field.labelPosition === 'top') {
    return (
      <Form.Field>
        <label>{field.label}</label>
        <Form.Checkbox
          checked={!!field.input.value}
          name={field.input.name}
          onChange={field.inputProps.readOnly ? undefined : (
            (e, { checked }) => field.input.onChange(checked)
          )}
          toggle={field.toggle}
        />
      </Form.Field>
    );
  }

  return (
    <Form.Checkbox
      checked={!!field.input.value}
      name={field.input.name}
      label={field.label}
      onChange={(e, { checked }) => field.input.onChange(checked)}
      toggle={field.toggle}
    />
  );
};

export default renderCheckbox;
