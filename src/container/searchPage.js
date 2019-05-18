import React, { Component } from "react";
import axios from "axios";
import keys from "../config/keys";
import "./searchPage.css";

export default class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropDownVisible: false,
      searchText: "",
      recommendedData: null
    };
  }
  searchRecommendations = e => {
    let currSearchText = e.target.value;
    this.setState({ searchText: currSearchText });
    if (currSearchText.length % 3 === 0) {
      axios
        .get(keys.api.base_url + "/getRecommendations/" + currSearchText)
        .then(resp => {
          if (resp.status === 200) {
            let recommendations = resp.data;
            this.setState({
              dropDownVisible: true,
              recommendedData: recommendations
            });
          }
        })
        .catch(err => {
          console.log("Error " + err);
        });
    } else if (currSearchText.length < 3) {
      this.setState({
        dropDownVisible: false,
        recommendedData: null
      });
    }
  };
  render() {
    return (
      <div className="mainDiv">
        <h2>Movie Recommender</h2>
        <input
          type="text"
          value={this.state.searchText}
          placeholder="Enter text"
          onChange={e => this.searchRecommendations(e)}
        />
        {this.state.dropDownVisible ? (
          <div>
            {this.state.recommendedData.length > 0
              ? this.state.recommendedData
                  // We can use filter if we wan't exact match to the document
                  // .filter(data => {
                  //   return data
                  //     .toLowerCase()
                  //     .includes(this.state.searchText.toLowerCase());
                  // })
                  .map((data, index) => {
                    return index < 10 ? (
                      <div key={index} className="dropDownDiv">
                        {" "}
                        {data}
                      </div>
                    ) : (
                      ""
                    );
                  })
              : "No Recommendations Found"}
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}
