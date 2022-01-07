import React, { Component } from "react";
import { Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../utils/constants";

export default class Sukses extends Component {
//   componentDidMount() {
//     axios
//       .get(API_URL + "keranjangs")
//       .then((res) => {
//         const keranjangs = res.data;
//         keranjangs.map(function(item){
//             return axios
//             .delete(API_URL+"keranjangs/"+item.id)
//             .then((res) => console.log(res))
//             .catch((err) => console.log(err))
//         })
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }
  componentDidMount() {
    axios
      .get(API_URL + "keranjangs")
      .then((res) => {
        const keranjangs = res.data;
        keranjangs.map(function(item) {
            return axios
                .delete(API_URL+"keranjangs/"+item.id)
                .then((res) => console.log(res))
                .catch((error) => console.log(error))
        })
      })
      .catch((error) => {
        console.log("Error yaa ", error);
      });

    }

  render() {
    console.log("props Sukses");
    console.log(this.props);
    
    return (
      <div className="mt-4 text-center">
        <Image src="assets/images/success.png" width="500"></Image>
        <h2>Sukses Pesan</h2>
        <p>Terimakasih Sudah Memesan!</p>
        <Button variant="primary" as={Link} to="/">
          Kembali
        </Button>
      </div>
    );
  }
}
