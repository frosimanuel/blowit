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
