/* eslint-disable no-use-before-define */
import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import debounce from "lodash.debounce";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "../../axios";
import ArtistList from "../ArtistList";
import ArtistDetail from "../ArtistDetail";

import "./styles.scss";

class ArtistApp extends Component {
  state = {
    searchTerm: "",
    artists: [],
    showArtistDetail: false,
    selectedArtist: {},
    isLoading: false,
  };

  showArtistDetail = (artist) => {
    this.setState({ showArtistDetail: true, selectedArtist: artist });
  };

  backToSearchResults = (artist) => {
    this.setState({ showArtistDetail: false, selectedArtist: {} });
  };

  handleChangeDebounce = debounce((e) => {
    if (e.target.value && e.target.value.length > 2) {
      const url = `/?method=artist.search&artist=${e.target.value}&api_key=33cd79b3d22e0b2af54e0e783c85e19a&format=json`;
      this.setState({ isLoading: true, artists: [] });
      axios
        .get(url)
        .then((res) => {
          console.log(res.data.results.artistmatches.artist);
          this.setState({
            artists: res.data.results.artistmatches.artist,
            isLoading: false,
          });
        })
        .catch((err) => {
          this.setState({ isLoading: false });
          console.log(err);
        });
    }
  }, 1000);

  searchArtist = (event) => {
    this.setState({ searchTerm: event.target.value });
    this.handleChangeDebounce(event);
  };
  render() {
    return (
      <Box className="artist-app">
        <Box component="h1">Artist App</Box>
        {!this.state.showArtistDetail && (
          <TextField
            label="Search by Artist Name"
            size="medium"
            id="outlined-basic"
            variant="outlined"
            onChange={this.searchArtist}
            value={this.state.searchTerm}
          />
        )}
        {this.state.artists.length > 0 && !this.state.showArtistDetail && (
          <ArtistList
            showArtistDetail={this.showArtistDetail}
            artists={this.state.artists}
          />
        )}
        {this.state.showArtistDetail && (
          <ArtistDetail
            backToSearchResults={this.backToSearchResults}
            artistInfo={this.state.selectedArtist}
          />
        )}
        {this.state.isLoading && (
          <CircularProgress margin="small" disableShrink />
        )}
      </Box>
    );
  }
}

export default ArtistApp;
