import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

class Lyrics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      lyrics: '',
    };
    // this.SongData = this.SongData.bind(this);
    this.Search = this.Search.bind(this);
  }

  Search() {
    const { query } = this.state;
    const { queryData } = this.props;
    axios
      .get('/api/lyrics', {
        params: {
          query: `${queryData.title} ${queryData.artist}`,
        },
      })
      .then(response => {
        // eslint-disable-next-line no-alert
        this.setState({
          lyrics: response.data,
        });
      })
      .catch(error => {
        // eslint-disable-next-line no-alert
        alert('No Lyrics Found');
        console.log(error);
      });
  }

  render() {
    const { lyrics } = this.state;
    return (
      <div>
        <Button onClick={this.Search}>Refresh lyrics</Button>
        <div>
          {lyrics}
        </div>
      </div>
    );
  }
}


export default Lyrics;
