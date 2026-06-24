export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-gray-100 bg-white/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
        <p className="text-sm text-gray-500">
          © {year}{" "}
          <a
            href="https://www.josephwanyoike.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-500 font-semibold hover:text-indigo-600 transition-colors"
          >
            Joseph Wanyoike Njoroge
          </a>
          . All rights reserved.
        </p>
      </div>
    </footer>
  );
}
