import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,jsx,vue}']
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**']
  },

  // Configuration pour les fichiers frontend
  {
    files: ['src/**/*.{js,vue}', '!src/server/**/*'],
    ...js.configs.recommended,
    ...pluginVue.configs['flat/essential'],
    rules: {
      'vue/multi-word-component-names': 'off'
    }
  },

  // Configuration pour les fichiers backend Node.js
  {
    files: ['src/server/**/*.js'],
    languageOptions: {
      globals: {
        require: 'readonly',
        module: 'readonly',
        process: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        global: 'readonly',
        Buffer: 'readonly',
        console: 'readonly'
      },
      sourceType: 'commonjs',
      ecmaVersion: 2021
    },
    rules: {
      'no-console': 'off',
      'no-unused-vars': ['error', { 
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_' 
      }]
    }
  },

  skipFormatting
]