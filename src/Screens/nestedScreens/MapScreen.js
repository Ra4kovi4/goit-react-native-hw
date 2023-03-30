import React from "react";
import MapView, { Marker } from "react-native-maps";

import { Text, View, StyleSheet } from "react-native";

export default function MapScreen({ route, navigate }) {
	const {
		location: { coords },
	} = route.params;

	return (
		<View style={styles.container}>
			<MapView
				style={styles.map}
				initialRegion={{
					latitude: coords.latitude,
					longitude: coords.longitude,
					latitudeDelta: 0.1,
					longitudeDelta: 0.1,
				}}>
				<Marker
					coordinate={{
						latitude: coords.latitude,
						longitude: coords.longitude,
					}}
				/>
			</MapView>
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
	},

	map: {
		flex: 1,
	},
});
