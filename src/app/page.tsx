import Header from "@/components/Header";
import ListItem from "@/components/ListItem";

export default function Home() {
  return (
    <main className="bg-neutral-900 overflow-hidden rounded-lg h-full w-full">
      <Header>
        <div className="mb-2">
          <h1 className="text-3xl font-semibold text-white ">Welcome back</h1> 
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4">
            <ListItem name="Liked Songs" href="/" image="/liked.png"/>
          </div>
        </div>
      </Header>
      <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-semibold">Newest Songs</h1>
        </div>
        <div>
          List of Songs!
        </div>
      </div>
    </main>
  )
}
