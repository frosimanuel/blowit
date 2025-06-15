// The shape of the data your bot sends to the API
export interface ClaimPayload {
  messageData: any; // Use `any` for now if the object is complex
  rawProof: any;
  processedProof: ProcessedProof;
}

// The shape of your simplified, processed proof
export interface ProcessedProof {
  sender: string;
  text: string;
  timestamp: number; // Unix timestamp
}

// The full claim object as stored in your database
export interface StoredClaim extends ClaimPayload {
  id: string; // The unique ID you generate
  createdAt: string; // ISO date string
} 