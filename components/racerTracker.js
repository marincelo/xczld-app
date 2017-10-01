import React from 'react';
import { View, Text } from 'react-native';
import { MapView } from 'expo';

export default class RacerTracker extends React.Component {
    state = {
        position: {}
    }

    componentDidMount() {
        this.geoWatchId = navigator.geolocation.watchPosition(
          position => {
            this.setState({position});
          },
          error => {
            console.log(error);
          },
          {
            timeout: 1000, // milliseconds
            enableHighAccuracy: true,
            distanceFilter: 2 // meters
          }
        );
    }

    render() {
        const { coords } = this.state.position;
        return (<View>
          {
            coords ?
            (
              <View>
              <Text> Map </Text>
              <MapView
              style={ style }
              region={{
                latitude: coords && coords.latitude,
                longitude: coords && coords.longitude,
                latitudeDelta: 0.01, longitudeDelta: 0.01}}>

                <MapView.Marker
                  coordinate={coords}
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
        </View>);
    }
}

const style = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: 300,
    height: 300
};
