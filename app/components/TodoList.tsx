import { useState } from "react";
import { useContract } from "../hooks/useContract";
import { TodoItem } from "@/types/contract";

interface TodoListProps {
  todos: TodoItem[];
  onTodoUpdated: () => void;
}

export function TodoList({ todos, onTodoUpdated }: TodoListProps) {
  const [pendingId, setPendingId] = useState<number | null>(null);
  const { contract } = useContract();

  async function toggleCompleted(id: number) {
    if (!contract) return;

    try {
      setPendingId(id);
      const tx = await contract.toggleCompleted(id);
      await tx.wait();
      onTodoUpdated();
    } catch (error) {
      console.error("Failed to toggle todo:", error);
    } finally {
      setPendingId(null);
    }
  }

  async function deleteTodo(id: number) {
    if (!contract) return;

    try {
      setPendingId(id);
      const tx = await contract.deleteTodo(id);
      await tx.wait();
      onTodoUpdated();
    } catch (error) {
      console.error("Failed to delete todo:", error);
    } finally {
      setPendingId(null);
    }
  }

  if (todos.length === 0) {
    return (
      <p className="text-gray-500">No todos yet. Create one to get started!</p>
    );
  }

  return (
    <ul className="divide-y divide-gray-200">
      {todos.map((todo) => (
        <li key={todo.id} className="py-4 flex items-center justify-between">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleCompleted(todo.id)}
              disabled={pendingId === todo.id}
              className="h-4 w-4 mr-2"
            />
            <span
              className={todo.completed ? "line-through text-gray-500" : ""}
            >
              {todo.content}
            </span>
          </div>
          <button
            onClick={() => deleteTodo(todo.id)}
            disabled={pendingId === todo.id}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded text-sm disabled:opacity-50"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
