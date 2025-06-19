import NewsList from "@/components/NewsList";

function App() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">React + Sanity</h1>
      <NewsList />
    </main>
  );
}

export default App;
