import { supabase } from "../../utils/supabase";

export const updateProfile = async (updates: any) => {
    await supabase.from('profiles').upsert(updates)
};
