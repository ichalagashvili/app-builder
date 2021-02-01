import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Button, Tabs, Tab, Row, Col, Alert } from 'patternfly-react';
import { Panel } from 'react-bootstrap';
import { required, code, maxLength } from '@entando/utils';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';
import RenderTextInput from 'ui/common/form/RenderTextInput';
import FormLabel from 'ui/common/form/FormLabel';
import ConfirmCancelModalContainer from 'ui/common/cancel-modal/ConfirmCancelModalContainer';
const EDIT_MODE = 'edit';
const NEW_MODE = 'new';

const maxLength50 = maxLength(50);

export const renderDefaultGuiCodeField = (field) => {
  const { input } = field;
  if (!input.value) {
    return (
      <Alert type="info">
        <FormattedMessage id="app.alert.notAvailable" />
      </Alert>
    );
  }
  return (
    <Panel>
      <Panel.Body><pre className="PageTemplateDetailTable__template">{input.value}</pre></Panel.Body>
    </Panel>
  );
};

const defaultGuiCodeField = (
  <Field
    name="defaultGuiCode"
    component={renderDefaultGuiCodeField}
  />
);

export const renderStaticField = (field) => {
  const { input, label, name } = field;
  const fieldValue = (input.value.title) ? input.value.title : input.value.code;
  if (!input.value || fieldValue === null) {
    return null;
  }

  return (
    <div className="form-group">
      <label htmlFor={name} className="control-label col-xs-2">
        {label}
      </label>
      <Col xs={10}>
        {fieldValue}
      </Col>
    </div>
  );
};

const msgs = defineMessages({
  codePlaceholder: {
    id: 'fragment.code.placeholder',
    defaultMessage: 'Code',
  },
  guiCode: {
    id: 'fragment.tab.guiCode',
    defaultMessage: 'GUI Code',
  },
  defaultGuiCode: {
    id: 'fragment.tab.defaultGuiCode',
    defaultMessage: 'Default GUI Code',
  },
});

export const FragmentFormBody = (props) => {
  const {
    intl, handleSubmit, invalid, submitting, mode,
    dirty, onCancel, onDiscard, onSave,
  } = props;

  const handleCancelClick = () => {
    if (dirty) {
      onCancel();
    } else {
      onDiscard();
    }
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    handleSubmit();
  };

  let widgetTypeField = (
    <Field
      name="widgetType"
      component={renderStaticField}
      label={<FormattedMessage id="fragment.form.edit.widgetType" />}
    />
  );

  let pluginField = (
    <Field
      name="pluginCode"
      component={renderStaticField}
      label={<FormattedMessage id="fragment.form.edit.plugin" />}
    />
  );

  if (mode === NEW_MODE) {
    pluginField = null;
    widgetTypeField = null;
  }

  return (
    <form onSubmit={onSubmit} className="form-horizontal">
      <Row>
        <Col xs={12}>
          <fieldset className="no-padding">
            <legend>
              <FormattedMessage id="app.info" />
              <div className="WidgetForm__required-fields text-right">
                * <FormattedMessage id="app.fieldsRequired" />
              </div>
            </legend>
            <Field
              component={RenderTextInput}
              name="code"
              label={
                <FormLabel labelId="app.code" helpId="app.help.code" required />
              }
              placeholder={intl.formatMessage(msgs.codePlaceholder)}
              validate={[required, code, maxLength50]}
              disabled={mode === EDIT_MODE}
            />
            {widgetTypeField}
            {pluginField}
          </fieldset>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col xs={12}>
          <fieldset className="no-padding">
            <div className="form-group">
              <span className="control-label col-xs-2" />
              <Col xs={10}>
                <Tabs id="basic-tabs" defaultActiveKey={1}>
                  <Tab eventKey={1} title={intl.formatMessage(msgs.guiCode)} >
                    <div className="tab-content margin-large-bottom ">
                      <div className="tab-pane fade in active">
                        <Field
                          name="guiCode"
                          component="textarea"
                          cols="50"
                          rows="8"
                          className="form-control"
                          validate={[required]}
                        />
                      </div>
                    </div>
                  </Tab>
                  <Tab eventKey={2} title={intl.formatMessage(msgs.defaultGuiCode)} >
                    {defaultGuiCodeField}
                  </Tab>
                </Tabs>
              </Col>
            </div>
          </fieldset>
        </Col>
      </Row>
      <br />
      <Row>
        <Col xs={12}>
          <Button
            className="pull-right FragmentForm__save--btn"
            type="submit"
            bsStyle="primary"
            disabled={invalid || submitting}
          >
            <FormattedMessage id="app.save" />
          </Button>
          <Button
            className="pull-right"
            bsStyle="default"
            onClick={handleCancelClick}
          >
            <FormattedMessage id="app.cancel" />
          </Button>
          <ConfirmCancelModalContainer
            contentText={intl.formatMessage({ id: 'app.confirmCancel' })}
            invalid={invalid}
            submitting={submitting}
            onSave={onSave}
            onDiscard={onDiscard}
          />
        </Col>
      </Row>
    </form>
  );
};

FragmentFormBody.propTypes = {
  intl: intlShape.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
  mode: PropTypes.string,
  dirty: PropTypes.bool,
  onDiscard: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

FragmentFormBody.defaultProps = {
  invalid: false,
  submitting: false,
  mode: NEW_MODE,
  dirty: false,
};

const FragmentForm = reduxForm({
  form: 'fragment',
})(FragmentFormBody);

export default injectIntl(FragmentForm);
