import { supabase } from './supabaseClient';
import { PostedEvidence, EvidencePayload } from './types';

export async function fetchPostedEvidences(): Promise<(PostedEvidence & { messageData: any; rawProof: any })[]> {
  const { data, error } = await supabase
    .from('evidences')
    .select('*')
    .order('createdAt', { ascending: false });
  if (error) throw error;
  return data as any[];
}

export async function fetchRawProof(evidenceId: string): Promise<any> {
  const { data, error } = await supabase
    .from('evidences')
    .select('rawProof')
    .eq('id', evidenceId)
    .single();
  if (error) throw error;
  return data?.rawProof;
}
