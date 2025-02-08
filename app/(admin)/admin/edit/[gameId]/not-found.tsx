export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="flex flex-row text-2xl font-bold">
        <p className="py-1">404</p>
        <div className="w-[4px] h-full border bg-gray-500 mx-3" />
        <p className="py-1">Game Not Found</p>
      </h1>
      <p className="text-muted-foreground">
        The game you are looking for does not exist.
      </p>
    </div>
  );
}
