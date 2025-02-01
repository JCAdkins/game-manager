export const AdminGameModal = () => {
  return;
  <div className="flex w-full justify-evenly">
    <button
      className="px-4 py-1 rounded-lg bg-background/50 border-1 border-background hover:bg-background/70"
      onClick={() => console.log("Editing Genre")}
    >
      Edit{" "}
    </button>
    <button
      className="px-3 py-1 rounded-lg bg-background/50 border-1 border-background hover:bg-background/70"
      onClick={() => setIsOpen(false)}
    >
      Close
    </button>
  </div>;
};
