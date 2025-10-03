<script lang="ts">
	import Metadata from '$lib/components/metadata.svelte';
	import { onMount } from 'svelte';

	let map;
	const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1Ijoic29uZ2hhbnBvbyIsImEiOiJjbWdiMHdjZ3MwN29nMmxxNGp4Y25iNTBiIn0.xvs5O3qOH1Verhe1A8vqyQ';

	onMount(async () => {
	// Coordinates for Ho Chi Minh City
	const hcmcCoords = [106.6297, 10.8231];
		const mapboxgl = await import('mapbox-gl');
		mapboxgl.default.accessToken = MAPBOX_ACCESS_TOKEN;

		map = new mapboxgl.default.Map({
			container: 'map',
			style: 'mapbox://styles/mapbox/streets-v12',
			center: [106.6297, 10.8231], // Ho Chi Minh City coordinates
			zoom: 3.5
		});

		// Get today's date and 7 days ago in ISO format
		const today = new Date();
		const priorDate = new Date();
		priorDate.setDate(today.getDate() - 7);
		const sevenDaysAgo = priorDate.toISOString();

		const magDisplay = document.getElementById('mag');
		const locDisplay = document.getElementById('loc');
		const dateDisplay = document.getElementById('date');

		map.on('load', () => {
		// Add a custom marker for developer in Ho Chi Minh City
		const devMarker = document.createElement('div');
		devMarker.style.display = 'flex';
		devMarker.style.alignItems = 'center';
		devMarker.style.background = 'rgba(255,255,255,0.95)';
		devMarker.style.borderRadius = '8px';
		devMarker.style.boxShadow = '0 2px 8px rgba(0,0,0,0.12)';
		devMarker.style.padding = '6px 12px';
		devMarker.style.fontSize = '1rem';
		devMarker.style.fontWeight = '500';
		devMarker.style.gap = '8px';
		devMarker.innerHTML = `
			<span>Find Me Here</span>
		`;
		new mapboxgl.default.Marker(devMarker)
			.setLngLat(hcmcCoords)
			.addTo(map);
				// 		'id': 'earthquakes-viz',
				// 		'type': 'circle',
				// 		'source': 'earthquakes',
				// 		'paint': {
				// 				'circle-radius': [
				// 						'case',
				// 						['boolean', ['feature-state', 'hover'], false],
				// 						[
				// 								'interpolate',
				// 								['linear'],
				// 								['get', 'mag'],
				// 								1, 8,
				// 								1.5, 10,
				// 								2, 12,
				// 								2.5, 14,
				// 								3, 16,
				// 								3.5, 18,
				// 								4.5, 20,
				// 								6.5, 22,
				// 								8.5, 24,
				// 								10.5, 26
				// 						],
				// 						5
				// 				],
				// 				'circle-stroke-color': '#000',
				// 				'circle-stroke-width': 1,
				// 				'circle-color': [
				// 						'case',
				// 						['boolean', ['feature-state', 'hover'], false],
				// 						[
				// 								'interpolate',
				// 								['linear'],
				// 								['get', 'mag'],
				// 								1, '#fff7ec',
				// 								1.5, '#fee8c8',
				// 								2, '#fdd49e',
				// 								2.5, '#fdbb84',
				// 								3, '#fc8d59',
				// 								3.5, '#ef6548',
				// 								4.5, '#d7301f',
				// 								6.5, '#b30000',
				// 								8.5, '#7f0000',
				// 								10.5, '#000'
				// 						],
				// 						'#000'
				// 				]
				// 		}
				// });

			let quakeID = null;

			map.on('mousemove', 'earthquakes-viz', (event) => {
				map.getCanvas().style.cursor = 'pointer';
				if (event.features.length === 0) return;
				const quakeMagnitude = event.features[0].properties.mag;
				const quakeLocation = event.features[0].properties.place;
				const quakeDate = new Date(event.features[0].properties.time);

				magDisplay.textContent = quakeMagnitude;
				locDisplay.textContent = quakeLocation;
				dateDisplay.textContent = quakeDate;

				if (quakeID) {
					map.removeFeatureState({
						source: 'earthquakes',
						id: quakeID
					});
				}
				quakeID = event.features[0].id;
				map.setFeatureState({
					source: 'earthquakes',
					id: quakeID
				}, { hover: true });
			});

			map.on('mouseleave', 'earthquakes-viz', () => {
				if (quakeID) {
					map.setFeatureState({
						source: 'earthquakes',
						id: quakeID
					}, { hover: false });
				}
				quakeID = null;
				magDisplay.textContent = '';
				locDisplay.textContent = '';
				dateDisplay.textContent = '';
				map.getCanvas().style.cursor = '';
			});
		});
	});
</script>

<Metadata
	title="Articles | HieuNguyen"
	description="Discover the latest articles, delve into the world of technology, and explore the latest trends in the tech industry. Stay up-to-date with the latest news, and immerse yourself in the world of technology."
/>

<h1 class="sr-only">Wisnu Wicaksono's Articles</h1>

	<div style="position: relative; width: 100vw; height: 100vh;">
		<div id="map" style="width: 100vw; height: 100vh; position: absolute; top: 0; left: 0; z-index: 0;"></div>
		<!-- <div style="position: absolute; top: 24px; left: 24px; z-index: 1; background: rgba(255,255,255,0.9); border-radius: 8px; padding: 16px; min-width: 220px; box-shadow: 0 2px 8px rgba(0,0,0,0.12);">
			<h2 style="margin: 0 0 8px 0; font-size: 1.1rem;">Earthquake Info</h2>
			<div><strong>Magnitude:</strong> <span id="mag"></span></div>
			<div><strong>Location:</strong> <span id="loc"></span></div>
			<div><strong>Date:</strong> <span id="date"></span></div>
		</div> -->
	</div>

	<!-- Mapbox GL JS CSS -->
	<link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css" />
	