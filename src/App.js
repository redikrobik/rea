import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import { Navbar, NavItem, Nav, Button, Container, Row, Col } from "react-bootstrap";

const PLACES = [
  { name: "Костя", zip: "Moscow" },
  { name: "Данат", zip: "Ufa" },
  { name: "Роберт", zip: "Kazan" },
  { name: "Ирина", zip: "Salavat" }
];

class App extends Component {
constructor() {
  super();
  this.state = {
    activePlace: 0,
  };
}	
	
  render() {
	  const activePlace = this.state.activePlace;
    return (
<div>
  <Navbar>
      <Navbar.Brand>
        Отпуск программиста
      </Navbar.Brand>
  </Navbar>
  <Container>
    <Row>
      <Col md={4} sm={4}>
        <h3>Узнай про его отпуск</h3>
        <Nav
          bsStyle="pills"
          stacked
          activeKey={activePlace}
          onSelect={index => {
            this.setState({ activePlace: index });
          }}
        >
          {PLACES.map((place, index) => (
	<Row className="w-100 mb-3">
		  <Button
			variant="danger"
			className="w-100"
			key={index}
            onClick={() => {
              this.setState({ activePlace: index });
            }}
		  >
			  {place.name}
		  </Button>
	</Row>
          ))}
        </Nav>
      </Col>
      <Col md={8} sm={8}>
        <WeatherDisplay key={activePlace} zip={PLACES[activePlace].zip} />
      </Col>
    </Row>
  </Container>
</div>
	  )
  }
}

class WeatherDisplay extends Component {
  constructor() {
    super();
    this.state = {
      weatherData: null
    };
  }
  componentDidMount() {
    const zip = this.props.zip;
    const URL = "http://api.openweathermap.org/data/2.5/weather?q=" +
      zip +
      "&appid=b1b35bba8b434a28a0be2a3e1071ae5b&units=imperial";
    fetch(URL).then(res => res.json()).then(json => {
      this.setState({ weatherData: json });
    });
  }
  
  render() {
    const weatherData = this.state.weatherData;
    if (!weatherData) return <div>Loading</div>;
	
	const weather = weatherData.weather[0];
	const iconUrl = "http://openweathermap.org/img/w/" + weather.icon + ".png";
	
	
return (
  <div>
    <h1>
      {weather.main} in {weatherData.name}
      <img src={iconUrl} alt={weatherData.description} />
    </h1>
    <p>Current: {weatherData.main.temp}°</p>
    <p>High: {weatherData.main.temp_max}°</p>
    <p>Low: {weatherData.main.temp_min}°</p>
    <p>Wind Speed: {weatherData.wind.speed} mi/hr</p>
  </div>
);
	
  }
  
}


export default App;
