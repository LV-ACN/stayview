export function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-400 py-12">
      <div className="container-page">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-white font-heading text-lg mb-4">StayView Hotel</h3>
            <p className="text-sm leading-relaxed">
              1200 Waterfront Boulevard<br />
              Marina District, CA 94123<br />
              United States
            </p>
          </div>
          <div>
            <h3 className="text-white font-heading text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/rooms" className="hover:text-white transition-colors">Our Rooms</a></li>
              <li><a href="/booking" className="hover:text-white transition-colors">Reservations</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Dining</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Loyalty Program</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-heading text-lg mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>Phone: +1 (555) 234-5678</li>
              <li>Email: reservations@stayview.example.com</li>
              <li>Concierge: Available 24/7</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-neutral-800 pt-8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} StayView Hotel & Resort. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
