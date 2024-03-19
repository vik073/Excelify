// Params
export default {
  // site
  site: {
    name: 'Norm',
    version: '0.1',
    description: 'Data Modeling Platform',
    url: 'https://usenorm.com'
  },

  // common
  common: {
    errors: {
      auth: 'error_auth',
      validation: 'error_validation'
    },

    message: {
      timers: {
        short: 2000,
        default: 4000,
        long: 6000
      }
    },

    date: {
      format: {
        basic: 'YYYY-MM-DD',
        full: 'YYYY-MM-DD hh:mm a'
      }
    },

    axis: {
      row: {
        key: 'row',
        name: 'Row'
      },

      col: {
        key: 'col',
        name: 'Column'
      },

      mark: {
        key: 'mark',
        name: 'Mark'
      }
    }
  },

  // user
  user: {
    roles: {
      user: {
        key: 'user',
        title: 'User',
        access: ['user']
      }
    }
  },

  // worksheet
  worksheet: {
    templates: {
      empty: {
        key: 'empty',
        title: 'Empty'
      }

      /*
      default: {
        key: 'default',
        title: 'Default'
      },

      sales: {
        key: 'sales',
        title: 'Sales'
      }
       */
    }
  }
};
