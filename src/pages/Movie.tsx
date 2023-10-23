import SearchField from "../components/SearchField";

export default function Movie() {
  return (
    <div className="flex min-h-screen bg-[#333] flex-col items-center  text-xl">
      <h1 className="py-3">Movie Search Page</h1>
      <SearchField />
    </div>
  );
}