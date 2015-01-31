module.exports = {

  friendlyName: 'Build installable URL',
  description: 'Build an npm-installable URL compatible with private repos.',
  extendedDescription:
  'The URL returned by this machine is useful for accessing private repos in situations where `ssh` is not an option (e.g. with npm).  '+
  'You can use the URL returned by this machine as a dependency in your package.json file, allowing `npm install` to grab the code for '+
  'your dependency directly from its private GitHub repo.  '+
  'NPM installing from private repo URLs is a great way to take advantage of the power of NPM when circumstances prevent you from making your '+
  'dependencies open-source.  However, be aware that you may experience occasional caching issues with PaaS deployments (Modulus, Heroku, EBS, etc) '+
  'and/or continuous integration services (like CircleCI or Travis).  This is because the current version of NPM relies completely on the SEMVER range in the '+
  'package.json file (which, in this approach, we replace with the URL generated by this machine.)  If you run into issues with code from your private GitHub '+
  'dependencies not being updated, try clearing the NPM cache (the way to do this varies across different PaaS and CI providers-- to do it locally, run `npm cache clear`.)'+
  'Caching systems are difficult design problems, and NPM does a great job 99% of the time.  Stay tuned to the NPM repo for updates, and please participate in the discussion '+
  'if you have ideas.',
  inputs: {
    personalAccessToken: {
      description: 'A personal access token',
      example: 'x32929hghakg1ghdsgkj',
      required: true,
      whereToGet: {
        url: 'https://github.com/settings/applications',
        description: 'Copy and paste a personal access token, or generate one if you haven\'t already.'
      }
    },
    owner: {
      description: 'The name of the organization or user under which the new repo should be created (i.e. as it appears in the URL on GitHub)',
      example: 'balderdashy',
      required: true
    },
    repo: {
      description: 'The name of the Github repo (i.e. as it appears in the URL on GitHub)',
      example: 'private-customer-app',
      required: true
    },
  },

  defaultExit: 'success',

  exits: {
    error: {
      description: 'Unexpected error occurred.'
    },
    success: {
      description: 'Done.',
      example: 'git+https://x32929hghakg1ghdsgkj:x-oauth-basic@github.com/balderdashy/private-customer-app.git'
    }
  },

  fn: function(inputs, exits) {

    // Dependencies
    var _ = require('lodash');
    var util = require('util');

    return exits.success(util.format('git+https://%s:x-oauth-basic@github.com/%s/%s.git',inputs.personalAccessToken, inputs.owner, inputs.repo));

  }

};
