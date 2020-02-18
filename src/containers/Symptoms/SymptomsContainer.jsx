import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Header, Segment } from 'semantic-ui-react';
import SymptomsForm from 'src/components/Symptoms';
import { Redirect } from 'react-router';
import { useTauProlog } from 'src/lib/hooks/tau-prolog-hook';

const analyze = (data) => {
  const { pl } = useTauProlog();
  console.log('analyzing data...', data, pl);
  pl.query('disease(p1)');
};

const SymptomsContainer = ({ trans, handleSubmit }) => {
  const symptoms = useSelector((state) => state.form.symptoms);
  const { query } = useTauProlog();

  console.log(query('disease(p1)'));

  if (symptoms && symptoms.submitSucceeded) {
    return (<Redirect to="/results" />);
  }
  return (
    <Container style={{ paddingTop: 100 }}>
      <Segment>
        <Header as="h2">
          {trans('symptoms:form.title')}
          <Header.Subheader>
            {trans('symptoms:form.subtitle')}
          </Header.Subheader>
        </Header>
        <SymptomsForm
          trans={(name, ...args) => trans(`symptoms:${name}`, ...args)}
          onSubmit={handleSubmit(analyze)}
        />
      </Segment>
    </Container>
  );
};

export default SymptomsContainer;
