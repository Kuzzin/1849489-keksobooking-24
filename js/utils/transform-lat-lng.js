const COORD_ROUNDING = 5;

const transformLatLng = (lat, lng) => `${lat.toFixed(COORD_ROUNDING)}, ${lng.toFixed(COORD_ROUNDING)}`;

export {transformLatLng};
