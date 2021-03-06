import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import GenericModalContainer from 'ui/common/modal/GenericModalContainer';
import { Button, FormGroup, Modal, Row, Col } from 'patternfly-react';

export const MODAL_ID = 'AddAuthorityModal';

const AddAuthorityModal = ({
  groupOptions, rolesOptions, onClickAdd, setGroupRef, setRoleRef,
}) => {
  const buttons = [
    <Button bsStyle="primary" id="UserAuthorityTable__add" onClick={onClickAdd}>
      <FormattedMessage id="app.add" />
    </Button>,
  ];

  const modalTitle = (
    <Modal.Title>
      <FormattedMessage id="user.authority.new" />
    </Modal.Title>
  );

  return (
    <GenericModalContainer
      modalId={MODAL_ID}
      buttons={buttons}
      modalTitle={modalTitle}
      className="UnpublishPageModal"
      data-testid="addAuthorityModal"
    >
      <FormGroup>
        <Row>
          <label className="control-label col-xs-3" htmlFor="group">
            <FormattedMessage id="user.authority.groups" />
          </label>
          <Col xs={9}>
            <select
              className="form-control"
              name="group"
              ref={setGroupRef}
              data-testid="groups"
            >
              {groupOptions}
            </select>
          </Col>
        </Row>
      </FormGroup>
      <FormGroup>
        <Row>
          <label className="control-label col-xs-3" htmlFor="roles">
            <FormattedMessage id="user.authority.roles" />
          </label>
          <Col xs={9}>
            <select
              className="form-control"
              name="roles"
              ref={setRoleRef}
              data-testid="roles"
            >
              {rolesOptions}
            </select>
          </Col>
        </Row>
      </FormGroup>
    </GenericModalContainer>
  );
};

AddAuthorityModal.propTypes = {
  groupOptions: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    code: PropTypes.string,
  })),
  rolesOptions: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    code: PropTypes.string,
  })),
  onClickAdd: PropTypes.func.isRequired,
  setGroupRef: PropTypes.func.isRequired,
  setRoleRef: PropTypes.func.isRequired,
};

AddAuthorityModal.defaultProps = {
  groupOptions: [],
  rolesOptions: [],
};

export default AddAuthorityModal;
