/**
 * BLOCK: Child List
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

import axios from 'axios';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { PanelBody, SelectControl } = wp.components;
const { InspectorControls } = wp.editor;
const { Component } = wp.element;

/**
 * Register: Child List Gutenberg Block.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully registered; otherwise `undefined`.
 */
registerBlockType( 'portfolio-blocks/child-list', {
	title: __( 'Child List' ),
	icon: 'image-filter',
	category: 'common',
	keywords: [
		__( 'children' ),
		__( 'archive' ),
		__( 'pages' ),
	],
	edit: class editChildList extends Component {
		constructor( props ) {
			super( ...props );
			this.state = {
				posts: '',
				postTypes: [ { value: 0, label: __( 'Select a Post Type' ) } ],
				postTypeBases: null,
				postsRetrieved: false,
			};
		}

		componentDidMount() {
			axios.get( '/wp-json/wp/v2/types' )
				.then( res => {
					const postTypes = this.state.postTypes;
					const postTypeBases = {};
					Object.keys( res.data ).map( ( postType ) => {
						if ( res.data[ postType ].slug !== 'attachment' && res.data[ postType ].slug !== 'wp_block' ) {
							postTypes.push( { value: res.data[ postType ].slug, label: res.data[ postType ].name } );
							postTypeBases[ res.data[ postType ].slug ] = res.data[ postType ].rest_base;
						}
					} );
					this.setState( { postTypes, postTypeBases } );
				} );
		}

		render() {
			if ( this.state.postsRetrieved === false && this.state.postTypeBases !== null ) {
				let posts = '';
				axios.get( `/wp-json/wp/v2/${ this.state.postTypeBases[ this.props.attributes.postType ] }` )
					.then( res => {
						Object.keys( res.data ).map( ( post ) => {
							posts = posts + `<div class="child-list__item">
								<div class="child-list__image">
									<img src="https://via.placeholder.com/300x200" alt="${ res.data[ post ].title.rendered }" />
								</div>
								<div class="child-list__content">
									<h3>${ res.data[ post ].title.rendered }</h3>
									${ res.data[ post ].excerpt.rendered }
									<span class="child-list__button">View ${ res.data[ post ].title.rendered }</span>
								</div>
							</div>`;
						} );
						this.setState( { posts, postsRetrieved: true } );
					} );
			}

			return [
				<InspectorControls key="1">
					<PanelBody title={ __( 'Settings' ) }>
						<SelectControl
							label="Post Type"
							value={ this.props.attributes.postType }
							options={ this.state.postTypes }
							onChange={ ( postType ) => {
								this.props.setAttributes( { postType } );
								if ( parseInt( postType ) !== 0 ) {
									this.setState( { postsRetrieved: false } );
								} else {
									this.setState( { posts: '<p class="child-list__select-post-type">Select a post type to display...</p>' } );
								}
							} }
						/>
					</PanelBody>
				</InspectorControls>,
				<div className={ this.props.className } key="2">
					<div className="child-list__posts" dangerouslySetInnerHTML={ { __html: this.state.posts } }></div>
				</div>,
			];
		}
	},
	save() {
		return null;
	},
} );
