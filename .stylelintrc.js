module.exports = {
  extends: ['@sxwy/stylelint-config'],
  rules: {
    'no-empty-source': null,
    'font-family-no-missing-generic-family-keyword': null,
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep']
      }
    ],
    'function-no-unknown': [
      true,
      {
        ignoreFunctions: ['constant']
      }
    ]
  }
}
