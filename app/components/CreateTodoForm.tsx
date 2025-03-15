import { useState } from "react";
import { useContract } from "../hooks/useContract";
import React from "react";

export function CreateTodoForm({
  onTodoCreated,
}: {
  onTodoCreated: () => void;
}) {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { contract } = useContract();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim() || !contract) return;

    try {
      setIsSubmitting(true);
      const tx = await contract.createTodo(content);
      await tx.wait();
      setContent("");
      onTodoCreated();
    } catch (error) {
      console.error("Failed to create todo:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex">
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What needs to be done?"
          disabled={isSubmitting}
          className="flex-grow p-2 border border-gray-300 rounded-l"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-r disabled:opacity-50"
        >
          {isSubmitting ? "Adding..." : "Add Todo"}
        </button>
      </div>
    </form>
  );
}
