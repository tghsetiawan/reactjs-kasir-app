import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";
import "./App.css";
import { Hasil, ListCategories, Menus, NavbarComponent } from "./components";
import { API_URL } from "./utils/constants";
import axios from "axios";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      pilihCategori: "Makanan"
    };
  }

  componentDidMount() {
    axios
      .get(API_URL + "products?category.nama="+this.state.pilihCategori)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  changeCategori = (value) => {
    this.setState({
      pilihCategori: value,
      menus: []
    })

    axios
      .get(API_URL + "products?category.nama="+value)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { menus, pilihCategori } = this.state;
    return (
      <div className="App">
        <NavbarComponent />
        <div className="mt-3">
          <Container fluid>
            <Row>
              <ListCategories changeCategori={this.changeCategori} pilihCategori={pilihCategori} />
              <Col>
                <h4>
                  <strong>Daftar Produk</strong>
                </h4>
                <hr />
                <Row>
                  {menus && menus.map((menu) => (
                  // <h2>{menu.nama}</h2>
                  <Menus key={menu.id} menu={menu} />
                  ))}
                </Row>
              </Col>
              <Hasil />
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}
