// src/components/SendMessage.tsx

'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RefreshCw, Loader2 } from "lucide-react"; 
import { toast } from '@/hooks/use-toast';
import { contacts } from '@/app/data/contact';
import { useMessages } from '@/context/MessageContext'; 

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export default function SendMessage() {
  const router = useRouter();
  const [otp, setOtp] = useState(generateOTP());
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); 
  const { id } = useParams();
  const contact = contacts.find((c) => c.id === parseInt(id as string));
  const { addMessage } = useMessages(); 

  useEffect(() => {
    setMessage(`Hi! Your OTP is ${otp}`);
  }, [otp]);

  const handleChangeOTP = () => {
    setOtp(generateOTP());
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Input validation
    if (!message.trim()) {
      setError('Message cannot be empty');
      return;
    }

    setError('');
    setLoading(true); // Set loading to true

    try {
      // axios request
      const response = await axios.post('/api/send-message', {
        to: contact?.phone,
        message: message,
      });

      if (response.status === 200) {
        // Add the new message to the context
        const newMessage = {
          id: Date.now(), 
          to: contact?.fname || '',
          message: message,
          timestamp: new Date().toISOString(),
        };
        addMessage(newMessage);

        toast({
          title: "Success",
          description: "SMS sent successfully",
        });
        router.replace('/message-history');
      } else {
        toast({
          title: "Error",
          description: "Failed to send SMS",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to send SMS",
        variant: "destructive",
      });
    } finally {
      setLoading(false); // Set loading to false after the request completes
    }
  };

  // If contact not present
  if (!contact) return (
    <Card className="w-full max-w-md mx-auto mt-8">
      <CardContent className="pt-6">
        <p className="text-center">Contact not found</p>
      </CardContent>
    </Card>
  );

  return (
    <div className='flex justify-center items-center p-2'>
      <Card className="w-full max-w-md mx-auto mt-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Send Message to {contact.fname}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              {/* Input Field */}
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message:</label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  setError('');
                }}
                className={`min-h-[100px] ${error ? 'border-red-500' : ''}`}
              />
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>
            <div className="flex justify-between items-center">
              {/* Button to generate new OTP */}
              <Button type="button" variant="outline" onClick={handleChangeOTP}>
                <RefreshCw className="mr-2 h-4 w-4" /> Change OTP
              </Button>
              <span className="text-sm text-muted-foreground">Current OTP: {otp}</span>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          {/* Button to send sms */}
          <Button type="submit" className="w-full" onClick={handleSubmit} disabled={loading}>
            {loading ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : "Send Message"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
