import React, { Fragment } from 'react';
import { Card, Header, Container, Image, Dimmer, Loader } from 'semantic-ui-react';
import axios from 'axios';

class Houses extends React.Component {
  state = { filtered: [], page: 1, isLoaded: false }
  

  componentDidMount() {
    let filtered = [];
    axios.get('https://api.got.show/api/houses/')
      .then( res => { res.data.map( house => {
        (house.imageLink) ? filtered.push(house) : null;
        this.setState({filtered, isLoaded: true })
      }
    )})
    

  }

  render() {
    const { filtered } = this.state;
    const api_root = 'https://api.got.show'

    console.log("Filtered:")
    console.log(filtered)

    return (
      <Fragment>
        <Header as='h1'>Game of Thrones Houses that Matter</Header>
        <Card.Group itemsPerRow={6}>
          {filtered.map( house  => (
            <Card>
              <Image src={api_root + house.imageLink} />
              <Card.Header>{house.name}</Card.Header>
              <Card.Meta>{house.overlord ? `of ${house.overlord} fealty` : 'fealty unknown' }</Card.Meta>
            </Card>
          ))}
        </Card.Group>
      </Fragment>
    )
  }

}

export default Houses;