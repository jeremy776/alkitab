export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 pt-16 pb-10 px-6">
      <div className="max-w-7xl mx-auto grid-cols-2 grid lg:grid-cols-5 gap-12">
        <div className="col-span-2">
          <h2 className="text-xl font-bold text-gray-900 mb-2">SelaVibes</h2>
          <p className="text-gray-600 text-sm mb-6">
            Teman digital buat hati yang lagi butuh dikuatin. Dari ayat sampai
            lagu rohani, semua ada di sini 🌿
          </p>
        </div>

        {/* Sitemap */}
        <div>
          <h4 className="text-gray-800 font-semibold mb-4 text-sm">
            Product
          </h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <button className="hover:text-indigo-600">Features</button>
            </li>
            <li>
              <button className="hover:text-indigo-600">Templates</button>
            </li>
            <li>
              <button className="hover:text-indigo-600">Integrations</button>
            </li>
            <li>
              <button className="hover:text-indigo-600">Pricing</button>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-gray-800 font-semibold mb-4 text-sm">
            Company
          </h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <button className="hover:text-indigo-600">About</button>
            </li>
            <li>
              <button className="hover:text-indigo-600">Careers</button>
            </li>
            <li>
              <button className="hover:text-indigo-600">Team</button>
            </li>
            <li>
              <button className="hover:text-indigo-600">Contact</button>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-gray-800 font-semibold mb-4 text-sm">
            Resources
          </h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <button className="hover:text-indigo-600">Blog</button>
            </li>
            <li>
              <button className="hover:text-indigo-600">Docs</button>
            </li>
            <li>
              <button className="hover:text-indigo-600">Community</button>
            </li>
            <li>
              <button className="hover:text-indigo-600">Support</button>
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100 mt-12 pt-6 text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center gap-4">
        <p>&copy; 2025 LazyPeople Org. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <button className="hover:text-indigo-600">Privacy Policy</button>
          <button className="hover:text-indigo-600">Terms of Service</button>
        </div>
      </div>
    </footer>
  );
}