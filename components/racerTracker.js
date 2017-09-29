import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { MapView } from 'expo';

export default class RacerTracker extends React.Component {
    state = {
        position: {}
    }

    componentDidMount() {
        this.geoWatchId = navigator.geolocation.watchPosition(
          position => {
            console.log(position)
            this.setState({position});
          },
          error => {
            console.log(error);
          },
          {
            timeout: 1000,
            enableHighAccuracy: true,
            distanceFilter: 2 // metra
          }
        )
    }

    render() {
        return (<View>
          {
            this.state.position.coords ?
            (
              <View>
              <Text> Map </Text>
              <MapView
              style={ style }
              region={{
                latitude: this.state.position.coords && this.state.position.coords.latitude,
                longitude: this.state.position.coords && this.state.position.coords.longitude,
                latitudeDelta: 0.01, longitudeDelta: 0.01}}>

                <MapView.Marker
                  coordinate={this.state.position.coords}
                  image={require('../mtb.png')}
                  title="Marin"
                  description="Je tu negdi"
                />
                </MapView>
              </View>
            )
              :
              <Text> No map </Text>
          }
        </View>)
    }
}

const style = {
    position: 'absolute',
    top: 0,
    left: -150,
    right: 0,
    bottom: 0,
    width: 300,
    height: 300
};
