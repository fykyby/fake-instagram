export default function LogoutWindow(props) {
  return (
    <div
      onClick={(e) => {
        if (e.currentTarget === e.target) props.hideWindow();
      }}
      className="fixed z-10 left-0 top-0 w-full h-full bg-black/40 flex flex-col justify-center items-center"
    >
      <div className="flex flex-col p-3 sm:p-4 gap-3 sm:gap-4 bg-white outline-gray-200 outline outline-1 w-full max-w-[48rem] min-h-[10rem] max-h-[65vh] overflow-y-auto justify-around items-center">
        <h1 className="text-4xl">Log Out?</h1>
        <section className="flex gap-6">
          <button
            onClick={props.logout}
            className="outline-gray-200 outline-1 outline px-2 sm:py-1 font-semibold focus:outline-black w-40 min-h-[3rem]"
          >
            Confirm
          </button>
          <button
            onClick={props.hideWindow}
            className="outline-gray-200 outline-1 outline px-2 sm:py-1 font-semibold focus:outline-black w-40 min-h-[3rem]"
          >
            Cancel
          </button>
        </section>
      </div>
    </div>
  );
}
