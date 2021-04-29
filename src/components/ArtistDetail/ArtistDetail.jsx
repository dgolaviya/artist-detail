import React, { Component } from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import Chip from "@material-ui/core/Chip";
import axios from "../../axios";

class ArtistDetail extends Component {
  state = {
    artistDetail: {},
  };
  componentDidMount() {
    const url = `/?method=artist.getInfo&artist=${this.props.artistInfo.name}&api_key=33cd79b3d22e0b2af54e0e783c85e19a&format=json`;
    axios
      .get(url)
      .then((res) => {
        console.log(res.data);
        this.setState({
          artistDetail: res.data.artist,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const {
      name,
      image = [],
      stats = {},
      similar: { artist = [] } = {},
      tags: { tag = [] } = {},
    } = this.state.artistDetail;
    return (
      <Box>
        <Box flexDirection="column" display="flex" alignItems="center" m={2}>
          <Box component="h4">Name</Box>
          <Box>{name}</Box>
        </Box>
        <Box flexDirection="column" display="flex" alignItems="center" m={2}>
          <Box component="h4">Artist Images</Box>
          <AvatarGroup max={5}>
            {image.map((img) => (
              <Avatar
                size="medium"
                key={img.size}
                alt={name}
                src={img["#text"]}
              />
            ))}
          </AvatarGroup>
        </Box>
        <Box flexDirection="column" display="flex" alignItems="center" m={2}>
          <Box component="h4">Artist Stats</Box>
          <Box>
            Listeners:<b>{stats.listeners}</b>{" "}
          </Box>
          <Box>
            Playcount: <b>{stats.playcount}</b>
          </Box>
        </Box>
        <Box flexDirection="column" display="flex" alignItems="center" m={2}>
          <Box component="h4">Similar Artist</Box>
          {tag.map((tagDetail) => (
            <Box key={tagDetail.name} m={1}>
              <Chip label={tagDetail.name} />
            </Box>
          ))}
        </Box>
        <Box flexDirection="column" display="flex" alignItems="center" m={2}>
          <Box component="h4">Tags</Box>
          {artist.map((sart) => (
            <Box key={sart.name} m={1}>
              <Chip variant="outlined" label={sart.name} />
            </Box>
          ))}
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={this.props.backToSearchResults}
        >
          Go back to search result
        </Button>
      </Box>
    );
  }
}

export default ArtistDetail;
