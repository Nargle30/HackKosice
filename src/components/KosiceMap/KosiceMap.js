import React, { Component } from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { CENTER, ZOOM, MAX_ZOOM, THEME } from '../../constants/map';
import L from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster/dist/react-leaflet-markercluster';
import 'react-leaflet-markercluster/dist/styles.min.css';
import {selectPoints, insertPoint} from '../../helpers/firebase';
import {connect} from "react-redux";

const images = {
	sport: "https://firebasestorage.googleapis.com/v0/b/mykosice-bb2ed.appspot.com/o/sport.svg?alt=media&token=79b92d71-e8d4-4860-bc56-fd4ecbc3b263",
	nature: "https://firebasestorage.googleapis.com/v0/b/mykosice-bb2ed.appspot.com/o/nature.svg?alt=media&token=57d724c1-4769-4787-986d-54c1b8cbb252",
	entertainment: "https://firebasestorage.googleapis.com/v0/b/mykosice-bb2ed.appspot.com/o/entertainment.svg?alt=media&token=a862e908-bcc7-4f3c-a67b-04bc8557cba8",
	children: "https://firebasestorage.googleapis.com/v0/b/mykosice-bb2ed.appspot.com/o/children.svg?alt=media&token=b66a1525-b50d-45ce-8eb8-af1854edc39b",
	problem: "https://firebasestorage.googleapis.com/v0/b/mykosice-bb2ed.appspot.com/o/problem.svg?alt=media&token=38eec819-1f44-4a91-98cf-946abb64c871",
	announce: "https://firebasestorage.googleapis.com/v0/b/mykosice-bb2ed.appspot.com/o/announce.svg?alt=media&token=17f03c8e-3d8d-410e-bee1-c24818393644",
	idea: "https://firebasestorage.googleapis.com/v0/b/mykosice-bb2ed.appspot.com/o/idea.svg?alt=media&token=68f5a24e-d395-46bc-9eaa-850795bdcbc1"
};

class KosiceMap extends Component {

	componentDidMount() {
		selectPoints().then(res => this.setState({points: res}));
	}

	state = {
		points: []
	};

	addMarker = e => {
		const {topic} = this.props;
		if (Object.keys(topic).length < 3) return;
		const {points} = this.state;
		const category = topic.category.toLowerCase();
		const newPoint = {
			lng: e.latlng.lng,
			lat: e.latlng.lat,
			type: 'user',
			category: category,
			status: 'active',
			id_dialog: '',
			id_creator: '',
			id_marker: '',
			count_plus: '',
			count_minus: '',
			url: images[category],
		};
		insertPoint(newPoint);
		points.push(newPoint);
		this.setState({points});
	};

	getIcon = point => {
		const plus = point.count_plus ? `+${point.count_plus}` : `+0`;
		const minus = point.count_plus ? `-${point.count_minus}` : `-0`;

		return L.divIcon({
			html: `<span><img src=${point.url} ><p>${plus}/${minus}</p></span>`,
			className: 'styledMarker',
		});
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

const mapStateToProps = state => {
	const {topic} = state;
	return {topic};
};

export default connect(mapStateToProps)(KosiceMap );