const	{ prompt } = require('inquirer'),
		{ fix } = require('./scripts/main'),
		program  = require('commander');

const params = [
	{
	  type : 'input',
	  name : 'delta',
		message : 'Enter the In value difference: ',
		validate(input) {
			return new Promise((resolve, reject) => {
				if (!isNaN(input))
					resolve(true);
				else {
					reject('Please, enter a numeric value');
				}
			});
		}
	},
	{
		type : 'list',
		choices: ['+', '-'],
		default: '+',
	  name : 'sign',
	  message : 'Enter the sign of variation: '
	},
];

program
	.version('0.0.1')
	.description('DaVinci Resolve Studio XML Fixer');

program
	.command('dvrsxml-fixer [delta] [sign]')
	.alias('fix')
	.description('Fix Record > In values in DaVinci Record Studio XML files.')
	.action((delta, sign) => {
		prompt(params).then(inputs =>
			fix(inputs)
		);	
	});

program.parse(process.argv);
