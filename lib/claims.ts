import { supabase } from './supabaseClient';
import { PostedEvidence, EvidencePayload } from './types';

export async function fetchEvidenceById(evidenceid: string): Promise<PostedEvidence & { messagedata: any; rawproof: any } | null> {
  const { data, error } = await supabase
    .from('evidences')
    .select('*')
    .eq('evidenceid', evidenceid)
    .single();
  console.log("FETCHED FOR ", evidenceid)
  console.log("DATA", data)
  if (error || !data) return null;
  console.log("DATA")
  return data as any;
}

export async function fetchPostedEvidences(): Promise<(PostedEvidence & { messagedata: any; rawproof: any })[]> {
  const { data, error } = await supabase
    .from('evidences')
    .select('*')
    .order('createdAt', { ascending: false });
  if (error) throw error;
  return data as any[];
}

export async function fetchRawProof(evidenceid: string): Promise<any> {
  const { data, error } = await supabase
    .from('evidences')
    .select('rawproof')
    .eq('id', evidenceid)
    .single();
  if (error) throw error;
  return data?.rawproof;
}

// Create a new post linking evidence to a wallet
// Fetch all posts with joined evidence data
export async function fetchPostsWithEvidence() {
  // Fetch all posts
  const { data: posts, error: postsError } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });
  if (postsError) throw postsError;

  // Fetch all evidences
  const { data: evidences, error: evidencesError } = await supabase
    .from('evidences')
    .select('evidenceid, messagedata');
  if (evidencesError) throw evidencesError;

  // Map evidenceid to messagedata
  const evidenceMap: Record<string, any> = {};
  (evidences || []).forEach(ev => {
    evidenceMap[ev.evidenceid] = ev.messagedata;
  });

  // Join posts with their evidence
  return (posts || []).map((post: any) => {
    const messagedata = evidenceMap[post.evidenceid] || {};
    return {
      username: messagedata.forward_from?.username || '',
      text: messagedata.text || '',
      additionalcontext: post.additionalcontext || '',
      id: post.id,
      created_at: post.created_at
    };
  });
}


export async function createPost(evidenceid: string, walletid: string, additionalcontext: string) {
  const { data, error } = await supabase
    .from('posts')
    .insert([{ evidenceid, walletid, additionalcontext }])
    .select()
    .single();
  if (error) throw error;
  return data;
}
