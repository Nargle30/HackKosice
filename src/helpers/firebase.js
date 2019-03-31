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
					point.id = doc.id;
					userPoints.push(point);
				} else {
					throw "Document isn't exists";
				}
			});
			return userPoints;
		})
		.catch(err => console.error(err));
};

export const insertPoint = async data => {
	return await _insert('markers', data);
};

export const getUserInfo = id => {
	const users = firestore.collection('users');
	return users.doc(id)
		.get()
		.then(doc => {
			if (doc.exists) {
				const user = doc.data();
				return {name: user.name, url: user.url};
			}
			return null;
		})
		.catch(err => console.error(err));
};

export const insertDialog = data => _insert('dialogs', data);

export const selectUserIssues = id => {
	const users = firestore.collection('users');
	return users.doc(id)
	.get()
	.then(doc => {
		if (doc.exists) {
			const user = doc.data();
			return user.dialogs;
		}
		return null;
	})
	.catch(err => console.error(err));
};



export const selectMessages = dialogId => {
	const dialogs = firestore.collection('dialogs');
	return dialogs.doc(dialogId)
		.get()
		.then(doc => {
			if (doc.exists) {
				const dialog = doc.data();
				return {
					title: dialog.title,
					messages: dialog.messages,
					issue: dialog.issue,
					category: dialog.category,
				}
			}
			return null;
		})
		.catch(err => console.error(err));
};

export const selectDialogByMarker = markerID  => {
	const dialogs = firestore.collection('dialogs');
	return dialogs
		.get()
		.then(snapshot => {
			return snapshot.docs.filter(doc => {
				if (doc.exists) {
					const dialog = doc.data();
					if (dialog.marker_id) {
						return dialog.marker_id === markerID;
					}
				} else {
					throw "Document isn't exists";
				}
			});
		})
		.catch(err => console.error(err));
};
