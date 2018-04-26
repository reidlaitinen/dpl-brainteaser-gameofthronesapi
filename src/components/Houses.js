import React, { Fragment } from 'react';
import { Card, Header, Container, Image, Dimmer, Loader } from 'semantic-ui-react';
import axios from 'axios';
import crc from 'crc';

class Houses extends React.Component {
  state = { isLoaded: false, filtered: [], page: 1, isLoaded: false }
  

  componentDidMount() {
    let filtered = [];

    let questionImage;
    let questionCRC;

    axios.get('https://api.got.show/api/houses/misc/images/houses/House_Farwynd.png')
      .then( res => { 
        questionImage = res.data;
        questionCRC = crc.crc32(questionImage).toString(16)
      } )
      console.log(questionCRC)

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
        {this.state.isLoaded ? 
        <Card.Group itemsPerRow={6}>
          {filtered.map( house  => (
            <Card>
              <Image src={api_root + house.imageLink} />
              <Card.Header>{house.name}</Card.Header>
              <Card.Meta>{house.overlord ? `of ${house.overlord} fealty` : 'fealty unknown' }</Card.Meta>
            </Card>
          ))}
        </Card.Group>
        : <Loader active={true} />
        }
      </Fragment>
    )
  }

}

export default Houses;