import { Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const Header = () => (
  <Navbar bg="dark" variant="dark" expand="lg">
    <Navbar.Brand as={NavLink} to="/">
      Cargo Planner
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link as={NavLink} to="/cargo-edit/new">
          New cargo
        </Nav.Link>
        <Nav.Link as={NavLink} to="/cargo-list">
          Load cargo
        </Nav.Link>
        <Nav.Link as={NavLink} to="/result-list">
          View results
        </Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default Header;
