export default function Login(props) {
  return (
    <div>
      <main className="min-h-screen flex gap-6 flex-col justify-center items-center">
        <h1 className="font-grand-hotel text-5xl select-none fixed top-0 py-6">
          Fake-Instagram
        </h1>
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
