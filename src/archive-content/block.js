/**
 * BLOCK: Archive Content
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

import axios from 'axios';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { PanelBody, SelectControl, TextControl } = wp.components;
const { RichText, InspectorControls } = wp.editor;
const { Component } = wp.element;

/**
 * Register: Archive Content Gutenberg Block.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully registered; otherwise `undefined`.
 */
registerBlockType( 'archive-content/archive-content', {
	title: __( 'Archive Content' ),
	icon: 'format-aside',
	category: 'common',
	keywords: [
		__( 'posts' ),
		__( 'archive' ),
		__( 'blog' ),
	],
	edit: class editArchiveContent extends Component {
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
							posts = posts + `<div class="archive-content__item">
								<div class="archive-content__image">
									<img src="https://via.placeholder.com/300x200" alt="${ res.data[ post ].title.rendered }" />
								</div>
								<div class="archive-content__content">
									<h3>${ res.data[ post ].title.rendered }</h3>
									${ res.data[ post ].excerpt.rendered }
									<span class="archive-content__button">View ${ res.data[ post ].title.rendered }</span>
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
									this.setState( { posts: '<p class="archive-content__select-post-type">Select a post type to display...</p>' } );
								}
							} }
						/>
						<SelectControl
							label="Display"
							value={ this.props.attributes.postDisplay ? this.props.attributes.postDisplay : 'wide' }
							options={ [
								{ value: 'wide', label: __( 'Wide' ) },
								{ value: 'column', label: __( 'Column' ) },
							] }
							onChange={ ( postDisplay ) => this.props.setAttributes( { postDisplay } ) }
						/>
						<TextControl
							label="Button Text Override"
							value={ this.props.attributes.buttonOverride }
							onChange={ ( buttonOverride ) => this.props.setAttributes( { buttonOverride } ) }
						/>
					</PanelBody>
				</InspectorControls>,
				<div className={ this.props.className } key="2">
					<RichText
						tagName="h2"
						className="archive-content__headline"
						keepPlaceholderOnFocus={ true }
						onChange={ ( headline ) => this.props.setAttributes( { headline } ) }
						placeholder={ __( 'Add a headline for the archive content' ) }
						value={ this.props.attributes.headline } />
					<RichText
						tagName="p"
						className="archive-content__subhead"
						keepPlaceholderOnFocus={ true }
						onChange={ ( subhead ) => this.props.setAttributes( { subhead } ) }
						placeholder={ __( 'Add a subhead for the archive content' ) }
						value={ this.props.attributes.subhead } />
					<div className="archive-content__posts" dangerouslySetInnerHTML={ { __html: this.state.posts } }></div>
				</div>,
			];
		}
	},
	save() {
		return null;
	},
} );
