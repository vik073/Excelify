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
    endpoint: {
      url: '/:operation?',
      upload: "/upload"
    },

    errors: {
      auth: 'error_auth',
      validation: 'error_validation'
    },

    folder: {
      uploads: "uploads"
    },

    log: {
      service: 'api',
      types: {
        error: 'error',
        warning: 'warning',
        info: 'info'
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
      admin: {
        key: 'admin',
        title: 'Admin',
        access: ['admin']
      },
      user: {
        key: 'user',
        title: 'User',
        access: ['admin', 'user']
      }
    },

    rules: {
      nameMinLength: 3,
      passwordMinLength: 6,
    }
  },

  // worksheet
  worksheet: {
    templates: {
      empty: {
        key: 'empty',
        title: 'Empty'
      },

      default: {
        key: 'default',
        title: 'Default'
      },

      sales: {
        key: 'sales',
        title: 'Sales'
      }
    }
  },

  // system
  system: {
    types: {
      api: {
        key: "api",
        name: "API"
      },
      web: {
        key: "web",
        name: "Web"
      }
    }
  }
}
