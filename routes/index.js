/*
 * GET home page. 
 */

 exports.index = function(req, res) {
     res.render('index', {title: '간단한 ToDo 리스트 예제 실습'});
 };