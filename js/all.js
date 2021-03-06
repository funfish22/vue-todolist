'use strict';

var addTodo = document.getElementById('addTodo');
var getDate = localStorage.getItem('todo');
var todos = JSON.parse(getDate) || [];

var app = new Vue({
    
    el: '#app',
    data: {
        newTodo: '',
        newComment: '',
        newDate: '',
        newTime: '',
        newFile: '',
        todos: todos,
        tags: 'all',
        openAddTodo: false,
        cacheTodo: {},
        cacheTitle: '',
        cacheDate: '',
        cacheTime: '',
        cacheComment: '',
        cacheFile: ''
    },

    methods: {
        addTodo: function addTodo() {
            var value = this.newTodo.trim();
            var comment = this.newComment;
            var date = this.newDate;
            var time = this.newTime;
            var file = this.newFile;
            var timestamp = Math.floor(Date.now());
            var today = new Date();
            if (!value) {
                this.newTodo = '';
                this.newFile = '';
                this.newComment = '';
                this.newTime = '';
                this.newDate = '';
                return;
            }
            this.todos.push({
                id: timestamp,
                title: value,
                completed: false,
                // date: (today.getMonth()+1) + '/' + today.getDate(),
                comment: comment,
                star: 'false',
                date: date,
                time: time,
                file: file
            });
            var data = JSON.stringify(this.todos)
            localStorage.setItem('todo', data);
            this.newTodo = '';
            this.newComment = '';
            this.newTime = '';
            this.newDate = '';
            this.newFile = '';
        },
        cancelTodo: function cancelTodo() {
            this.newTodo = '';
            this.newComment = '';
            this.newTime = '';
            this.newDate = '';
            this.newFile = '';
            this.openAddTodo = false;
        },
        removeTodo: function removeTodo(key) {
            this.todos.splice(key, 1);
            localStorage.setItem('todo', JSON.stringify(this.todos));
        },
        editTodo: function editTodo(item) {
            this.cacheTodo = item;
            this.cacheTitle = item.title;
            this.cacheDate = item.date;
            this.cacheTime = item.time;
            this.cacheComment = item.comment;
            this.cacheFile = item.file;
        },
        doneEdit: function doneEdit(item) {
            item.title = this.cacheTitle;
            item.file = this.cacheFile;
            item.comment = this.cacheComment;
            item.date = this.cacheDate;
            item.time = this.cacheTime;
            this.cacheTitle = '', this.cacheTodo = {};
            this.cacheTime = '';
            this.cacheDate = '';
            this.cacheFile = '';
            this.cacheComment = '';
            this.cacheTitle = '';
            this.newFile = '';
            localStorage.setItem('todo', JSON.stringify(this.todos));
        },
        cancelEdit: function cancelEdit(item) {
            this.cacheTodo = {};
            this.cacheTime = '';
            this.cacheDate = '';
            this.cacheFile = '';
            this.cacheComment = '';
            this.cacheTitle = '';
            item.file = '';
        },
        addNewFile: function addNewFile(item) {
            this.newFile = 'test.jpg';
            item.file = 'test.jpg';
            this.cacheFile = this.newFile;
        },
        completed(item){
            item.completed = !item.completed;
            localStorage.setItem('todo', JSON.stringify(this.todos));
        },
        starOpen(item){
            item.star = 'true';
            localStorage.setItem('todo', JSON.stringify(this.todos));
        },
        starClose(item){
            item.star = 'false';
            localStorage.setItem('todo', JSON.stringify(this.todos));
        }
        // openAddTodo(){
        //     console.log('123');
        // }
        // canceAddTodo(){
        //     openAddTodo: false;
        //     newTodo = '';
        // }

    },

    computed: {
        filtererTodos: function filtererTodos() {
            if (this.tags == 'all') {
                return this.todos;
            } else if (this.tags == 'active') {
                var newTodo = [];
                this.todos.forEach(function (item) {
                    if (!item.completed) {
                        newTodo.push(item);
                    }
                });
                return newTodo;
            } else if (this.tags == 'completed') {
                var newTodos = [];
                this.todos.forEach(function (item) {
                    if (item.completed) {
                        newTodos.push(item);
                    }
                });
                return newTodos;
            }
        },
        listLen: function listLen() {
            var len = [];
            this.todos.forEach(function (item) {
                if (!item.completed) {
                    len.push(item);
                }
            });
            return len.length;
        }
    }
});