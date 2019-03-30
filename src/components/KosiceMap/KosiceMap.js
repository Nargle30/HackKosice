import React, { Component } from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { CENTER, ZOOM, MAX_ZOOM, THEME } from '../../constants/map';
import MarkerClusterGroup from 'react-leaflet-markercluster/dist/react-leaflet-markercluster';
import 'react-leaflet-markercluster/dist/styles.min.css';

export class KosiceMap extends Component {
	state = {
		points: [{
			lat: 48.71647860742975,
			lng: 21.26390933990479,
			type: 'company', //user
			category: 'sport', //
			status: 'active',
			id_dialog: '',
			id_creator: '',
			id_marker: '',
		}]
	};

	addMarker = e => {
		const {points} = this.state;
		points.push(e.latlng);
		this.setState({points});
	};

	render() {
		const {points} = this.state;
		return (
			<Map
				center={CENTER}
				zoom={ZOOM}
				maxZoom={MAX_ZOOM}
				zoomControl={false}
				attributionControl={false}
				onClick={this.addMarker}
			>
				<TileLayer url={THEME} />
				<MarkerClusterGroup>
					{points.map((value, ind) => (
						<Marker
							key={ind}
							position={value}
						/>
					))}
				</MarkerClusterGroup>
			</Map>
		);
	}
}
