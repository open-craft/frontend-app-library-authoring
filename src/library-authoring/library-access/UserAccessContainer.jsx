/*
Component for displaying and modifying a user's access level for a library.
 */
import {
  Button, Card, Col, Modal, Row,
} from '@edx/paragon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import React, { useContext, useState } from 'react';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { AppContext } from '@edx/frontend-platform/react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  libraryUserShape, removeUserAccess, selectLibraryAccess, setUserAccess,
} from './data';
import { LIBRARY_ACCESS, libraryShape } from '../common/data';
import messages from './messages';

export const UserAccessContainer = ({
  intl, library, user, multipleAdmins, setAccessLevel, removeAccess, isUser, showModal, setShowModal, isAdmin,
}) => (
  <Col xs={12} className="py-3">
    <Card>
      <Card.Body>
        <div className={`perm-badge ${user.access_level}`}>
          <strong>{intl.formatMessage(messages[`library.access.info.${user.access_level}`])}</strong>&nbsp;
          {isUser && intl.formatMessage(messages['library.access.info.self'])}
        </div>
        <Row className="py-3">
          <Col xs={12} md={6}>
            <span className="title title-2">
              <span className="font-weight-bold">{user.username}</span>
            </span>
            <span className="title px-2">
              <a href={`mailto:${user.email}`}>{user.email}</a>
            </span>
          </Col>
          {isAdmin && (
          <Col xs={12} md={6}>
            <Row>
              {isUser && user.access_level === LIBRARY_ACCESS.ADMIN && !multipleAdmins && (
              <Col xs={12} className="text-center text-md-right">
                <small>{intl.formatMessage(messages['library.access.info.admin_unlock'])}</small>
              </Col>
              )}
              {user.access_level === LIBRARY_ACCESS.ADMIN && multipleAdmins && (
              <Col xs={10} className="text-left text-md-right">
                <Button size="lg" variant="secondary" onClick={() => setAccessLevel(LIBRARY_ACCESS.STAFF)}>
                  {intl.formatMessage(messages['library.access.user.remove_admin'])}
                </Button>
              </Col>
              )}
              {user.access_level === LIBRARY_ACCESS.USER && (
              <Col xs={10} className="text-left text-md-right">
                <Button size="lg" variant="primary" onClick={() => setAccessLevel(LIBRARY_ACCESS.STAFF)}>
                  {intl.formatMessage(messages['library.access.user.add_author'])}
                </Button>
              </Col>
              )}
              {user.access_level === LIBRARY_ACCESS.STAFF && (
                <>
                  <Col xs={5} className="text-left text-md-right pl-md-1">
                    <Button size="lg" variant="secondary" onClick={() => setAccessLevel(LIBRARY_ACCESS.USER)}>
                      {intl.formatMessage(messages['library.access.user.remove_author'])}
                    </Button>
                  </Col>
                  <Col xs={5} className="text-left text-md-right pl-md-1">
                    <Button size="lg" variant="primary" onClick={() => setAccessLevel(LIBRARY_ACCESS.ADMIN)}>
                      {intl.formatMessage(messages['library.access.user.add_admin'])}
                    </Button>
                  </Col>
                </>
              )}
              {(!isUser || multipleAdmins) && (
              <Col xs={2} className="text-right text-md-center">
                <Button size="lg" variant="danger" onClick={() => setShowModal(true)}>
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
                <Modal
                  open={showModal}
                  title={intl.formatMessage(messages['library.access.modal.remove.title'])}
                  onClose={() => setShowModal(false)}
                  body={(
                    <div>
                      <p>
                        {intl.formatMessage(
                          messages['library.access.modal.remove.body'],
                          { library: library.title, email: user.email },
                        )}
                      </p>
                    </div>
                    )}
                  buttons={[
                    <Button onClick={() => removeAccess()}>Yes.</Button>,
                  ]}
                />
              </Col>
              )}
            </Row>
          </Col>
          )}
        </Row>
      </Card.Body>
    </Card>
  </Col>
);
export const UserAccessContainerBase = injectIntl(({
  user, ...props
}) => {
  const { authenticatedUser } = useContext(AppContext);
  const isUser = authenticatedUser.username === user.username;
  const [showModal, setShowModal] = useState(false);

  const setAccessLevel = (level) => {
    props.setUserAccess({ libraryId: props.library.id, user, level });
  };

  const removeAccess = () => {
    props.removeUserAccess({ libraryId: props.library.id, user });
  };

  const newProps = {
    ...props,
    showModal,
    setShowModal,
    isUser,
    user,
    setAccessLevel,
    removeAccess,
  };
  return <UserAccessContainer {...newProps} />;
});

UserAccessContainerBase.propTypes = {
  user: libraryUserShape.isRequired,
  intl: intlShape.isRequired,
  library: libraryShape.isRequired,
  multipleAdmins: PropTypes.bool.isRequired,
  setUserAccess: PropTypes.func.isRequired,
  removeUserAccess: PropTypes.func.isRequired,
};

UserAccessContainer.propTypes = {
  ...UserAccessContainerBase.propTypes,
  isUser: PropTypes.bool.isRequired,
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
};

export default connect(
  selectLibraryAccess,
  {
    setUserAccess,
    removeUserAccess,
  },
)(injectIntl(UserAccessContainerBase));
