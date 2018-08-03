const path = require('path');
const root = path.resolve(__dirname, '..');
module.exports = {
  root,
  src: path.join(__dirname, 'src'),
  public: path.join(__dirname, 'public'),
  cssIncude: path.join(__dirname, 'src/styles'),
  cssExclude: path.join(__dirname, 'node_modules'),
  components: path.join(__dirname, 'src/components'),
};
