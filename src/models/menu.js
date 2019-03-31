export const menu = {
	state: {},
	reducers: {
		setStatus: (state, isOpen) => ({ ...state, isOpen: isOpen}),
		setDialogId: (state, dialogId) => ({ ...state, dialogId: dialogId}),
		setMarkerID: (state, markerID) => ({ ...state, markerID: markerID}),
	},
};
