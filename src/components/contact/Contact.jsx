export default function Contact() {
  return (
    <section className="w-full bg-white text-black pt-32">
      {/* Top Title */}
      <h2 className="text-center text-3xl font-bold py-8 tracking-wider">
        CONTACT US
      </h2>

      {/* Map Banner */}
      <div className="w-full h-[350px] relative">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d228.214932565988!2d90.35871164808142!3d23.76737961397143!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1764176521714!5m2!1sen!2sbd"
          width="100%"
          height="100%"
          allowFullScreen="{true}"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />

        {/* Map Markers */}
        <div className="absolute top-[40%] left-[30%]">
          <div className="w-6 h-6 bg-red-600 rounded-full shadow-lg"></div>
        </div>

        <div className="absolute top-[55%] left-[50%]">
          <div className="w-6 h-6 bg-red-600 rounded-full shadow-lg"></div>
        </div>

        <div className="absolute top-[45%] left-[70%]">
          <div className="w-6 h-6 bg-red-600 rounded-full shadow-lg"></div>
        </div>
      </div>

      {/* Stores Section */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* London */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Store in London</h3>
          <p className="opacity-80 leading-relaxed">
            1418 River Drive, Suite 35 Cottonhall, CA 9622 <br />
            United States
          </p>
          <p className="mt-6 opacity-80">sale@qrono.com</p>
          <p className="opacity-80">+1 246-345-0695</p>
        </div>

        {/* Istanbul */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Store in Istanbul</h3>
          <p className="opacity-80 leading-relaxed">
            1418 River Drive, Suite 35 Cottonhall, CA 9622 <br />
            United States
          </p>
          <p className="mt-6 opacity-80">sale@qrono.com</p>
          <p className="opacity-80">+1 246-345-0695</p>
        </div>
      </div>

      {/* Contact Form */}
      <div className="max-w-3xl mx-auto px-6 pb-20">
        <h3 className="text-xl font-semibold mb-6">Get In Touch</h3>

        <form className="space-y-6">
          <div>
            <label className="block mb-1 opacity-80">Name *</label>
            <input
              type="text"
              className="w-full px-4 py-3 bg-white border border-gray-300 focus:border-black outline-none"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block mb-1 opacity-80">Email address *</label>
            <input
              type="email"
              className="w-full px-4 py-3 bg-white border border-gray-300 focus:border-black outline-none"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block mb-1 opacity-80">Your Review</label>
            <textarea
              rows="5"
              className="w-full px-4 py-3 bg-white border border-gray-300 focus:border-black outline-none"
              placeholder="Write your message..."
            />
          </div>

          <button className="mt-4 w-40 py-3 bg-black text-white font-semibold tracking-wider hover:bg-gray-800 transition">
            SUBMIT
          </button>
        </form>
      </div>
    </section>
  );
}
