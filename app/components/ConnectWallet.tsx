import { useWallet } from "../hooks/useWallet";
import React from "react";

export function ConnectWallet() {
  const { connect, isConnected, address, error } = useWallet();

  return (
    <div className="mb-6">
      {!isConnected ? (
        <button
          onClick={connect}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Connect Wallet
        </button>
      ) : (
        <div className="text-sm text-gray-500">
          Connected: {address?.slice(0, 6)}...{address?.slice(-4)}
        </div>
      )}

      {error && <div className="mt-2 text-sm text-red-600">{error}</div>}
    </div>
  );
}
