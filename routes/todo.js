/*
 * Get todo
 */

var fs = require('fs');        // File System Module

exports.list = function(req, res) {                    // Gets ToDo lists
    fs.exists('./todo_list.json', function(exists) {   // If Todo list exists...
        if(exists) {
            fs.readFile('./todo_list.json', {
                'encoding':'utf8'
            }, function(err, list) {    // reads todo_list.json
                res.json(list);
            });
        }
        else {
            var list = {        // Basic ToDo list template
                'list':[]
            };

            fs.writeFile('./todo_list.json', JSON.stringify(list), function(err) {  // Writes on todo_list.json
                res.json(list);
            });
        }
    })
};

exports.add = function(req, res) {      // Add ToDo
    var todo = {
        'contents':'',
        'complete':false
    };

    todo.contents = req.body.contents;
    
    fs.readFile('./todo_list.json', {
        'encoding':'utf8'
    }, function(err, data) {
        data = JSON.parse(data);
        data.list.push(todo);   // 새로운 ToDo 항목 추가

        fs.writeFile('./todo_list.json', JSON.stringify(data), function(err) {
            res.json(true);
        });
    });
};

exports.complete