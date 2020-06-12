import React from 'react';
import PropTypes from 'prop-types';

import {
  Divider,
  Grid,
} from 'semantic-ui-react';

import {
  Button,
  Form,
  Input,
  Dropdown,
  Checkbox,
} from 'formik-semantic-ui';

import { symptomsFormValidation } from 'app/validations';
import { DatePicker } from 'app/components/Form';

const SymptomsForm = (props) => {
  const {
    translate,
    onSubmit,
    readOnly,
  } = props;

  return (
    <Form onSubmit={onSubmit} validationSchema={symptomsFormValidation}>
      <Form.Group>
        <Input
          name="fullName"
          label={translate('form.fullName.label')}
          fieldProps={{ required: true, width: 8 }}
          inputProps={{
            placeholder: translate('form.fullName.placeholder'),
            readOnly,
          }}
        />
        <DatePicker
          name="date"
          label={translate('form.date.label')}
          fieldProps={{ required: true, width: 8 }}
          inputProps={{
            placeholder: translate('form.date.placeholder'),
            displayFormat: 'DD/MM/YYYY',
            readOnly,
          }}
        />
      </Form.Group>
      <Divider />
      <Form.Group>
        <Input
          name="age"
          label={translate('form.age.label')}
          fieldProps={{ required: true, width: 4 }}
          inputProps={{
            placeholder: translate('form.age.placeholder'),
            type: 'number',
            readOnly,
          }}
        />
        <Dropdown
          name="sex"
          label={translate('form.sex.label')}
          options={[
            { text: translate('form.sex.options.female'), value: '0' },
            { text: translate('form.sex.options.male'), value: '1' },
          ]}
          fieldProps={{ required: true, width: 4 }}
          inputProps={{
            placeholder: translate('form.sex.placeholder'),
            readOnly,
          }}
        />
        <Dropdown
          name="chestPainType"
          label={translate('form.chestPainType.label')}
          options={[
            { text: translate('form.chestPainType.options.typicalAngina'), value: '1' },
            { text: translate('form.chestPainType.options.atypicalAngina'), value: '2' },
            { text: translate('form.chestPainType.options.nonAnginalPain'), value: '3' },
            { text: translate('form.chestPainType.options.asymptomatic'), value: '4' },
          ]}
          fieldProps={{ required: true, width: 4 }}
          inputProps={{
            placeholder: translate('form.chestPainType.placeholder'),
            clearable: true,
            readOnly,
          }}
        />
        <Input
          name="restingBloodPressure"
          label={translate('form.restingBloodPressure.label')}
          fieldProps={{ required: true, width: 4 }}
          inputProps={{
            placeholder: translate('form.restingBloodPressure.placeholder'),
            type: 'number',
            readOnly,
          }}
        />
      </Form.Group>
      <Form.Group>
        <Input
          name="cholesterol"
          label={translate('form.cholesterol.label')}
          fieldProps={{ required: true, width: 4 }}
          inputProps={{
            placeholder: translate('form.cholesterol.placeholder'),
            type: 'number',
            readOnly,
          }}
        />
        <Dropdown
          name="fastingBloodSugar"
          label={translate('form.fastingBloodSugar.label')}
          options={[
            { text: translate('form.fastingBloodSugar.options.lower'), value: '0' },
            { text: translate('form.fastingBloodSugar.options.greater'), value: '1' },
          ]}
          fieldProps={{ required: true, width: 4 }}
          inputProps={{
            placeholder: translate('form.fastingBloodSugar.placeholder'),
            readOnly,
          }}
        />
        <Dropdown
          name="restEcg"
          label={translate('form.restEcg.label')}
          options={[
            { text: translate('form.restEcg.options.0'), value: '0' },
            { text: translate('form.restEcg.options.1'), value: '1' },
            { text: translate('form.restEcg.options.2'), value: '2' },
          ]}
          fieldProps={{ required: true, width: 4 }}
          inputProps={{
            placeholder: translate('form.restEcg.placeholder'),
            readOnly,
          }}
        />
        <Input
          name="maxHeartRateAchieved"
          label={translate('form.maxHeartRateAchieved.label')}
          fieldProps={{ required: true, width: 4 }}
          inputProps={{
            placeholder: translate('form.maxHeartRateAchieved.placeholder'),
            type: 'number',
            readOnly,
          }}
        />
      </Form.Group>
      <Form.Group>
        <Input
          name="stDepression"
          label={translate('form.stDepression.label')}
          fieldProps={{ required: true, width: 4 }}
          inputProps={{
            placeholder: translate('form.stDepression.placeholder'),
            type: 'number',
            readOnly,
          }}
        />
        <Dropdown
          name="stSlope"
          label={translate('form.stSlope.label')}
          options={[
            { text: translate('form.stSlope.options.upsloping'), value: '1' },
            { text: translate('form.stSlope.options.flat'), value: '2' },
            { text: translate('form.stSlope.options.downsloping'), value: '3' },
          ]}
          fieldProps={{ required: true, width: 4 }}
          inputProps={{
            placeholder: translate('form.stSlope.placeholder'),
            clearable: true,
            readOnly,
          }}
        />
        <Input
          name="numMajorVessels"
          label={translate('form.numMajorVessels.label')}
          fieldProps={{ required: true, width: 4 }}
          inputProps={{
            placeholder: translate('form.numMajorVessels.placeholder'),
            type: 'number',
            readOnly,
          }}
        />
        <Dropdown
          name="thalassemia"
          label={translate('form.thalassemia.label')}
          options={[
            { text: translate('form.thalassemia.options.normal'), value: '1' },
            { text: translate('form.thalassemia.options.fixedDefect'), value: '2' },
            { text: translate('form.thalassemia.options.reversableDefect'), value: '3' },
          ]}
          fieldProps={{ required: true, width: 4 }}
          inputProps={{
            placeholder: translate('form.thalassemia.placeholder'),
            clearable: true,
            readOnly,
          }}
        />
      </Form.Group>
      <Divider hidden />
      <Form.Group>
        <Checkbox
          name="exerciseInducedAngina"
          label={translate('form.exerciseInducedAngina.label')}
          inputProps={{
            placeholder: translate('form.exerciseInducedAngina.placeholder'),
            toggle: true,
            readOnly,
          }}
        />
      </Form.Group>
      {
        !readOnly && (
          <Grid>
            <Grid.Row>
              <Grid.Column textAlign="right">
                <Button.Submit
                  color="blue"
                  size="medium"
                >
                  {translate('form.submitButton')}
                </Button.Submit>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        )
      }
    </Form>
  );
};

SymptomsForm.defaultProps = {
  readOnly: false,
};

SymptomsForm.propTypes = {
  translate: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
};

export default SymptomsForm;
