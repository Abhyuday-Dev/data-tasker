export interface Contact {
    id: number;
    fname: string;
    lname: string;
    phone: string;
  }
  
  export interface Message {
    id: number;
    to: string;
    message: string;
    timestamp: string;
  }
  
  export const contacts: Contact[] = [
    { id: 1, fname: 'Abhyuday',lname:"Test", phone: '+919140949375' },
    { id: 2, fname: 'The data Taskers',lname:"Testing", phone: '+919810153260' },
    { id: 3, fname: 'John',lname:"Smith", phone: '+1234567890' },
    { id: 4, fname: 'Jonny',lname:"Smith", phone: '+1234567890' },
    { id: 5, fname: 'Dev',lname:"Smith", phone: '+1234567890' },
    { id: 6, fname: 'Avi',lname:"Singh", phone: '+1234567890' },
    { id: 7, fname: 'Johnny',lname:"Lever", phone: '+1234567890' },
  ];
  
  export const messageHistory: Message[] = [
    { id: 1, to: '+1234567890', message: 'Hello John!', timestamp: '2023-06-01T10:00:00Z' },
    { id: 2, to: '+9876543210', message: 'Hi Jane!', timestamp: '2023-06-02T11:30:00Z' },
    { id: 3, to: '+1122334455', message: 'Hey Bob!', timestamp: '2023-06-03T09:15:00Z' },
  ];