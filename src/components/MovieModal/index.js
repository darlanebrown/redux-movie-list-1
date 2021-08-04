import { PropTypes } from 'prop-types';
import { Row, } from 'react-bootstrap';
import RBModal from 'react-bootstrap/Modal';

import { StyledRBCol, StyledRBModalBody, StyledRBModalHeader } from './styled';
// show: boolean, onClose: function, children: Component
const MovieModal = ({ show, onClose: handleModalClose, children }) => {
  return (
    <RBModal
      className="show-grid"
      size="xl"
      centered
      show={show}
      onHide={handleModalClose}
    >
      <Row>
        <StyledRBCol xs={2} sm={2} md={3} lg={3} />
        <StyledRBCol xs sm md lg={true}>
          <StyledRBModalHeader closeButton>&nbsp;</StyledRBModalHeader>
          <StyledRBModalBody>
            { children }
          </StyledRBModalBody>
        </StyledRBCol>
      </Row>
    </RBModal>
  )
}

MovieModal.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func,
}

export default MovieModal;