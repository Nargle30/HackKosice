import firebase from 'firebase/app';
import 'firebase/firestore';
import * as db from '../constants/firebase';

const firestore = firebase
	.initializeApp({
		apiKey: db.API_KEY,
		authDomain: db.AUTH_DOMAIN,
		databaseURL: db.DATABASE_URL,
		projectId: db.PROJECT_ID,
		storageBucket: db.STORAGE_BUCKET,
		messagingSenderId: db.MESSAGING_SENDER_ID,
	})
	.firestore();

const _isObject = obj => (typeof obj === 'object' || obj instanceof Object) && !!obj;

const _insert = (collectionName, data) => {
	if (_isObject(data) && Object.keys(data).length > 0) {
		return firestore.collection(collectionName).add(data);
	}
};

export const selectPoints = () => {
	const points = firestore.collection('markers');
	const userPoints = [];
	return points
		.get()
		.then(snapshot => {
			snapshot.docs.forEach(doc => {
				if (doc.exists) {
					const point = doc.data();
					userPoints.push(point);
				} else {
					throw "Document isn't exists";
				}
			});
			return userPoints;
		})
		.catch(err => console.error(err));
};

export const insertPoint = data => _insert('markers', data);
