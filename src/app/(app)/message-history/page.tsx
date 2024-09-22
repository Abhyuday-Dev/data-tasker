// src/components/MessageHistory.tsx
'use client';

import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMessages } from '@/context/MessageContext'; 

export default function MessageHistory() {
  const { messages } = useMessages(); // Use the Message context

  // Sort messages from newest to oldest
  const sortedMessages = [...messages].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <Card className="w-full max-w-2xl mx-auto mt-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Message History</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] w-full pr-4">
          {/* Displaying message history */}
          {sortedMessages.length === 0 ? (
            <p className="text-center text-muted-foreground">No messages sent yet.</p>
          ) : (
            sortedMessages.map((msg) => (
              <Card key={msg.id} className="mb-4">
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground mb-1">
                    To: {msg.to}
                  </p>
                  <p className="text-sm mb-2">{msg.message}</p>
                  <p className="text-xs text-muted-foreground">
                    Sent: {new Date(msg.timestamp).toLocaleString()}
                  </p>
                </CardContent>
              </Card>
            ))
          )}
        </ScrollArea>
      </CardContent>
      <CardFooter>
        {/* Button to redirect to contacts list */}
        <Link href="/" className="w-full">
          <Button className="w-full">Back to Contacts</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
