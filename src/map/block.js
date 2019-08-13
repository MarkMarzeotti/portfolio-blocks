/**
 * BLOCK: portfolio - map
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

/**
 * Register: Map Gutenberg Block.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'portfolio-blocks/map', {
	title: __( 'Map' ),
	icon: 'location',
	category: 'common',
	attributes: {
		address: {
			type: 'string',
		},
	},
	keywords: [
		__( 'map' ),
		__( 'google map' ),
		__( 'portfolio' ),
	],
	edit: function( props ) {
		const PortfolioMapComponent = withScriptjs( withGoogleMap( () =>
			<GoogleMap
				defaultZoom={ 12 }
				defaultCenter={ { lat: 35.239418, lng: -80.8455486 } }
				defaultOptions={ {
					disableDefaultUI: true,
					scrollwheel: false,
					styles: [
						{
							elementType: 'geometry',
							stylers: [
								{
									color: '#f5f5f5',
								},
							],
						},
						{
							elementType: 'labels.icon',
							stylers: [
								{
									visibility: 'off',
								},
							],
						},
						{
							elementType: 'labels.text.fill',
							stylers: [
								{
									color: '#616161',
								},
							],
						},
						{
							elementType: 'labels.text.stroke',
							stylers: [
								{
									color: '#f5f5f5',
								},
							],
						},
						{
							featureType: 'administrative.land_parcel',
							elementType: 'labels.text.fill',
							stylers: [
								{
									color: '#bdbdbd',
								},
							],
						},
						{
							featureType: 'poi',
							elementType: 'geometry',
							stylers: [
								{
									color: '#eeeeee',
								},
							],
						},
						{
							featureType: 'poi',
							elementType: 'labels.text.fill',
							stylers: [
								{
									color: '#757575',
								},
							],
						},
						{
							featureType: 'poi.park',
							elementType: 'geometry',
							stylers: [
								{
									color: '#e5e5e5',
								},
							],
						},
						{
							featureType: 'poi.park',
							elementType: 'labels.text.fill',
							stylers: [
								{
									color: '#9e9e9e',
								},
							],
						},
						{
							featureType: 'road',
							elementType: 'geometry',
							stylers: [
								{
									color: '#ffffff',
								},
							],
						},
						{
							featureType: 'road.arterial',
							elementType: 'labels.text.fill',
							stylers: [
								{
									color: '#757575',
								},
							],
						},
						{
							featureType: 'road.highway',
							elementType: 'geometry',
							stylers: [
								{
									color: '#dadada',
								},
							],
						},
						{
							featureType: 'road.highway',
							elementType: 'labels.text.fill',
							stylers: [
								{
									color: '#616161',
								},
							],
						},
						{
							featureType: 'road.local',
							elementType: 'labels.text.fill',
							stylers: [
								{
									color: '#9e9e9e',
								},
							],
						},
						{
							featureType: 'transit.line',
							elementType: 'geometry',
							stylers: [
								{
									color: '#e5e5e5',
								},
							],
						},
						{
							featureType: 'transit.station',
							elementType: 'geometry',
							stylers: [
								{
									color: '#eeeeee',
								},
							],
						},
						{
							featureType: 'water',
							elementType: 'geometry',
							stylers: [
								{
									color: '#c9c9c9',
								},
							],
						},
						{
							featureType: 'water',
							elementType: 'labels.text.fill',
							stylers: [
								{
									color: '#9e9e9e',
								},
							],
						},
					],
				} }
			>
				<Marker position={ { lat: 35.239418, lng: -80.8455486 } } />
			</GoogleMap>
		) );

		return (
			<div className={ props.className }>
				<PortfolioMapComponent
					googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCb0NahCEnubhm0zEaBcJKF4nPgrSZ3IQM"
					loadingElement={ <div style={ { height: '100%' } } /> }
					containerElement={ <div style={ { height: '400px' } } /> }
					mapElement={ <div style={ { height: '100%' } } /> }
				/>
			</div>
		);
	},
	save() {
		return null;
	},
} );
