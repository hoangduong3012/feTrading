const aliases = (prefix = `src`) => ({
  '@fuse': `${prefix}/@fuse`,
  'assets': `${prefix}/assets`,
  '@history': `${prefix}/@history`,
  '@lodash': `${prefix}/@lodash`,
  '@mock-api': `${prefix}/@mock-api`,
  '@util': `${prefix}/@util`,
  'app/constant': `${prefix}/app/constant`,
  'app/api': `${prefix}/app/api`,
  'app/store': `${prefix}/app/store`,
  'app/shared-components': `${prefix}/app/shared-components`,
  'app/configs': `${prefix}/app/configs`,
  'app/theme-layouts': `${prefix}/app/theme-layouts`,
  'app/AppContext': `${prefix}/app/AppContext`,
  'app/service': `${prefix}/app/service`,
  helper: `${prefix}/helper`,
});

module.exports = aliases;