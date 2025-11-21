import Container from "./Container";

export default function Footer() {
  return (
    <footer className="bg-secondary text-white pt-10">
      <Container>
        {/* Top Icons Row */}
        <div className="border-b border-gray-500 pb-8">
          <div className="flex justify-evenly text-center">
            <div className="flex items-center space-x-2.5">
              <img className="invert" src="/images/footer/shipping.png" alt="" />
              <div>
                <h4 className="font-semibold tracking-wide">
                  FAST AND FREE DELIVERY
                </h4>
                <p className="text-sm text-gray-200">
                  Free delivery for all orders over $140
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2.5">
              <img className="invert" src="/images/footer/headphone.png" alt="" />
              <div>
                <h4 className="font-semibold tracking-wide">
                  24/7 CUSTOMER SUPPORT
                </h4>
                <p className="text-sm text-gray-200">
                  Friendly 24/7 customer support
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2.5">
              <img className="invert" src="/images/footer/shield.png" alt="" />
              <div>
                <h4 className="font-semibold tracking-wide">
                  MONEY BACK GUARANTEE
                </h4>
                <p className="text-sm text-gray-200">
                  We return money within 30 days
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer */}
        <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo + Contact */}
          <div>
            <img src="images/logo.png" alt="Uomo" className="h-6 mb-5" />
            <p className="text-sm leading-relaxed text-gray-200">
              1418 River Drive, Suite 35 Cottonhall, CA 9622 <br />
              United States
            </p>
            <p className="mt-4 text-sm text-gray-200">sale@uomo.com</p>
            <p className="text-sm text-gray-200">+1 246-345-0695</p>

            {/* Social Icons */}
            <div className="flex space-x-4 mt-5 text-gray-200">
              <i className="fab fa-facebook-f"></i>
              <i className="fab fa-twitter"></i>
              <i className="fab fa-instagram"></i>
              <i className="fab fa-youtube"></i>
              <i className="fab fa-pinterest"></i>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold mb-4">COMPANY</h4>
            <ul className="space-y-2 text-sm text-gray-200">
              <li>About Us</li>
              <li className="font-medium underline">Careers</li>
              <li>Affiliates</li>
              <li>Blog</li>
              <li>Contact Us</li>
            </ul>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-semibold mb-4">SHOP</h4>
            <ul className="space-y-2 text-sm text-gray-200">
              <li>New Arrivals</li>
              <li>Accessories</li>
              <li>Men</li>
              <li>Women</li>
              <li>Shop All</li>
            </ul>
          </div>

          {/* Subscribe */}
          <div>
            <h4 className="font-semibold mb-4">SUBSCRIBE</h4>
            <p className="text-sm text-gray-200 mb-4">
              Be the first to get the latest news about trends, promotions, and
              much more!
            </p>

            <div className="flex border border-gray-500">
              <input
                type="text"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 text-sm bg-transparent text-white placeholder-gray-300 outline-none"
              />
              <button className="px-6 bg-white text-black text-sm font-semibold">
                JOIN
              </button>
            </div>

            <p className="text-sm mt-5 mb-2 font-medium text-gray-200">
              Secure payments
            </p>

            <div className="flex space-x-4 mt-2">
              <img src="/images/payment/discover.png" className="h-5" />
              <img src="/images/payment/mastercard.png" className="h-5" />
              <img src="/images/payment/PayPal.png" className="h-5" />
              <img src="/images/payment/Stripe.png" className="h-5" />
              <img src="/images/payment/visa.png" className="h-5" />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-500 py-5 text-center text-sm text-gray-200">
          ©2020 Uomo
          <div className="mt-2 flex justify-center space-x-6 text-gray-200">
            <span>Language United Kingdom | English</span>
            <span>Currency $ USD</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
