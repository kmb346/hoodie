import TopNav from "./_components/navBar";

export default function Layout({ children }: { children: React.ReactNode } ) {
  return ( 
    <div>
      <TopNav />
      <div className="container mx-auto pt-8">{ children }</div>
    </div>
  )
}