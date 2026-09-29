import { createClient } from "@/lib/supabase/server";

type Product={id:string;name:string;slug:string;price:number;compare_at_price:number|null;short_description:string|null;product_images?:{storage_path:string;is_primary:boolean}[]};

export default async function HomePage(){
  const supabase=await createClient();
  const {data:settings}=await supabase.from("site_settings").select("*").limit(1).maybeSingle();
  const {data:products}=await supabase.from("products").select("id,name,slug,price,compare_at_price,short_description,product_images(storage_path,is_primary)").eq("active",true).order("featured",{ascending:false}).order("created_at",{ascending:false}).limit(12);
  const siteName=settings?.site_name ?? "Sekhon Studio";
  return <main>
    <header className="header"><div className="container header-inner">
      <a className="brand" href="/">{siteName}</a>
      <nav className="nav"><a href="/shop">Shop</a><a href="/categories">Categories</a><a href="/custom">Custom 3D</a></nav>
      <div className="actions"><button className="icon-btn">Search</button><button className="icon-btn">♡</button><button className="icon-btn">Cart</button></div>
    </div></header>
    <section className="hero"><div className="container"><p className="muted">SEKHON STUDIO</p><h1>3D printed objects, made to feel personal.</h1><p>Explore ready-to-buy designs and custom 3D printed creations. Built for desks, homes, gifts and everything in between.</p></div></section>
    <section className="section"><div className="container"><div className="section-head"><h2>Featured products</h2><a href="/shop">View all →</a></div>
      <div className="grid">{(products??[]).map((p:Product)=><a className="card" href={"/product/"+p.slug} key={p.id}><div className="thumb">Product image</div><div className="card-body"><strong>{p.name}</strong><div className="price">₹{Number(p.price).toLocaleString("en-IN")}</div>{p.short_description&&<p className="muted">{p.short_description}</p>}</div></a>)}</div>
      {(products??[]).length===0&&<p className="muted">Products will appear here once they are added from the Sekhon Studio business system.</p>}
    </div></section>
  </main>;
}