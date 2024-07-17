"use client";

import { useRef, useEffect } from "react";
import { useChat } from "ai/react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { SendHorizontalIcon, User } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

const Chat = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } =
    useChat({
      initialMessages: [
        {
          id: Date.now().toString(),
          role: "system",
          content: "You are an assistant that gives short answers",
        },
      ],
    });

  useEffect(() => {
    if (ref.current === null) return;
    ref.current.scrollTo(0, ref.current.scrollHeight);
  }, [messages]);

  return (
    <section className="py-24 text-zinc-700">
      <div className="container flex h-screen flex-col items-center justify-center">
        <h1 className="text-2xl font-medium">Tech News Chatbot</h1>
        <div className="mt-4 w-full max-w-lg">
          <ScrollArea
            className="mb-2 h-[400px] rounded-md border p-4"
            ref={ref}
          >
            {error && (
              <div className="text-sm text-red-400">{error.message}</div>
            )}
            {messages.map((m) => (
              <div key={m.id} className="mr-6 whitespace-pre-wrap md:mr-12">
                {m.role === "user" && (
                  <div className="mb-6 flex gap-3">
                    <Avatar>
                      <User className="rounded-full bg-zinc-300" />
                    </Avatar>
                    <div className="mt-1.5">
                      <p className="font-semibold">You</p>
                      <div className="mt-1.5 text-sm text-zinc-500">
                        {m.content}
                      </div>
                    </div>
                  </div>
                )}

                {m.role === "assistant" && (
                  <div className="mb-6 flex gap-3">
                    <Avatar>
                      <AvatarImage
                        src="/gemini-logo.png"
                        alt="@shadcn"
                        className="rounded-full h-6 w-6"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="mt-1.5 w-full">
                      <div className="flex justify-between">
                        <p className="font-semibold">Bot</p>
                      </div>
                      <div className="mt-2 text-sm text-zinc-500">
                        {m.content}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </ScrollArea>

          <form onSubmit={handleSubmit} className="relative">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Enter a prompt here"
              className="pr-12 placeholder:italic placeholder:text-zinc-600/75 focus-visible:ring-none"
            />
            <Button
              size="icon"
              type="submit"
              variant="secondary"
              disabled={isLoading}
              className="absolute right-1 top-1 h-8 w-10"
            >
              <SendHorizontalIcon className="h-5 w-5 text-zinc-500" />
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Chat;
