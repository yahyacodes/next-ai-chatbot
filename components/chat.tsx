"use client";

import { useRef, useEffect } from "react";
import { useChat } from "ai/react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { SendHorizontalIcon, User } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Textarea } from "./ui/textarea";

const Chat = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } =
    useChat({
      initialMessages: [
        {
          id: Date.now().toString(),
          role: "system",
          content: "You are an assistant that provides tech news.",
        },
      ],
    });

  useEffect(() => {
    if (ref.current === null) return;
    ref.current.scrollTo(0, ref.current.scrollHeight);
  }, [messages]);

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit(event);
    }
  };

  return (
    <section className=" text-zinc-700 p-2">
      <div className="mx-auto flex flex-col items-center justify-center">
        <div className="mt-4 w-full max-w-7xl">
          <ScrollArea className="mb-20 rounded-md p-4 flex flex-col" ref={ref}>
            {error && (
              <div className="text-sm text-red-400">{error.message}</div>
            )}
            {messages.map((m) => (
              <div key={m.id} className="mr-6 whitespace-pre-wrap md:mr-12">
                {m.role === "user" && (
                  <div className="mb-6 flex justify-end gap-3">
                    <div>
                      <div className="text-md text-zinc-100 bg-zinc-900 p-2 rounded-md">
                        {m.content}
                      </div>
                    </div>
                    <div className="mt-1">
                      <Avatar>
                        <User className="rounded-full bg-zinc-300 h-8 w-8" />
                      </Avatar>
                    </div>
                  </div>
                )}

                {m.role === "assistant" && (
                  <div className="mb-6 flex gap-3">
                    <Avatar>
                      <AvatarImage
                        src="/gemini-logo.png"
                        alt="@shadcn"
                        className="rounded-full h-8 w-8 border"
                      />
                      <AvatarFallback>G</AvatarFallback>
                    </Avatar>
                    <div className=" w-full">
                      <div className="flex justify-between"></div>
                      <div className=" text-md text-zinc-700 bg-zinc-200 p-2 rounded-md">
                        {m.content}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </ScrollArea>

          <form
            onSubmit={handleSubmit}
            className="container fixed bottom-4 z-100 flex flex-col items-center justify-center"
          >
            <Textarea
              value={input}
              onChange={handleInputChange}
              placeholder="Enter a prompt here"
              rows={1}
              onKeyDown={handleKeyDown}
              className="min-h-[60px] bg-zinc-900 w-full resize-none px-4 py-[1.3rem] focus-within:outline-none sm:text-sm placeholder:italic placeholder:text-zinc-50 text-zinc-50 focus-visible:ring-zinc-900/40 overflow-hidden"
            />
            <div className="absolute right-0 top-[13px] sm:right-4">
              <Button
                size="icon"
                type="submit"
                variant="secondary"
                disabled={isLoading}
                className="absolute xl:right-8 right-10 top-1 h-8 w-10"
              >
                <SendHorizontalIcon className="h-5 w-5 text-zinc-500" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Chat;
