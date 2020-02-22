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

const SymptomsForm = ({ translate, onSubmit, handleSubmit }) => (
  <Form onSubmit={handleSubmit(onSubmit)}>
    <Form.Group>
      <Field
        required
        width={4}
        name="age"
        label={translate('form.age.label')}
        placeholder={translate('form.age.placeholder')}
        type="number"
        component={renderInput}
        validate={[required(), positive()]}
      />
      <Field
        required
        width={4}
        name="sex"
        label={translate('form.sex.label')}
        placeholder={translate('form.sex.placeholder')}
        component={renderSelect}
        validate={[required()]}
        options={[
          { text: translate('form.sex.options.female'), value: '0' },
          { text: translate('form.sex.options.male'), value: '1' },
        ]}
      />
      <Field
        width={4}
        name="chestPainType"
        label={translate('form.chestPainType.label')}
        placeholder={translate('form.chestPainType.placeholder')}
        component={renderSelect}
        inputProps={{ clearable: true }}
        options={[
          { text: translate('form.chestPainType.options.typicalAngina'), value: '1' },
          { text: translate('form.chestPainType.options.atypicalAngina'), value: '2' },
          { text: translate('form.chestPainType.options.nonAnginalPain'), value: '3' },
          { text: translate('form.chestPainType.options.asymptomatic'), value: '4' },
        ]}
      />
      <Field
        required
        width={4}
        name="restingBloodPressure"
        label={translate('form.restingBloodPressure.label')}
        placeholder={translate('form.restingBloodPressure.placeholder')}
        type="number"
        component={renderInput}
        validate={[required(), positive()]}
      />
    </Form.Group>
    <Form.Group>
      <Field
        required
        width={4}
        name="cholesterol"
        label={translate('form.cholesterol.label')}
        placeholder={translate('form.cholesterol.placeholder')}
        type="number"
        component={renderInput}
        validate={[required(), positive()]}
      />
      <Field
        required
        width={4}
        name="fastingBloodSugar"
        label={translate('form.fastingBloodSugar.label')}
        placeholder={translate('form.fastingBloodSugar.placeholder')}
        component={renderSelect}
        validate={[required()]}
        options={[
          { text: translate('form.fastingBloodSugar.options.lower'), value: '0' },
          { text: translate('form.fastingBloodSugar.options.greater'), value: '1' },
        ]}
      />
      <Field
        required
        width={4}
        name="restEcg"
        label={translate('form.restEcg.label')}
        placeholder={translate('form.restEcg.placeholder')}
        component={renderSelect}
        validate={[required()]}
        options={[
          { text: translate('form.restEcg.options.0'), value: '0' },
          { text: translate('form.restEcg.options.1'), value: '1' },
          { text: translate('form.restEcg.options.2'), value: '2' },
        ]}
      />
      <Field
        required
        width={4}
        name="maxHeartRateAchieved"
        label={translate('form.maxHeartRateAchieved.label')}
        placeholder={translate('form.maxHeartRateAchieved.placeholder')}
        type="number"
        component={renderInput}
        validate={[required(), positive()]}
      />
    </Form.Group>
    <Form.Group>
      <Field
        required
        width={4}
        name="stDepression"
        label={translate('form.stDepression.label')}
        placeholder={translate('form.stDepression.placeholder')}
        type="number"
        component={renderInput}
        validate={[required(), positive()]}
      />
      <Field
        width={4}
        name="stSlope"
        label={translate('form.stSlope.label')}
        placeholder={translate('form.stSlope.placeholder')}
        component={renderSelect}
        inputProps={{ clearable: true }}
        options={[
          { text: translate('form.stSlope.options.upsloping'), value: '1' },
          { text: translate('form.stSlope.options.flat'), value: '2' },
          { text: translate('form.stSlope.options.downsloping'), value: '3' },
        ]}
      />
      <Field
        required
        width={4}
        name="numMajorVessels"
        label={translate('form.numMajorVessels.label')}
        placeholder={translate('form.numMajorVessels.placeholder')}
        type="number"
        component={renderInput}
        validate={[required(), between(0, 3)]}
      />
      <Field
        width={4}
        name="thalassemia"
        label={translate('form.thalassemia.label')}
        placeholder={translate('form.thalassemia.placeholder')}
        component={renderSelect}
        inputProps={{ clearable: true }}
        options={[
          { text: translate('form.thalassemia.options.normal'), value: '1' },
          { text: translate('form.thalassemia.options.fixedDefect'), value: '2' },
          { text: translate('form.thalassemia.options.reversableDefect'), value: '3' },
        ]}
      />
    </Form.Group>
    <Divider hidden />
    <Form.Group>
      <Field
        toggle
        name="exerciseInducedAngina"
        label={translate('form.exerciseInducedAngina.label')}
        placeholder={translate('form.exerciseInducedAngina.placeholder')}
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
            {translate('form.submitButton')}
          </Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Form>
);

export default SymptomsForm;
