import React from 'react';
import {
  Button,
  Divider,
  Form,
  Grid,
} from 'semantic-ui-react';
import { Field } from 'redux-form';

import {
  required,
  positive,
  between,
} from 'src/lib/validations/symptoms';

import {
  renderInput,
  renderSelect,
  renderCheckbox,
} from 'src/components/Form';


const SymptomsForm = ({ trans, onSubmit }) => (
  <Form onSubmit={onSubmit}>
    <Form.Group>
      <Field
        required
        width={4}
        name="age"
        label={trans('form.age.label')}
        type="number"
        component={renderInput}
        validate={[required(), positive()]}
      />
      <Field
        required
        width={4}
        name="restingBloodPressure"
        label={trans('form.restingBloodPressure.label')}
        type="number"
        component={renderInput}
        validate={[required(), positive()]}
      />
      <Field
        required
        width={4}
        name="cholesterol"
        label={trans('form.cholesterol.label')}
        type="number"
        component={renderInput}
        validate={[required(), positive()]}
      />
    </Form.Group>
    <Form.Group>
      <Field
        required
        width={4}
        name="numMajorVessels"
        label={trans('form.numMajorVessels.label')}
        placeholder={trans('form.numMajorVessels.placeholder')}
        type="number"
        component={renderInput}
        validate={[required(), between(0, 3)]}
      />
      <Field
        required
        width={4}
        name="stDepression"
        label={trans('form.stDepression.label')}
        type="number"
        component={renderInput}
        validate={[required(), positive()]}
      />
      <Field
        required
        width={8}
        name="stSlope"
        label={trans('form.stSlope.label')}
        options={[
          { text: trans('form.stSlope.options.upsloping'), value: '1' },
          { text: trans('form.stSlope.options.flat'), value: '2' },
          { text: trans('form.stSlope.options.downsloping'), value: '3' },
        ]}
        component={renderSelect}
        validate={[required()]}
      />
    </Form.Group>
    <Form.Group>
      <Field
        required
        width={8}
        name="chestPainType"
        label={trans('form.chestPainType.label')}
        options={[
          { text: trans('form.chestPainType.options.typicalAngina'), value: '1' },
          { text: trans('form.chestPainType.options.atypicalAngina'), value: '2' },
          { text: trans('form.chestPainType.options.nonAnginalPain'), value: '3' },
          { text: trans('form.chestPainType.options.asymptomatic'), value: '4' },
        ]}
        component={renderSelect}
        validate={[required()]}
      />
      <Field
        required
        width={8}
        name="thalassemia"
        label={trans('form.thalassemia.label')}
        options={[
          { text: trans('form.thalassemia.options.normal'), value: '1' },
          { text: trans('form.thalassemia.options.fixedDefect'), value: '2' },
          { text: trans('form.thalassemia.options.reversableDefect'), value: '3' },
        ]}
        component={renderSelect}
        validate={[required()]}
      />
    </Form.Group>
    <Divider hidden />
    <Form.Group>
      <Field
        toggle
        name="exerciseInducedAngina"
        label={trans('form.exerciseInducedAngina.label')}
        component={renderCheckbox}
      />
    </Form.Group>
    <Divider />
    <Grid>
      <Grid.Row>
        <Grid.Column textAlign="right">
          <Button
            color="blue"
            size="medium"
          >
            {trans('form.submitButton')}
          </Button>

        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Form>
);

export default SymptomsForm;
