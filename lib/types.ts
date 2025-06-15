// The shape of the data your bot sends to the API
export interface EvidencePayload {
  messageData: EvidenceMessageSummary; // Use `any` for now if the object is complex
  rawProof: any;
  processedProof: any;
}

// The shape of your simplified, processed proof
export interface EvidenceMessageSummary {
  forward_from: {
    id: number;
    is_bot: boolean;
    first_name: string;
    last_name: string;
    username: string;
    language_code: string;
    is_premium: boolean;
  };
  forward_origin: {
    type: string;
    sender_user: {
      id: number;
      is_bot: boolean;
      first_name: string;
      last_name: string;
      username: string;
      language_code: string;
      is_premium: boolean;
    };
    date: number;
  };
  forward_date: number;
  text: string;
}

// The full claim object as stored in your database
export interface PostedEvidence {
  id: string; // The unique ID you generate
  evidenceId: string;
  walletId: string;
  createdAt: string;
}