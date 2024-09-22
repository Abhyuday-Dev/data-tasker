//contact list page

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { contacts } from "./data/contact";

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Contact List</h1>
      <Table>
        <TableHeader>
          <TableRow>
            {/* Column Headers */ }
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Displaying Contact list */}
          {contacts.map((contact) => (
            <TableRow key={contact.id}>
              {/*Display data */ }
              <TableCell>{contact.fname}</TableCell>
              <TableCell>{contact.lname}</TableCell>
              <TableCell>
                {/* Redirect to contact view page*/ }
                <Link href={`/contact/${contact.id}`}>
                  <Button className="bg-gray-700">View Details</Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
