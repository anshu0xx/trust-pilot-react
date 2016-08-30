import 'core-js/es5';

let context = require.context('./', true, /helpers\/.*\.jsx?$/);
context.keys().forEach(context);

context = require.context('./', true, /[Ss]pec\.jsx?$/);
context.keys().forEach(context);
