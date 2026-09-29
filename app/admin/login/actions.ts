"use server";
import { createClient } from "@/lib/supabase/server";
export async function loginAdmin(email:string,password:string){
  const rawUrl=process.env.NEXT_PUBLIC_SUPABASE_URL||"";
  const rawKey=process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY||"";
  const url=rawUrl.trim().replace(/^["']|["']$/g,"").replace(/\/$/,"");
  const key=rawKey.trim().replace(/^["']|["']$/g,"");
  try{
    if(!/^https:\/\/[a-z0-9-]+\.supabase\.co$/i.test(url)) return {ok:false,error:"Supabase URL configuration is invalid."};
    if(!key) return {ok:false,error:"Supabase publishable key is missing."};
    const health=await fetch(url+"/auth/v1/health",{headers:{apikey:key},cache:"no-store"});
    if(!health.ok)return {ok:false,error:"Supabase Auth connection failed ("+health.status+"). Check the publishable key."};
    const supabase=await createClient();
    const {data,error}=await supabase.auth.signInWithPassword({email:email.trim(),password});
    if(error)return {ok:false,error:error.message};
    if(data.user?.app_metadata?.role!=="admin"){await supabase.auth.signOut();return {ok:false,error:"This account does not have admin access."};}
    return {ok:true,error:""};
  }catch(e){console.error("Admin auth connectivity:",e instanceof Error?e.message:"unknown");return {ok:false,error:"Server cannot reach Supabase Auth. Please check the Supabase project URL/configuration."}}
}