const program = require('commander');
const globalTunnel = require('global-tunnel-ng');
// Require logic.js file and extract controller functions using JS destructuring assignment
const { runwellness } = require('./logic');


program
  .version('0.0.2')
  .description('Run TSB Mobile App automated wellness');

program
  .command('runwellness')
  .alias('w')
  .description('Run Full Wellness for TSB Mobile App. Available Environments -> PRODAKAMAI, PRODNH, PRODFH, GOS')
  .arguments('<environment>') //[PRODAKAMAI, PRODNH, PRODFH, GOS]
  .arguments('<wellnessToUse>') //[FULL_WELLNESS, FULL_WELLNESS_V2_Services, FULL_WELLNESS_V2_Business_MVP0.6]
  .arguments('<sabisusername>')
  .arguments('<sabispassword>')
  .arguments('<emailtosendresults>')
  .action((environment, wellnessToUse, sabisusername, sabispassword, emailtosendresults) => {
    runwellness(environment, wellnessToUse, sabisusername, sabispassword, emailtosendresults);
  });
 
 /*globalTunnel.initialize({
  host: '172.31.13.41',
  port: 80,
  proxyAuth: 'd402854:Uapgat60', // optional authentication
  sockets: 50, // optional pool size for each http and https
  protocol: 'https'

});*/
  
program.parse(process.argv);

