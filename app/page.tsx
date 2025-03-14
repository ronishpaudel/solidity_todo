"use client";

import { useEffect } from "react";
import { ConnectWallet } from "./components/ConnectWallet";
import { CreateTodoForm } from "./components/CreateTodoForm";
import { TodoList } from "./components/TodoList";
import { useWallet } from "./hooks/useWallet";
import { useContract } from "./hooks/useContract";

export default function Home() {
  const { isConnected } = useWallet();
  const { todos, loading, error, loadTodos } = useContract();

  useEffect(() => {
    if (isConnected) {
      loadTodos();
    }
  }, [isConnected]);

  return (
    <main className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Blockchain Todo List</h1>

      <ConnectWallet />

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {isConnected && (
        <>
          <CreateTodoForm onTodoCreated={loadTodos} />

          {loading ? (
            <p>Loading todos...</p>
          ) : (
            <TodoList todos={todos} onTodoUpdated={loadTodos} />
          )}
        </>
      )}
    </main>
  );
}
