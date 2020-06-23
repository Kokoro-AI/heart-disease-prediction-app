import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
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
  const { onSubmit, readOnly } = props;

  const { t } = useTranslation('symptoms');

  return (
    <Form onSubmit={onSubmit} validationSchema={symptomsFormValidation()}>
      <Form.Group>
        <Input
          name="fullName"
          label={t('form.fullName.label')}
          fieldProps={{ required: true, width: 8 }}
          inputProps={{
            placeholder: t('form.fullName.placeholder'),
            readOnly,
          }}
        />
        <DatePicker
          name="date"
          label={t('form.date.label')}
          fieldProps={{ required: true, width: 8 }}
          inputProps={{
            placeholder: t('form.date.placeholder'),
            displayFormat: 'DD/MM/YYYY',
            readOnly,
          }}
        />
      </Form.Group>
      <Divider />
      <Form.Group>
        <Input
          name="age"
          label={t('form.age.label')}
          fieldProps={{ required: true, width: 4 }}
          inputProps={{
            placeholder: t('form.age.placeholder'),
            type: 'number',
            readOnly,
          }}
        />
        <Dropdown
          name="sex"
          label={t('form.sex.label')}
          options={[
            { text: t('form.sex.options.female'), value: '0' },
            { text: t('form.sex.options.male'), value: '1' },
          ]}
          fieldProps={{ required: true, width: 4 }}
          inputProps={{
            placeholder: t('form.sex.placeholder'),
            readOnly,
          }}
        />
        <Dropdown
          name="chestPainType"
          label={t('form.chestPainType.label')}
          options={[
            { text: t('form.chestPainType.options.typicalAngina'), value: '1' },
            { text: t('form.chestPainType.options.atypicalAngina'), value: '2' },
            { text: t('form.chestPainType.options.nonAnginalPain'), value: '3' },
            { text: t('form.chestPainType.options.asymptomatic'), value: '4' },
          ]}
          fieldProps={{ required: true, width: 4 }}
          inputProps={{
            placeholder: t('form.chestPainType.placeholder'),
            clearable: true,
            readOnly,
          }}
        />
        <Input
          name="restingBloodPressure"
          label={t('form.restingBloodPressure.label')}
          fieldProps={{ required: true, width: 4 }}
          inputProps={{
            placeholder: t('form.restingBloodPressure.placeholder'),
            type: 'number',
            readOnly,
          }}
        />
      </Form.Group>
      <Form.Group>
        <Input
          name="cholesterol"
          label={t('form.cholesterol.label')}
          fieldProps={{ required: true, width: 4 }}
          inputProps={{
            placeholder: t('form.cholesterol.placeholder'),
            type: 'number',
            readOnly,
          }}
        />
        <Dropdown
          name="fastingBloodSugar"
          label={t('form.fastingBloodSugar.label')}
          options={[
            { text: t('form.fastingBloodSugar.options.lower'), value: '0' },
            { text: t('form.fastingBloodSugar.options.greater'), value: '1' },
          ]}
          fieldProps={{ required: true, width: 4 }}
          inputProps={{
            placeholder: t('form.fastingBloodSugar.placeholder'),
            readOnly,
          }}
        />
        <Dropdown
          name="restEcg"
          label={t('form.restEcg.label')}
          options={[
            { text: t('form.restEcg.options.0'), value: '0' },
            { text: t('form.restEcg.options.1'), value: '1' },
            { text: t('form.restEcg.options.2'), value: '2' },
          ]}
          fieldProps={{ required: true, width: 4 }}
          inputProps={{
            placeholder: t('form.restEcg.placeholder'),
            readOnly,
          }}
        />
        <Input
          name="maxHeartRateAchieved"
          label={t('form.maxHeartRateAchieved.label')}
          fieldProps={{ required: true, width: 4 }}
          inputProps={{
            placeholder: t('form.maxHeartRateAchieved.placeholder'),
            type: 'number',
            readOnly,
          }}
        />
      </Form.Group>
      <Form.Group>
        <Input
          name="stDepression"
          label={t('form.stDepression.label')}
          fieldProps={{ required: true, width: 4 }}
          inputProps={{
            placeholder: t('form.stDepression.placeholder'),
            type: 'number',
            readOnly,
          }}
        />
        <Dropdown
          name="stSlope"
          label={t('form.stSlope.label')}
          options={[
            { text: t('form.stSlope.options.upsloping'), value: '1' },
            { text: t('form.stSlope.options.flat'), value: '2' },
            { text: t('form.stSlope.options.downsloping'), value: '3' },
          ]}
          fieldProps={{ required: true, width: 4 }}
          inputProps={{
            placeholder: t('form.stSlope.placeholder'),
            clearable: true,
            readOnly,
          }}
        />
        <Input
          name="numMajorVessels"
          label={t('form.numMajorVessels.label')}
          fieldProps={{ required: true, width: 4 }}
          inputProps={{
            placeholder: t('form.numMajorVessels.placeholder'),
            type: 'number',
            readOnly,
          }}
        />
        <Dropdown
          name="thalassemia"
          label={t('form.thalassemia.label')}
          options={[
            { text: t('form.thalassemia.options.normal'), value: '1' },
            { text: t('form.thalassemia.options.fixedDefect'), value: '2' },
            { text: t('form.thalassemia.options.reversableDefect'), value: '3' },
          ]}
          fieldProps={{ required: true, width: 4 }}
          inputProps={{
            placeholder: t('form.thalassemia.placeholder'),
            clearable: true,
            readOnly,
          }}
        />
      </Form.Group>
      <Divider hidden />
      <Form.Group>
        <Checkbox
          name="exerciseInducedAngina"
          label={t('form.exerciseInducedAngina.label')}
          inputProps={{
            placeholder: t('form.exerciseInducedAngina.placeholder'),
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
                  {t('form.submitButton')}
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
  onSubmit: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
};

export default SymptomsForm;
