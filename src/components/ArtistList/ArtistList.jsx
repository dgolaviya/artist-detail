import React, { Component } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from '@material-ui/core/Typography';

import './styles.scss';

class ArtistList extends Component {
  findArtistRandomImage = (images = []) => {
    return images[0] ? images[0]["#text"] : "";
  };

  onclickArtist = (artist) => (event) => {
    event.preventDefault();
    this.props.showArtistDetail(artist);
  }

  render() {
    return (
      <List>
        {this.props.artists.map((artist) => (
          <ListItem onClick={this.onclickArtist(artist)} className="artist-info" key={artist.name} alignItems="flex-start">
            <ListItemAvatar>
              <Avatar
                alt={artist.name}
                src={this.findArtistRandomImage(artist.image)}
              />
            </ListItemAvatar>
            <ListItemText
              primary={artist.name}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    color="textPrimary"
                  >
                    Listeners: &nbsp; 
                  </Typography>
                  {artist.listeners}
                </React.Fragment>
              }
            />
          </ListItem>
        ))}
      </List>
    );
  }
}

export default ArtistList;
