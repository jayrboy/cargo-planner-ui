import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Item, Truck, Instance } from '../../models/Input';
import ItemListItem from './ItemListItem';
import { Container, ListGroup, Card } from 'react-bootstrap';
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

  // function defaultInstance(): Instance {
  //   return {
  //     userId,
  //     items: [],
  //     truck: defaultTruck(),
  //   };
  // }

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
            <form>
              <div className="row">
                <div className="col">
                  <label>Width</label>
                  <input
                    type="text"
                    className="form-control"
                    value={truck.width}
                    onChange={(e) =>
                      setTruck({ ...truck, width: Number(e.target.value) })
                    }
                    placeholder="Width [cm]"
                  />
                </div>
                <div className="col">
                  <label>Height</label>
                  <input
                    type="text"
                    className="form-control"
                    value={truck.height}
                    onChange={(e) =>
                      setTruck({ ...truck, height: Number(e.target.value) })
                    }
                    placeholder="Height [cm]"
                  />
                </div>
                <div className="col">
                  <label>Depth</label>
                  <input
                    type="text"
                    className="form-control"
                    value={truck.depth}
                    onChange={(e) =>
                      setTruck({ ...truck, depth: Number(e.target.value) })
                    }
                    placeholder="Depth [cm]"
                  />
                </div>
              </div>
            </form>
          </Card.Body>
          <Card.Body>
            <Card.Subtitle>Front axle</Card.Subtitle>
            <form>
              <div className="row">
                <div className="col">
                  <label>Offset</label>
                  <input
                    type="number"
                    className="form-control"
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
                </div>
                <div className="col">
                  <label>Initial load</label>
                  <input
                    type="number"
                    className="form-control"
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
                </div>
                <div className="col">
                  <label>Maximum load</label>
                  <input
                    type="number"
                    className="form-control"
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
                </div>
              </div>
            </form>

            <Card.Subtitle>Rear axle</Card.Subtitle>
            <form>
              <div className="row">
                <div className="col">
                  <label>Offset</label>
                  <input
                    type="number"
                    className="form-control"
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
                </div>
                <div className="col">
                  <label>Initial load</label>
                  <input
                    type="number"
                    className="form-control"
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
                </div>
                <div className="col">
                  <label>Maximum load</label>
                  <input
                    type="number"
                    className="form-control"
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
                </div>
              </div>
            </form>
          </Card.Body>
        </Card>
        <br />
        <Card>
          <Card.Body>
            <Card.Title>Cargo</Card.Title>
            <form>
              <div className="row">
                <div className="col">
                  <label>Description (optional)</label>
                  <input
                    type="text"
                    className="form-control"
                    value={item.description}
                    onChange={(e) =>
                      setItem({ ...item, description: e.target.value })
                    }
                    placeholder="Description"
                  />
                </div>
                <div className="col">
                  <label>Weight</label>
                  <input
                    type="number"
                    className="form-control"
                    value={item.weight}
                    onChange={(e) =>
                      setItem({ ...item, weight: Number(e.target.value) })
                    }
                    placeholder="Weight [kg]"
                  />
                </div>
                <div className="col">
                  <label>Count:</label>
                  <input
                    type="number"
                    className="form-control"
                    value={item.count}
                    onChange={(e) =>
                      setItem({ ...item, count: Number(e.target.value) })
                    }
                  />
                </div>
              </div>

              <div className="row mt-3">
                <div className="col">
                  <label>Width</label>
                  <input
                    type="number"
                    className="form-control"
                    value={item.width}
                    onChange={(e) =>
                      setItem({ ...item, width: Number(e.target.value) })
                    }
                    placeholder="Width [cm]"
                  />
                </div>
                <div className="col">
                  <label>Height</label>
                  <input
                    type="number"
                    className="form-control"
                    value={item.height}
                    onChange={(e) =>
                      setItem({ ...item, height: Number(e.target.value) })
                    }
                    placeholder="Height [cm]"
                  />
                </div>
                <div className="col">
                  <label>Depth</label>
                  <input
                    type="number"
                    className="form-control"
                    value={item.depth}
                    onChange={(e) =>
                      setItem({ ...item, depth: Number(e.target.value) })
                    }
                    placeholder="Depth [cm]"
                  />
                </div>
              </div>

              <div className="mt-3">
                {item.type === 0 ? (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleAdd}
                  >
                    Add
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                )}
                <button
                  type="button"
                  className="btn btn-secondary ms-2"
                  onClick={() => setItem(defaultItem())}
                >
                  New
                </button>
              </div>
            </form>
          </Card.Body>
        </Card>
        <br />
        <ListGroup horizontal>
          {items.map((item, i) => {
            return (
              <ListGroup.Item key={i}>
                <ItemListItem item={item} />
                <br />
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => handleEdit(i)}
                >
                  Edit
                </button>{' '}
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(i)}
                >
                  Delete
                </button>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
        <br />
        <button className="btn btn-success" onClick={handleSend}>
          Save changes
        </button>{' '}
        {id !== 'new' ? (
          <button onClick={handleSolve}>Solve</button>
        ) : (
          <button disabled>Solve</button>
        )}
      </Container>
    </div>
  );
}
export default CargoEdit;
