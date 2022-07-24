//import db configuration
const db = require('../config/mongoose');

//import db model
const Task = require('../models/task');

//This function will creaate a new task entry in the databse from the entered data and refresh the whole page
module.exports.create = function(req, res){
    let newDate;
    //if no date is selected
    if(req.body.date.length == 0){
        newDate = 'No Deadline'
    }

//if date is selected, this will convert the date to required format 
    else{
        let temp = req.body.date;
        let date = temp.substring(8, 10);
        let month = temp.substring(5, 7);
        let year = temp.substring(0, 4);

        if(date[0] == '0'){
            date = date.substring(1);
        }
        if(month[0] == '0'){
            month = month.substring(1);
        }

        let months = [
            'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
        ];
        newDate = "" + months[month-1] + " " + date + ", " + year;
    }

// To create new task and store in databse
    Task.create({
        description: req.body.description,
        category: req.body.category,
        date: newDate
    },function(err){
        if(err){
            console.log('Error creating Contact');
            return;
        }
        return res.redirect('back');
    });
}

//This function will be called when delete-task button is clicked
//It can delete a task or a list of tasks from db
module.exports.delete = function(req, res){
    //if user have not selected any task to delete
    if(req.body.id == undefined){
        console.log('User have not selected any task to delete');
        return res.redirect('back');
    }
    //if only oone task is to be deleted
    else if(typeof(req.body.id) == 'string'){
        Task.findByIdAndDelete(req.body.id, function(err){
            if(err){
                console.log('Error in deleting task');
                return;
            }
            return res.redirect('back');
        });
    }
    //if multiple tasks are to be deleted
    else{
        for(let i of req.body.id){
            Task.findByIdAndDelete(i, function(err){
                if(err){
                    console.log('Error in deleting task');
                    return;
                }
            });
        }
        return res.redirect('back');
    }
}