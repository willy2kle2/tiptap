import { Extension, Plugin } from 'tiptap'
import { Decoration, DecorationSet } from 'prosemirror-view'

export default class PlaceholderExtension extends Extension {

	get name() {
		return 'placeholder'
	}

	get defaultOptions() {
		return {
			emptyNodeClass: 'is-empty',
		}
	}

	get plugins() {
		return [
			new Plugin({
				props: {
					decorations: ({ doc }) => {
						const decorations = []
						const completelyEmpty = doc.textContent === '' && doc.childCount <= 1 && doc.content.size <= 2

						doc.descendants((node, pos) => {
							if (!completelyEmpty) {
								return
							}

							const decoration = Decoration.node(pos, pos + node.nodeSize, {
								class: this.options.emptyNodeClass,
							})
							decorations.push(decoration)
						})

						return DecorationSet.create(doc, decorations)
					},
				},
			}),
		]
	}

}
