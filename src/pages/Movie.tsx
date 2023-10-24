import SearchField from "../components/SearchField";

export default function Movie() {
  return (
    <div className="flex min-h-screen bg-[#3f3f3f] flex-col items-center  text-xl">
      <h1 className="py-3 text-[30px]">FlickList</h1>
      <SearchField />
    </div>
  );
}