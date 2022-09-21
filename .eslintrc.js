module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  globals: {
    defineEmits: 'readonly',
    defineProps: 'readonly'
  },
  extends: [
    'plugin:vue/vue3-essential', // 这里需要注意 vue2 是`plugin:vue/essential` 
    'standard',
    'prettier',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['vue', '@typescript-eslint', 'prettier'],
  rules: {
    //  ********2022-03-05调整*************
    'prettier/prettier': 'off',
    'vue/html-self-closing': 'off',
    'vue/attributes-order': 0, // 属性换行提示
    'vue/singleline-html-element-content-newline': 'off', // 关闭在只有一个属性的标签里面的文字需要换行的提示
    'vue/multiline-html-element-content-newline': 'off', // 关闭在有多个属性的标签里面的文字需要换行的提示
    'generator-star-spacing': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-tabs': 'off',
    // 'nonblock-statement-body-position': 1,
    'object-curly-spacing': 'off',
    'vue/no-use-v-if-with-v-for': [
      'error',
      {
        allowUsingIterationVar: true
      }
    ],
    // 这里不错提示，生产环境打包时直接把console.log去掉
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    eqeqeq: 2, // 必须使用全等
    'no-empty': 0, // 不允许空作用域
    // 'no-var': 2, // 不允许使用var
    'spaced-comment': ['error', 'always'], // 注释后面加空格
    'space-before-function-paren': [
      'error',
      { anonymous: 'always', named: 'never', asyncArrow: 'always' }
    ],
    indent: 'off'
  }
};
