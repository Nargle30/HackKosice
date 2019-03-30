import React, { Component } from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { CENTER, ZOOM, MAX_ZOOM, THEME } from '../../constants/map';
import L from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster/dist/react-leaflet-markercluster';
import 'react-leaflet-markercluster/dist/styles.min.css';
import styled from 'styled-components';

const MarketItem = styled.span`
	position: relative;
	top: -50px;
	left: -20px;

	&:after {
		content: '';
		position: absolute;
		box-sizing: border-box;
		display: block;
		left: calc(50% - 10px);
		top: 10px;
		border-style: solid;
		border-color: #000 transparent transparent transparent;
		border-width: 10px;
	}
`;


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
			count_plus: 10,
			count_minus: 2,
		}]
	};

	addMarker = e => {
		const {points} = this.state;
		points.push(e.latlng);
		this.setState({points});
	};

	getIcon = point => {
		console.log(point)

		return L.divIcon({
			html: `<span><img /><p>+10/-3</p></span>`,
			className: 'styledMarker',
		});
	};

	render() {

		const {points} = this.state;
		console.log(points)
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
					{points.map((point, ind) => (
						<Marker
							key={ind}
							icon={this.getIcon(point)}
							position={point}
						/>
					))}
				</MarkerClusterGroup>
			</Map>
		);
	}
}
