import { v4 as uuidv4 } from 'uuid';
export default function generateTransactionId() {
  return uuidv4();
}
