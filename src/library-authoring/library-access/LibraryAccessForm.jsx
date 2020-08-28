/*
Form for adding a new Library user.
 */
import {
  Button, Card, Icon, Input, Row, StatefulButton, ValidationFormGroup,
} from '@edx/paragon';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { LIBRARY_ACCESS, libraryShape, SUBMISSION_STATUS } from '../common/data';
import messages from './messages';
import {
  addUser, clearAccessErrors, libraryAccessInitialState, selectLibraryAccess,
} from './data';

const LibraryAccessForm = (
  {
    intl, onSubmit, setShowAdd, hasFieldError, getFieldError, data,
    onValueChange, getSubmitButtonState,
  },
) => (
  <>
    <Row className="mb-2">
      <form className="col-12" onSubmit={onSubmit}>
        <Card>
          <Card.Body>
            <div className="form-create">
              <Card.Title>Grant Access to This Library</Card.Title>
              <fieldset>
                <ol className="list-input">
                  <li className="field">
                    <ValidationFormGroup
                      for="title"
                      helpText={intl.formatMessage(messages['library.access.form.email.help'])}
                      invalid={hasFieldError('email')}
                      invalidMessage={getFieldError('email')}
                      className="mb-0 mr-2"
                    >
                      <label className="h6 d-block" htmlFor="email">
                        {intl.formatMessage(messages['library.access.form.email.label'])}
                      </label>
                      <Input
                        name="email"
                        id="email"
                        type="text"
                        placeholder={intl.formatMessage(messages['library.access.form.email.placeholder'])}
                        value={data.email}
                        onChange={onValueChange}
                      />
                    </ValidationFormGroup>
                  </li>
                </ol>
              </fieldset>
            </div>
          </Card.Body>
        </Card>
        <Card className="mb-5">
          <Card.Body>
            <StatefulButton
              variant="primary"
              type="submit"
              size="lg"
              state={getSubmitButtonState()}
              labels={{
                disabled: intl.formatMessage(messages['library.access.form.button.submit']),
                enabled: intl.formatMessage(messages['library.access.form.button.submit']),
                pending: intl.formatMessage(messages['library.access.form.button.submitting']),
              }}
              icons={{
                pending: <Icon className="fa fa-spinner fa-spin" />,
              }}
              disabledStates={['disabled', 'pending']}
              className="action-button"
            />
            <Button size="lg" variant="secondary" className="mx-3 action-button" onClick={() => setShowAdd(false)}>Cancel</Button>
          </Card.Body>
        </Card>
      </form>
    </Row>
  </>
);

LibraryAccessForm.propTypes = {
  intl: intlShape.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired,
  onValueChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  setShowAdd: PropTypes.func.isRequired,
  hasFieldError: PropTypes.func.isRequired,
  getFieldError: PropTypes.func.isRequired,
  getSubmitButtonState: PropTypes.func.isRequired,
};

const initialFormState = () => ({
  email: '',
  access_level: LIBRARY_ACCESS.USER,
});

const LibraryAccessFormContainer = (
  props,
) => {
  const [data, setData] = useState({
    email: '',
    access_level: LIBRARY_ACCESS.USER,
  });

  const onSubmit = (event) => {
    event.preventDefault();
    props.addUser({ libraryId: props.library.id, data }).then(() => {
      setData(initialFormState());
    });
  };

  const onValueChange = (event) => {
    const { name, value } = event.target;
    setData(current => (
      {
        ...current,
        [name]: value,
      }
    ));
  };

  const hasFieldError = (fieldName) => !!(props.errorFields && (fieldName in props.errorFields));

  const getFieldError = (fieldName) => {
    if (hasFieldError(fieldName)) {
      return props.errorFields[fieldName];
    }
    return null;
  };

  const getSubmitButtonState = () => {
    let state;
    if (props.submissionStatus === SUBMISSION_STATUS.SUBMITTING) {
      state = 'pending';
    } else if (data.email.match(/.+@.+[.].+/)) {
      state = 'enabled';
    } else {
      state = 'disabled';
    }
    return state;
  };
  return (
    <LibraryAccessForm
      intl={props.intl}
      library={props.library}
      data={data}
      getSubmitButtonState={getSubmitButtonState}
      clearAccessErrors={props.clearAccessErrors}
      hasFieldError={hasFieldError}
      getFieldError={getFieldError}
      onValueChange={onValueChange}
      onSubmit={onSubmit}
      setShowAdd={props.setShowAdd}
    />
  );
};

LibraryAccessFormContainer.defaultProps = libraryAccessInitialState;

LibraryAccessFormContainer.propTypes = {
  intl: intlShape.isRequired,
  library: libraryShape.isRequired,
  clearAccessErrors: PropTypes.func.isRequired,
  addUser: PropTypes.func.isRequired,
  setShowAdd: PropTypes.func.isRequired,
  submissionStatus: PropTypes.oneOf(Object.values(SUBMISSION_STATUS)).isRequired,
  errorFields: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

export default connect(
  selectLibraryAccess,
  {
    clearAccessErrors,
    addUser,
  },
)(injectIntl(LibraryAccessFormContainer));
