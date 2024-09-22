"use client"

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PhoneIcon, MessageSquare } from "lucide-react"
import { contacts } from '@/app/data/contact'

export default function ContactDetails() {
  const { id } = useParams()
  const contact = contacts.find((c) => c.id === parseInt(id as string))


  //If contact not found || failed to fetch contact
  if (!contact) return (
    <Card className="w-full max-w-md mx-auto mt-8">
      <CardContent className="pt-6">
        <p className="text-center text-muted-foreground">Contact not found</p>
      </CardContent>
    </Card>
  )

  return (
  <div className='flex justify-center items-center p-2'>
      <Card className="w-full max-w-md mx-auto mt-8 ">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{contact.fname} {contact.lname}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 text-muted-foreground">
          <PhoneIcon className="h-4 w-4" />
          <span>{contact.phone}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/send-message/${id}`} className="w-full">
        {/* Button to redirect to send-message page*/ }
          <Button className="w-full">
            <MessageSquare className="mr-2 h-4 w-4" /> Send Message
          </Button>
        </Link>
      </CardFooter>
    </Card> 
  </div>
  )
}