import config from '../config/configuration';
import fs = require('fs');
fs.writeFileSync(
  'ormconfig.json',
  JSON.stringify(config().getTypeOrmModuleOptions(), null, 2),
);
