"use server";
import { createClient } from "@/lib/supabase/server";
export async function loginAdmin(email:string,password:string){
  try{
    const supabase=await createClient();
    const {data,error}=await supabase.auth.signInWithPassword({email:email.trim(),password});
    if(error)return {ok:false,error:error.message};
    if(data.user?.app_metadata?.role!=="admin"){
      await supabase.auth.signOut();
      return {ok:false,error:"This account does not have admin access."};
    }
    return {ok:true,error:""};
  }catch(e){console.error("Admin login error",e);return {ok:false,error:"Unable to connect to authentication service. Please try again."}}
}