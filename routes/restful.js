const path 					= require("path");
const ejs 					= require('ejs');
const url 					= require('url');
const os						= require('os');
const fs						= require('fs');
const async					= require('async');
const crypto				= require('crypto');
const iconv = require("iconv-lite");
const func				= require("./../custom_module/func.js");
const db_ 					= require("./../custom_module/db_query.js");
const request = require('request');
var exec = require('child_process').exec, child;


function send(res, code, data) {
	if (!data) data = {};
	res.statusCode = code;
	res.send(data);
}

module.exports.active_process = function(req, res){
	const {url} = req.body;
	console.log(url)
	child = exec(`java -jar /tagging_jar/youtube/Tagging.jar ${url} /tagging_jar/public/youtube/blank /tagging/public/youtube/img`,
	function (error, stdout, stderr){
		console.log('=========================')
		console.log('error:>>>>>>>>>>>>>>>',error)
		console.log('=========================')
		console.log('error:>>>>>>>>>>>>>>>',stdout)
		console.log('=========================')
		console.log('error:>>>>>>>>>>>>>>>',stderr)
		console.log('=========================')
		send(res, 200, true);
	});
	
};
