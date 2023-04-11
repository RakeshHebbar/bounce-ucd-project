import React, { useEffect, useState } from "react";
import {
  Form,
  Button,
  ListGroup,
  Spinner,
  Alert,
  Navbar,
  Container,
  Card,
  Row,
  Col,
  DropdownButton,
  Dropdown,
  Badge,
} from "react-bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import logo from "./images/bounce-logo.svg";

function App() {

  // initialize functional state components using useState hook
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

  // server deployed on vercel
  let api_url = "https://bounce-ucd-project-server.vercel.app";

  // Number formatter for formatting population
  let formatter = Intl.NumberFormat("en", { notation: "compact" });

  // handle query change event
  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  // handle submit event
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // set loading state to true
    setIsLoading(true);
    setError("");
    setIsSubmit(true);
    try {
      // fetch the data from the backend api
      const response = await fetch(`${api_url}/api/${query}`);
      const json = await response.json();
      // set the response to results and update the loading state
      setResults(json);
      setIsLoading(false);
    } catch (error) {
      // catch error and update error state
      console.log(error);
      setError("An error occurred while fetching data.");
      setIsLoading(false);
    }
  };

  // set the results component to empty once the results are loaded
  // for next search it will be empty
  useEffect(() => {
    setResults([]);
    setQuery("");
    setIsSubmit(false);
    setError("")
  }, []);

  // render the content
  return (
    <div className="container my-5">
      <Navbar bg="light" variant="light" fixed="top">
        <Container>
          <Navbar.Brand>
            <img
              alt="bounce"
              src={logo}
              width="35"
              height="30"
              className="d-inline-block align-top"
            />{" "}
          </Navbar.Brand>
        </Container>
      </Navbar>
      <br />
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formSearch" className="mx-auto">
          <Form.Control
            type="text"
            className="text-center bg-light"
            placeholder="Enter country name"
            value={query}
            onChange={handleQueryChange}
          />
        </Form.Group>
        <br />
        <Button
          variant="outline-secondary"
          type="submit"
          className="d-block mx-auto"
        >
          Search
        </Button>
      </Form>
      {isLoading && (
        <div className="my-5 text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      )}
      {error && (
        <div className="my-5">
          <Alert variant="danger">Oops Something went wrong!!!</Alert>
        </div>
      )}
      {results.length > 0 ? (
        <div className="my-5" style={{ backgroundColor: "#f0f0f0" }}>
          <Card bg="light">
            <Card.Body className="d-flex justify-content-center">
              <Badge
                pill
                bg="light"
                text="dark"
                style={{ fontSize: "1.25rem" }}
              >
                Total Results: {results.length}
              </Badge>
            </Card.Body>
          </Card>
          <br />
          <Row className="g-4">
            {results.map((item: any) => (
              <Col sm={12} md={3}>
                <Card
                  bg="light"
                  key="light"
                  text="dark"
                  style={{ width: "18rem" }}
                >
                  <Card.Img
                    variant="top"
                    src={item.flags.png}
                    style={{ height: "160px", width: "286px" }}
                  />
                  <Card.Body>
                    <Card.Title>{item.name.common}</Card.Title>
                    <Card.Text></Card.Text>
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroup.Item>
                      <b>Area:</b> {item.area} km²
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <b>Population:</b> {formatter.format(item.population)}{" "}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <b>Region:</b> {item.region}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <b>Subregion:</b> {item.subregion}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <DropdownButton
                        title="Currency"
                        variant="light"
                        className="d-inline mx-2"
                      >
                        {item.currencies && Object.keys(item.currencies).map((currencyCode) => (
                          <Dropdown.Item key={currencyCode}>
                            {item.currencies[currencyCode].name} (
                            {item.currencies[currencyCode].symbol})
                          </Dropdown.Item>
                        ))}
                      </DropdownButton>
                      <DropdownButton
                        title="Capital(s)"
                        variant="light"
                        className="d-inline mx-2"
                      >
                        {item.capital &&
                          item.capital.map((capital: string) => (
                            <Dropdown.Item key={capital}>
                              {capital}
                            </Dropdown.Item>
                          ))}
                      </DropdownButton>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <DropdownButton
                        title="Language"
                        variant="light"
                        className="d-inline mx-2"
                      >
                        {item.languages &&
                          Object.keys(item.languages).map((langCode) => (
                            <Dropdown.Item key={langCode}>
                              {item.languages[langCode]}
                            </Dropdown.Item>
                          ))}
                      </DropdownButton>
                      <DropdownButton
                        title="Timezone"
                        variant="light"
                        className="d-inline mx-2"
                      >
                        {item.timezones &&
                          item.timezones.map((timezone: string) => (
                            <Dropdown.Item key={timezone}>
                              {timezone}
                            </Dropdown.Item>
                          ))}
                      </DropdownButton>
                    </ListGroup.Item>
                    <ListGroup.Item
                      variant={item.unMember ? "success" : "danger"}
                    >
                      <b>UN Member:</b> {item.unMember ? "Yes" : "No"}
                    </ListGroup.Item>
                    <ListGroup.Item
                      variant={item.unMember ? "success" : "danger"}
                    >
                      <b>Independent:</b> {item.independent ? "Yes" : "No"}
                    </ListGroup.Item>
                  </ListGroup>
                  <Card.Body>
                    <Card.Link
                      href={item.maps.googleMaps}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Google Map
                    </Card.Link>
                    <Card.Link
                      href={item.maps.googleMaps}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open Street Map
                    </Card.Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      ) : (
        (!isLoading && isSubmit) && (
          <div className="d-flex justify-content-center">
            <Alert variant="light" className="text-center">
              No results found!!
            </Alert>
          </div>
        )
      )}
    </div>
  );
}

export default App;
