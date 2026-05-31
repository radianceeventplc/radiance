"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import { BookingMessage } from "@/types";
import { Loader2, Send } from "lucide-react";

interface MessageThreadProps {
  bookingId: string;
}

export function MessageThread({ bookingId }: MessageThreadProps) {
  const [messages, setMessages] = useState<BookingMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  const fetchMessages = async () => {
    try {
      const res = await fetch(`/api/bookings/${bookingId}/messages`);
      const result = await res.json();

      if (!res.ok) throw new Error(result.error);

      setMessages(result.data ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [bookingId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e: FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || sending) return;

    setSending(true);

    try {
      const res = await fetch(`/api/bookings/${bookingId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sender: "ADMIN",
          content: newMessage.trim(),
        }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error);

      setMessages((prev) => [...prev, result.data]);
      setNewMessage("");
    } catch (err) {
      console.error("MESSAGE_SEND_ERROR", err);
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="w-6 h-6 animate-spin text-[#bf8f38]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 text-sm">{error}</p>
        <button
          onClick={fetchMessages}
          className="text-[#bf8f38] underline hover:no-underline text-sm mt-2"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto space-y-3 mb-4 max-h-80">
        {messages.length === 0 && (
          <p className="text-center text-gray-600 text-sm py-8">
            No messages yet
          </p>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "ADMIN"
                ? "justify-end"
                : message.sender === "SYSTEM"
                ? "justify-center"
                : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-none px-4 py-2 text-sm ${
                message.sender === "ADMIN"
                   ? "bg-[#bf8f38] text-white"
                   : message.sender === "SYSTEM"
                   ? "bg-gray-200 text-gray-600 text-xs italic"
                   : "bg-gray-300 text-gray-800"
              }`}
            >
              <p>{message.content}</p>
              <p
                className={`text-xs mt-1 ${
                  message.sender === "ADMIN" ? "text-white/60" : "text-gray-600"
                }`}
              >
                {new Date(message.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSend} className="flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 bg-white border border-gray-200 rounded-none text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#bf8f38] focus:border-[#bf8f38]"
          disabled={sending}
        />
        <button
          type="submit"
          disabled={!newMessage.trim() || sending}
          className="px-4 py-2 bg-[#bf8f38] text-white rounded-none hover:bg-[#bf8f38] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {sending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
        </button>
      </form>
    </div>
  );
}