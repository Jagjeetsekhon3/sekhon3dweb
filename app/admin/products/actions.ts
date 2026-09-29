"use server";
import {redirect} from "next/navigation";
import {requireAdmin} from "@/lib/auth/admin";
import {createAdminClient} from "@/lib/supabase/server";

function slugify(v:string){return v.toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}
function rows(v:FormDataEntryValue|null){return String(v||"").split("\n").map(x=>x.trim()).filter(Boolean)}

export async function createProduct(formData:FormData){
  const user=await requireAdmin(); if(!user) redirect("/admin/login");
  const db=createAdminClient();
  const name=String(formData.get("name")||"").trim();
  if(!name) redirect("/admin/products/new?error=Product%20name%20is%20required");
  const slug=slugify(String(formData.get("slug")||name));
  const payload={
    name,slug,sku:String(formData.get("sku")||"").trim()||null,
    short_description:String(formData.get("short_description")||"").trim()||null,
    description:String(formData.get("description")||"").trim()||null,
    product_type:String(formData.get("product_type")||"standard"),
    price:Number(formData.get("price")||0),compare_at_price:formData.get("compare_at_price")?Number(formData.get("compare_at_price")):null,
    cost_price:formData.get("cost_price")?Number(formData.get("cost_price")):null,
    stock_qty:Number(formData.get("stock_qty")||0),low_stock_threshold:Number(formData.get("low_stock_threshold")||5),
    thumbnail_ratio:String(formData.get("thumbnail_ratio")||"4:3"),
    active:formData.get("active")==="on",featured:formData.get("featured")==="on"
  };
  const {data:product,error}=await db.from("products").insert(payload).select("id").single();
  if(error) redirect("/admin/products/new?error="+encodeURIComponent(error.message));

  const categoryId=String(formData.get("category_id")||"");
  if(categoryId) await db.from("product_categories").insert({product_id:product.id,category_id:categoryId});

  const variantLines=rows(formData.get("variants"));
  if(variantLines.length){
    const variants=variantLines.map(line=>{const [name,sku,price,stock,color,size]=line.split("|").map(x=>x?.trim());return {product_id:product.id,name:name||null,sku:sku||null,price:price?Number(price):null,stock_qty:stock?Number(stock):0,option_values:{color:color||null,size:size||null}}});
    const {error:e}=await db.from("product_variants").insert(variants); if(e) redirect("/admin/products/"+product.id+"/edit?error="+encodeURIComponent(e.message));
  }

  const customLines=rows(formData.get("custom_fields"));
  if(customLines.length){
    const fields=customLines.map((line,i)=>{const [label,type,required,options]=line.split("|").map(x=>x?.trim());return {product_id:product.id,label,field_key:slugify(label).replace(/-/g,"_"),field_type:type||"text",required:(required||"").toLowerCase()==="yes",options:options?options.split(",").map(x=>x.trim()).filter(Boolean):[],sort_order:i}});
    const {error:e}=await db.from("custom_input_fields").insert(fields); if(e) redirect("/admin/products/"+product.id+"/edit?error="+encodeURIComponent(e.message));
  }
  redirect("/admin/products?created=1");
}

export async function updateProduct(id:string,formData:FormData){
  const user=await requireAdmin(); if(!user) redirect("/admin/login");
  const db=createAdminClient(); const name=String(formData.get("name")||"").trim();
  const {error}=await db.from("products").update({name,slug:slugify(String(formData.get("slug")||name)),sku:String(formData.get("sku")||"").trim()||null,short_description:String(formData.get("short_description")||"").trim()||null,description:String(formData.get("description")||"").trim()||null,product_type:String(formData.get("product_type")||"standard"),price:Number(formData.get("price")||0),compare_at_price:formData.get("compare_at_price")?Number(formData.get("compare_at_price")):null,cost_price:formData.get("cost_price")?Number(formData.get("cost_price")):null,stock_qty:Number(formData.get("stock_qty")||0),low_stock_threshold:Number(formData.get("low_stock_threshold")||5),thumbnail_ratio:String(formData.get("thumbnail_ratio")||"4:3"),active:formData.get("active")==="on",featured:formData.get("featured")==="on",updated_at:new Date().toISOString()}).eq("id",id);
  if(error) redirect("/admin/products/"+id+"/edit?error="+encodeURIComponent(error.message));
  redirect("/admin/products?updated=1");
}