export default function Login(props) {
  return (
    <div className="min-h-screen flex flex-col justify-start items-center">
      <header className="w-full text-center min-h-[13vh]">
        <h1 className="font-grand-hotel text-5xl select-none py-6">
          Fake-Instagram
        </h1>
      </header>
      <main className="w-full min-h-[75vh] flex flex-col justify-center items-center gap-6">
        <h1 className="text-4xl">Log in to continue</h1>
        <button
          onClick={props.login}
          className="border border-1 border-gray-200 p-2 px-4 cursor-pointer"
        >
          Log in with Google
        </button>
      </main>
    </div>
  );
}
