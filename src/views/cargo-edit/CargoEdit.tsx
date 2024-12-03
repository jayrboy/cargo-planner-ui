import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Item, Truck, Instance } from '../../models/Input';
import ItemListItem from './ItemListItem';
import {
  Button,
  Container,
  Col,
  ListGroup,
  Form,
  Card,
  Row,
} from 'react-bootstrap';
import {
  getInstance,
  postInstance,
  putInstance,
} from '../../services/InstanceService';
import { getUserId } from '../../services/UserService';

function CargoEdit() {
  const userId: string = getUserId();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [instanceId, setInstanceId] = useState('');
  const [items, setItems] = useState<Item[]>([]);
  const [item, setItem] = useState<Item>(defaultItem());
  const [truck, setTruck] = useState<Truck>(defaultTruck());

  useEffect(() => {
    const fetchInstance = async () => {
      if (id !== 'new') {
        setInstanceId(id || '');
        const loadedInstance: Instance = await getInstance(id || '');
        setItems(loadedInstance.items);
        setTruck(loadedInstance.truck);
      }
    };

    fetchInstance();
  }, [id]);

  function getNewId() {
    const lastItem = [...items].sort((a, b) => a.type - b.type).slice(-1)[0];
    return lastItem ? lastItem.type + 1 : 1;
  }

  function defaultInstance(): Instance {
    return {
      userId,
      items: [],
      truck: defaultTruck(),
    };
  }

  function defaultItem(id: number = 0): Item {
    return {
      type: id,
      description: '',
      width: 0,
      depth: 0,
      height: 0,
      weight: 0,
      count: 1,
    };
  }

  function defaultTruck(): Truck {
    return {
      width: 0,
      depth: 0,
      height: 0,
      frontAxle: {
        offset: 0,
        initialLoad: 0,
        maximumLoad: 0,
      },
      rearAxle: {
        offset: 0,
        initialLoad: 0,
        maximumLoad: 0,
      },
    };
  }

  function handleEdit(index: number) {
    setItem(items[index]);
  }

  function handleDelete(index: number) {
    setItems([...items.slice(0, index), ...items.slice(index + 1)]);
  }

  function handleAdd() {
    setItems([...items, { ...item, type: getNewId() }]);
    setItem(defaultItem());
  }

  function handleSave() {
    const index = items.findIndex((x) => x.type === item.type);
    if (index > -1) {
      setItems([...items.slice(0, index), item, ...items.slice(index + 1)]);
    }
    setItem(defaultItem());
  }

  function handleSend() {
    const payload = {
      userId,
      truck,
      items,
    };

    if (instanceId) {
      putInstance(payload, instanceId);
    } else {
      postInstance(payload);
    }
  }

  function handleSolve() {
    navigate(`/result/${instanceId}/solve/0`);
    window.location.reload();
  }
  return (
    <div>
      <style type="text/css">
        {`
        .list-group {
          overflow-x:auto;
        }

        .button {          
          margin: 10px
          padding: 10px
        }
        `}
      </style>
      <Container fluid>
        <br />
        <Card>
          <Card.Body>
            <Card.Title>Truck</Card.Title>
            <Form>
              <Row>
                <Form.Group as={Col}>
                  <Form.Label>Width</Form.Label>
                  <Form.Control
                    value={truck.width}
                    onChange={(e) =>
                      setTruck({ ...truck, width: Number(e.target.value) })
                    }
                    placeholder="Width [cm]"
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Height</Form.Label>
                  <Form.Control
                    value={truck.height}
                    onChange={(e) =>
                      setTruck({ ...truck, height: Number(e.target.value) })
                    }
                    placeholder="Height [cm]"
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Depth</Form.Label>
                  <Form.Control
                    value={truck.depth}
                    onChange={(e) =>
                      setTruck({ ...truck, depth: Number(e.target.value) })
                    }
                    placeholder="Depth [cm]"
                  />
                </Form.Group>
              </Row>
            </Form>
          </Card.Body>
          <Card.Body>
            <Card.Subtitle>Front axle</Card.Subtitle>
            <Form>
              <Row>
                <Form.Group as={Col}>
                  <Form.Label>Offset</Form.Label>
                  <Form.Control
                    value={truck.frontAxle.offset}
                    onChange={(e) =>
                      setTruck({
                        ...truck,
                        frontAxle: {
                          ...truck.frontAxle,
                          offset: Number(e.target.value),
                        },
                      })
                    }
                    placeholder="Offset [cm]"
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Initial load</Form.Label>
                  <Form.Control
                    value={truck.frontAxle.initialLoad}
                    onChange={(e) =>
                      setTruck({
                        ...truck,
                        frontAxle: {
                          ...truck.frontAxle,
                          initialLoad: Number(e.target.value),
                        },
                      })
                    }
                    placeholder="Initial load [kg]"
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Maximum load</Form.Label>
                  <Form.Control
                    value={truck.frontAxle.maximumLoad}
                    onChange={(e) =>
                      setTruck({
                        ...truck,
                        frontAxle: {
                          ...truck.frontAxle,
                          maximumLoad: Number(e.target.value),
                        },
                      })
                    }
                    placeholder="Maximum load [kg]"
                  />
                </Form.Group>
              </Row>
            </Form>
            <Card.Subtitle>Rear axle</Card.Subtitle>
            <Form>
              <Row>
                <Form.Group as={Col}>
                  <Form.Label>Offset</Form.Label>
                  <Form.Control
                    value={truck.rearAxle.offset}
                    onChange={(e) =>
                      setTruck({
                        ...truck,
                        rearAxle: {
                          ...truck.rearAxle,
                          offset: Number(e.target.value),
                        },
                      })
                    }
                    placeholder="Offset [cm]"
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Initial load</Form.Label>
                  <Form.Control
                    value={truck.rearAxle.initialLoad}
                    onChange={(e) =>
                      setTruck({
                        ...truck,
                        rearAxle: {
                          ...truck.rearAxle,
                          initialLoad: Number(e.target.value),
                        },
                      })
                    }
                    placeholder="Initial load [kg]"
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Maximum load</Form.Label>
                  <Form.Control
                    value={truck.rearAxle.maximumLoad}
                    onChange={(e) =>
                      setTruck({
                        ...truck,
                        rearAxle: {
                          ...truck.rearAxle,
                          maximumLoad: Number(e.target.value),
                        },
                      })
                    }
                    placeholder="Maximum load [kg]"
                  />
                </Form.Group>
              </Row>
            </Form>
          </Card.Body>
        </Card>
        <br />
        <Card>
          <Card.Body>
            <Card.Title>Cargo</Card.Title>
            <Form>
              <Row>
                <Form.Group as={Col}>
                  <Form.Label>Description (optional)</Form.Label>
                  <Form.Control
                    value={item.description}
                    onChange={(e) =>
                      setItem({ ...item, description: e.target.value })
                    }
                    type="text"
                    placeholder="Description"
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Weight</Form.Label>
                  <Form.Control
                    value={item.weight}
                    onChange={(e) =>
                      setItem({ ...item, weight: Number(e.target.value) })
                    }
                    placeholder="Weight [kg]"
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Count:</Form.Label>
                  <Form.Control
                    value={item.count}
                    onChange={(e) =>
                      setItem({ ...item, count: Number(e.target.value) })
                    }
                  />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col}>
                  <Form.Label>Width</Form.Label>
                  <Form.Control
                    value={item.width}
                    onChange={(e) =>
                      setItem({ ...item, width: Number(e.target.value) })
                    }
                    placeholder="Width [cm]"
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Height</Form.Label>
                  <Form.Control
                    value={item.height}
                    onChange={(e) =>
                      setItem({ ...item, height: Number(e.target.value) })
                    }
                    placeholder="Height [cm]"
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Depth</Form.Label>
                  <Form.Control
                    value={item.depth}
                    onChange={(e) =>
                      setItem({ ...item, depth: Number(e.target.value) })
                    }
                    placeholder="Depth [cm]"
                  />
                </Form.Group>
              </Row>
              {item.type === 0 ? (
                <Button onClick={handleAdd}>Add</Button>
              ) : (
                <Button variant="success" onClick={handleSave}>
                  Save
                </Button>
              )}{' '}
              <Button
                onClick={() => {
                  setItem(defaultItem());
                }}
              >
                New
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <br />
        <ListGroup horizontal>
          {items.map((item, i) => {
            return (
              <ListGroup.Item key={i}>
                <ItemListItem item={item} />
                <br />
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => handleEdit(i)}
                >
                  Edit
                </Button>{' '}
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => handleDelete(i)}
                >
                  Delete
                </Button>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
        <br />
        <Button variant="success" onClick={handleSend}>
          Save changes
        </Button>{' '}
        {id !== 'new' ? (
          <Button onClick={handleSolve}>Solve</Button>
        ) : (
          <Button disabled>Solve</Button>
        )}
      </Container>
    </div>
  );
}
export default CargoEdit;
