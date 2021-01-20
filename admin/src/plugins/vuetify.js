import Vue from 'vue';
import Vuetify, { VSnackbar, VBtn, VIcon } from 'vuetify/lib';
import es from 'vuetify/es5/locale/es';
import '@mdi/font/css/materialdesignicons.css';

import VuetifyToast from 'vuetify-toast-snackbar-ng';
//import colors from 'vuetify/lib/util/colors';

Vue.use(Vuetify, {
  components: {
    VSnackbar,
    VBtn,
    VIcon,
  },
});
Vue.use(VuetifyToast, {
  shorts: {
    success: {
      color: 'success',
    },
    error: {
      color: 'error',
    },
    primary: {
      color: 'primary',
    },
  },
});

export default new Vuetify({
  lang: {
    locales: { es },
    current: 'es',
  },
  theme: {
    themes: {
      light: {
        primary: '#ff9f1c',
        secondary: '#cbf3f0',
        accent: '#2ec4b6',
        info: '#ffbf69',
        error: '#FF5252',
        success: '#4CAF50',
        warning: '#FFC107',
      },
      dark: {},
    },
  },
  icons: {
    iconfont: 'mdi', // default - only for display purposes
  },
});

// this.$vuetify.theme.dark
