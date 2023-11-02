function Favorites() {
  return (
    <div className="flex min-h-screen pt-3 bg-[#3f3f3f] flex-col items-center  text-xl">
      <h1 className="py-3 font-lexendMd font-bold text-[35px] mb-5 flex items-end space-x-1">
        <p className="drop-shadow-[0_3px_3px_rgba(225,225,225,1)]">Favorites</p>
        <div className="rounded-full w-[10px]  h-[10px] bg-[#68a8e9]"></div>
        <div className="rounded-full w-[10px]  h-[10px] bg-[#e9686e]"></div>
        <div className="rounded-full w-[10px]  h-[10px] bg-[#68e9a2]"></div>
      </h1>
    </div>
  )
}

export default Favorites