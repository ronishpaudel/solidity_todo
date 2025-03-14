// app/hooks/useContract.ts - Compatible with ethers v5
import { useState, useEffect } from "react";
import { ethers, BrowserProvider } from "ethers";
import TodoABI from "../lib/abi/TodoList.json";
import { TodoItem } from "../../types/contract";
import { CONTRACT_ADDRESS } from "@/types/contactAddress";

export function useContract() {
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initContract = async () => {
      if (typeof window === "undefined" || !window.ethereum) return;

      try {
        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const todoContract = new ethers.Contract(
          CONTRACT_ADDRESS,
          TodoABI.abi,
          signer
        );
        setContract(todoContract);
      } catch (err) {
        console.error("Failed to initialize contract:", err);
        setError("Failed to connect to blockchain");
      }
    };

    initContract();
  }, []);

  const loadTodos = async () => {
    if (!contract) return;

    setLoading(true);
    setError(null);

    try {
      // Get the total number of todos
      const todoCount = await contract.todoCount();

      // Fetch all todos
      const fetchedTodos: TodoItem[] = [];
      for (let i = 1; i <= Number(todoCount); i++) {
        const todo = await contract.todos(i);
        if (todo.content !== "") {
          // Skip deleted todos
          fetchedTodos.push({
            id: Number(todo.id),
            content: todo.content,
            completed: todo.completed,
          });
        }
      }

      setTodos(fetchedTodos);
    } catch (err) {
      console.error("Failed to load todos:", err);
      setError("Failed to load todos from blockchain");
    } finally {
      setLoading(false);
    }
  };

  return { contract, todos, loading, error, loadTodos };
}
