import 'mapbox-gl/dist/mapbox-gl.css';
import React from 'react';
import mapboxgl from 'mapbox-gl';

class Map extends React.Component {
    componentDidMount() {
        mapboxgl.accessToken = 'pk.eyJ1IjoiZ2FuZ3llYWgiLCJhIjoiY2t1c2MzbmJpMGRnMDJubWZ0NzhuM2t2YSJ9.HO4P6pztHjVahUFt2pnNWg';
        this.map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/dark-v10',
            center: [30.2, 59.95],
            zoom: 10
        });
    }

    componentWillUnmount() {
        this.map.remove();
    }

    render() {
        const style = {
            position: 'absolute',
            top: 0,
            bottom: 0,
            width: '100%'
          };
        return <div style={style} ref={el => this.mapContainer = el} />;
    }
}

export default Map;