import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";
import "../App.css";
import { Hasil, ListCategories, Menus } from "../components";
import { API_URL } from "../utils/constants";
import axios from "axios";
import swal from "sweetalert";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      pilihCategori: "Makanan",
      keranjangs: [],
    };
  }

  componentDidMount() {
    axios
      .get(API_URL + "products?category.nama=" + this.state.pilihCategori)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log(error);
      });

    this.getListKeranjang();
  }

  getListKeranjang = () => {
    axios
      .get(API_URL + "keranjangs")
      .then((res) => {
        const keranjangs = res.data;
        this.setState({ keranjangs });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  changeCategori = (value) => {
    this.setState({
      pilihCategori: value,
      menus: [],
    });

    axios
      .get(API_URL + "products?category.nama=" + value)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  masukKeranjang = (value) => {
    axios
      .get(API_URL + "keranjangs?product.id=" + value.id)
      .then((res) => {
        if (res.data.length === 0) {
          const keranjang = {
            jumlah: 1,
            total_harga: value.harga,
            product: value,
          };

          axios
            .post(API_URL + "keranjangs", keranjang)
            .then((res) => {
              this.getListKeranjang();
              swal({
                title: "Sukses Masuk Keranjang",
                text: keranjang.product.nama + " Berhasil Ditambahkan",
                icon: "success",
                button: false,
                timer: 1500,
              });
            })
            .catch((error) => {
              console.log(error);
            });
        } 

        else {
          const keranjang = {
            jumlah: res.data[0].jumlah + 1,
            total_harga: res.data[0].total_harga + value.harga,
            product: value,
          };

          axios
            .put(API_URL + "keranjangs/" + res.data[0].id, keranjang)
            .then((res) => {
              this.getListKeranjang();
              swal({
                title: "Sukses Masuk Keranjang",
                text: keranjang.product.nama + " Berhasil Ditambahkan",
                icon: "success",
                button: false,
                timer: 1500,
              });
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { menus, pilihCategori, keranjangs } = this.state;
    // console.log(keranjangs);
    console.log("props Home");
    console.log(this.props);
    return (
      <div className="mt-3">
        <Container fluid>
          <Row>
            <ListCategories
              changeCategori={this.changeCategori}
              pilihCategori={pilihCategori}
            />
            <Col>
              <h4 className="mt-3">
                <strong>Daftar Produk</strong>
              </h4>
              <hr />
              <Row className="overflow-auto menu">
                {menus &&
                  menus.map((menu) => (
                    // <h2>{menu.nama}</h2>
                    <Menus
                      key={menu.id}
                      menu={menu}
                      masukKeranjang={this.masukKeranjang}
                    />
                  ))}
              </Row>
            </Col>
            <Hasil keranjangs={keranjangs} {...this.props} getListKeranjang={this.getListKeranjang} />
          </Row>
        </Container>
      </div>
    );
  }
}
