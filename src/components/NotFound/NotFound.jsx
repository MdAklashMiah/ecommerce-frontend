export default function NotFound() {
  return (
    <div
      className="min-h-screen w-full bg-white flex items-center justify-center bg-cover bg-center bg-no-repeat px-6
      bg-[url('/images/notfound.jpg')]"
    >

      <div className="text-center relative z-10">
        <h1 className="text-6xl md:text-7xl font-extrabold mb-4 text-black tracking-wide">
          OOPS!
        </h1>

        <p className="text-xl text-gray-800 mb-2">Page not found.</p>

        <p className="text-gray-600 max-w-md mx-auto mb-8">
          Sorry, we couldn’t find the page you were looking for. We suggest that you return to the home page.
        </p>

        <a
          href="/"
          className="px-10 py-3 bg-black text-white font-semibold tracking-wide hover:bg-gray-800 transition inline-block"
        >
          GO BACK
        </a>
      </div>
    </div>
  );
}
