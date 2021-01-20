const fs = require('fs');
const beautify = require('js-beautify').html;

const main = async () => {
  const models = fs.readdirSync('C:/Users/Gaston/Documents/GitHub/LoConected/server/src/models');

  for (modelName of models) {
    if (modelName == '_baseModel.js') {
      continue;
    }
    modelName = modelName.split('.')[0];
    const modelNameCC = modelName.charAt(0).toLowerCase() + modelName.slice(1);
    const model = require(`C:/Users/Gaston/Documents/GitHub/LoConected/server/src/models/${modelName}`);

    console.log('Creando: ', `${modelName  }.vue`);

    const {jsonSchema} = model;
    if (!jsonSchema) {
      continue;
    }

    let template = `<template> <v-form ref="form" v-model="${modelNameCC}Valid" class="text-center">`;
    let data = `
    data: () => ({
        ${modelNameCC}Valid: true,
    `;
    let methods = `
    methods: {
    `;

    let dataFieldModel = `${modelNameCC}: {`;
    let rulesFieldModel = `${modelNameCC}Rules: {`;
    let labelFieldModel = `${modelNameCC}Label: {`;

    Object.keys(jsonSchema.properties).forEach((fieldName) => {
      if (fieldName == 'id') {
        return;
      }

      const field = jsonSchema.properties[fieldName];
      const fieldTypes = field.type.split(' ,');

      let templateField = '';
      let dataField = '';

      if (field.default) {
        dataFieldModel += `${fieldName}: "${field.default}",`;
      } else {
        dataFieldModel += `${fieldName}: undefined,`;
      }

      const fieldNameUC = fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
      labelFieldModel += `${fieldName}: "${fieldNameUC}",`;

      const required = jsonSchema.required.includes(fieldName) || false;
      let requiredRule = '';
      if (required) {
        requiredRule = `v => !!v || \`\${this.${modelNameCC}Label.${fieldName}} es requerido!\`,\n`;
      }

      if (fieldTypes.includes('string') && !field.enum) {
        let minRule = '';
        let maxRule = '';

        if (field.minLength) {
          minRule = `v => (v && v.length >= ${field.minLength}) || '${fieldName} debe tener al menos ${field.minLength} caracteres!',\n`;
        }
        if (field.maxLength) {
          maxRule = `v => (v && v.length < ${field.maxLength}) || '${fieldName} debe tener menos de ${field.maxLength} caracteres!',\n`;
        }

        templateField = `<v-text-field v-model="${modelNameCC}.${fieldName}" :counter="${
          field.maxLength || 0
        }" :rules="${modelNameCC}Rules.${fieldName}" :label="${modelNameCC}Label.${fieldName}" ${
          required ? 'required' : ''
        }></v-text-field>
        `;
        rulesFieldModel += `${fieldName}: [\n${requiredRule}${minRule}${maxRule}],`;
      } else if (fieldTypes.includes('string') && field.enum) {
        gender = {
          type: 'string',
          enum: ['Male', 'Female', 'Other'],
        };
        templateField = `<v-radio-group v-model="${modelNameCC}.${fieldName}">
          <v-radio
            v-for="option in ${fieldName}Items"
            :key="option"
            :label="\`\$\{option\}\`"
            :value="option"
          ></v-radio>
        </v-radio-group>`;
        dataField = `${fieldName}Items: ["${field.enum.join('","')}"],`;
      } else if (fieldTypes.includes('integer')) {
        let minRule = '';
        let maxRule = '';

        if (field.minimun) {
          minRule = `v => (v && v >= ${field.minimun}) || '${fieldName} debe ser menor o igual a ${field.minimun} caracteres!',\n`;
        }
        if (field.maximun) {
          maxRule = `v => (v && v <= ${field.maximun}) || '${fieldName} debe ser mayor o igual a ${field.maximun} caracteres!',\n`;
        }

        templateField = `<v-text-field v-model.number="${modelNameCC}.${fieldName}" :rules="${modelNameCC}Rules.${fieldName}" :label="${modelNameCC}Label.${fieldName}" ${
          required ? 'required' : ''
        }></v-text-field>\n`;
        rulesFieldModel += `${fieldName}: [\n${requiredRule}${minRule}${maxRule}v => (v && v%1===0 || '${fieldName} debe ser un numero entero!'),\n],`;
      } else if (fieldTypes.includes('number')) {
        let minRule = '';
        let maxRule = '';

        if (field.minimun) {
          minRule = `v => (v && v >= ${field.minimun}) || '${fieldName} debe ser menor o igual a ${field.minimun} caracteres!',\n`;
        }
        if (field.maximun) {
          maxRule = `v => (v && v <= ${field.maximun}) || '${fieldName} debe ser mayor o igual a ${field.maximun} caracteres!',\n`;
        }

        templateField = `<v-text-field v-model.number="${modelNameCC}.${fieldName}" :rules="${modelNameCC}Rules.${fieldName}" :label="${modelNameCC}Label.${fieldName}" ${
          required ? 'required' : ''
        }></v-text-field>\n`;

        rulesFieldModel += `${fieldName}: [\n${requiredRule}${minRule}${maxRule}],`;
      } else if (fieldTypes.includes('date')) {
        templateField = `<v-text-field type="date" v-model="${modelNameCC}.${fieldName}" :rules="${modelNameCC}Rules.${fieldName}" :label="${modelNameCC}Label.${fieldName}" ${
          required ? 'required' : ''
        }></v-text-field>`;
        rulesFieldModel += `${fieldName}: [${requiredRule}],`;
      } else if (fieldTypes.includes('datetime')) {
        templateField = `<v-text-field type="datetime" v-model="${modelNameCC}.${fieldName}" :rules="${modelNameCC}Rules.${fieldName}" :label="${modelNameCC}Label.${fieldName}" ${
          required ? 'required' : ''
        }></v-text-field>`;
        rulesFieldModel += `${fieldName}: [${requiredRule}],`;
      }

      template += `\n${  templateField}`;
      data += `\n${  dataField}`;
    });

    rulesFieldModel += '},';
    dataFieldModel += '},';
    labelFieldModel += '},';
    data += `\n${  dataFieldModel  }\n${  rulesFieldModel  }\n${  labelFieldModel  }\n` + `}),`;
    methods += `async onSubmit${modelName}() {},` + '\n' + `},`;
    template +=
      '\n' +
      `     <v-btn :disabled="!${modelNameCC}Valid" color="success" class="mr-4" @click="onSubmit${modelName}">Submit</v-btn>
        </v-form>
    </template>`;

    const script = `
    <script>
        export default {
            ${data}
            ${methods}
        };
    </script>
    `;

    const style = `
    <style></style>
    `;

    const vueFileContent = template + script + style;

    ((modelName) => {
      fs.writeFile(
        `C:/Users/Gaston/Documents/GitHub/LoConected/client/src/components/modelForm/${modelName}.vue`,
        beautify(vueFileContent, {
          indent_size: 2,
          indent_char: ' ',
          max_preserve_newlines: '2',
          preserve_newlines: true,
          keep_array_indentation: false,
          break_chained_methods: false,
          indent_scripts: 'normal',
          brace_style: 'collapse',
          space_before_conditional: true,
          unescape_strings: false,
          jslint_happy: false,
          end_with_newline: false,
          wrap_line_length: '160',
          indent_inner_html: false,
          comma_first: false,
          e4x: false,
          indent_empty_lines: false,
          indent_style: 'space',
          end_of_line: 'lf',
          trim_trailing_whitespace: true,
          insert_final_newline: true,
          max_line_length: 100,
        }),
        (err, res) => {
          console.log('Se creo: ', `${modelName  }.vue`);
        }
      );
    })(modelName);
  }
  console.log('Se han creado todos los formularios!');
};
main();
