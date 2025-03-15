// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title TodoList
 * @dev A simple smart contract for managing todo items
 */
contract TodoList {
    // Structure to define a Todo item
    struct Todo {
        uint id;
        string content;
        bool completed;
    }

    // State variables
    uint public todoCount = 0;
    mapping(uint => Todo) public todos;
    address public owner;

    // Events
    event TodoCreated(uint id, string content, bool completed);
    event TodoCompleted(uint id, bool completed);
    event TodoDeleted(uint id);

    // Constructor
    constructor() {
        owner = msg.sender;
    }

    // Modifier to check if the caller is the owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    /**
     * @dev Create a new todo item
     * @param _content The content of the todo item
     */
    function createTodo(string memory _content) public {
        todoCount++;
        todos[todoCount] = Todo(todoCount, _content, false);
        emit TodoCreated(todoCount, _content, false);
    }

    /**
     * @dev Toggle the completion status of a todo item
     * @param _id The ID of the todo item
     */
    function toggleCompleted(uint _id) public {
        // Make sure the todo exists
        require(_id > 0 && _id <= todoCount, "Todo does not exist");

        // Get the todo
        Todo memory _todo = todos[_id];

        // Toggle the completed status
        _todo.completed = !_todo.completed;

        // Update the todo
        todos[_id] = _todo;

        // Emit an event
        emit TodoCompleted(_id, _todo.completed);
    }

    /**
     * @dev Delete a todo item
     * @param _id The ID of the todo item
     */
    function deleteTodo(uint _id) public onlyOwner {
        // Make sure the todo exists
        require(_id > 0 && _id <= todoCount, "Todo does not exist");

        // Delete the todo
        delete todos[_id];

        // Emit an event
        emit TodoDeleted(_id);
    }
}
