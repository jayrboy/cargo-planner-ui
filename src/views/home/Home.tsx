import logo from '../../assets/react.svg';
import './Home.css';
import { Link } from 'react-router-dom';
import { Row, Col, Image, Container } from 'react-bootstrap';

const Home = () => {
  return (
    <Container className="jumbotron">
      <Row className="justify-content-md-center">
        <Col md="auto">
          <h1>Cargo Planner</h1>
          <Image src={logo} alt="logo" fluid />
          <p>
            Cargo Planner provides 3D solutions for truck loading problem. Begin
            by creating a new instance, or loading an existing one.
          </p>
        </Col>
      </Row>

      <Row className="justify-content-md-center">
        <Col md="auto">
          {' '}
          <Link to="/cargo-edit/new">
            <button className="btn btn-primary btn-sm">New cargo</button>
          </Link>{' '}
          <Link to="/cargo-list">
            <button className="btn btn-primary btn-sm">Load cargo</button>
          </Link>{' '}
          <Link to="/result-list">
            <button className="btn btn-primary btn-sm">View results</button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
