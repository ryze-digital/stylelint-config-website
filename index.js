export default {
    extends: 'stylelint-config-standard-scss',
    rules: {
        'declaration-no-important': true,
        'selector-no-qualifying-type': [true, {
            ignore: ['class', 'attribute']
        }],
        'selector-class-pattern': '^([a-z][a-z0-9]*)(-[a-z0-9]+)*$',
        'color-hex-length': 'long',
        'rule-empty-line-before': ['always', {
            except: ['inside-block'],
            ignore: ['after-comment']
        }],
        'at-rule-empty-line-before': ['always', {
            ignore: ['blockless-after-blockless', 'after-comment', 'inside-block']
        }],
        'declaration-empty-line-before': 'never',
        'max-nesting-depth': [5, {
            ignoreAtRules: ['include', 'media', 'if', 'else', 'each', 'container'],
            ignorePseudoClasses: [
                'hover',
                'active',
                'focus',
                'focus-visible',
                'focus-within',
                'visited',
                'target',
                'after',
                'backdrop',
                'before',
                'cue',
                'cue-region',
                'first-letter',
                'first-line',
                'file-selector-button',
                'grammar-error',
                'marker',
                'part',
                'placeholder',
                'selection',
                'slotted',
                'spelling-error',
                'target-text'
            ]
        }],
        'custom-property-empty-line-before': ['never', {
            ignore: ['after-comment']
        }],
        'no-descending-specificity': null,
        'scss/at-mixin-argumentless-call-parentheses': 'always',
        'value-keyword-case':  ['lower', {
            camelCaseSvgKeywords: true
        }]
    }
};