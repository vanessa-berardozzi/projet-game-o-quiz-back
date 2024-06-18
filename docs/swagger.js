//Config file for swagger

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Game-o-Quiz API',
			version: '1.0.0',
			description: 'A Express Quiz API',
		},
		servers: [
			{
				url: 'https://quiz.berardozzi.fr/',
			},
		],
	},
	apis: ['./app/routers/*.js', './app/models/*.js', './app/controllers/*.js'],
};

const swaggerSpecs = swaggerJsDoc(options);

module.exports = { swaggerSpecs };

