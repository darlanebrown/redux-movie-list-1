import RBNavbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

const Navbar = () => {
  return (
    <RBNavbar bg="light" expand="lg">
      <Container>
        <RBNavbar.Brand href="/">Movie Database</RBNavbar.Brand>
        <RBNavbar.Toggle />
        <RBNavbar.Collapse>
          <Nav>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/movie-list">Movie List</Nav.Link>
          </Nav>
        </RBNavbar.Collapse>
      </Container>
    </RBNavbar>
  );
}

export default Navbar;
