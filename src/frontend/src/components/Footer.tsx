import { ExternalLink, Instagram, Linkedin, Mail, Phone } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Programs", href: "#programs" },
  { label: "Curriculum", href: "#curriculum" },
  { label: "Pricing", href: "#pricing" },
  { label: "BPO Services", href: "#bpo" },
  { label: "IT & AI Solutions", href: "#ai-solutions" },
  { label: "Student Projects", href: "#projects" },
  { label: "Verify Certificate", href: "#verify" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#1C1B1A] text-[#C8B8B4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center mb-4">
              <img
                src="/assets/uploads/image-2-1.png"
                alt="RiseUp Solutions"
                className="h-10 w-auto object-contain brightness-0 invert"
              />
            </div>
            <p className="text-[#8A7E7C] text-sm leading-relaxed mb-4">
              Empowering careers and businesses through AI education, BPO
              excellence, and cutting-edge IT solutions.
            </p>
            <div className="flex flex-col gap-2 text-sm mb-5">
              <a
                href="mailto:riseupsolutions@zohomail.in"
                className="flex items-center gap-2 text-[#8A7E7C] hover:text-white transition-colors"
                data-ocid="footer.link"
              >
                <Mail className="w-4 h-4" />
                riseupsolutions@zohomail.in
              </a>
              <a
                href="tel:+919988769850"
                className="flex items-center gap-2 text-[#8A7E7C] hover:text-white transition-colors"
                data-ocid="footer.link"
              >
                <Phone className="w-4 h-4" />
                +91 9988769850
              </a>
            </div>
            {/* Social Links */}
            <div className="flex flex-col gap-2 text-sm">
              <a
                href="https://www.instagram.com/riseupsolutions_edu/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#8A7E7C] hover:text-white transition-colors"
                data-ocid="footer.link"
              >
                <Instagram className="w-4 h-4" />
                riseupsolutions_edu
              </a>
              <a
                href="https://www.linkedin.com/company/riseup-solutions-edu"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#8A7E7C] hover:text-white transition-colors"
                data-ocid="footer.link"
              >
                <Linkedin className="w-4 h-4" />
                RiseUp Solutions
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-700 text-white text-sm uppercase tracking-wide mb-5">
              Navigation
            </h4>
            <ul className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    data-ocid="footer.link"
                    className="text-sm text-[#8A7E7C] hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Student Portal */}
          <div>
            <h4 className="font-700 text-white text-sm uppercase tracking-wide mb-5">
              Students
            </h4>
            <div className="bg-[#C04B62]/20 rounded-2xl p-6 mb-6">
              <p className="text-sm text-[#C8B8B4] mb-3">
                Access your learning materials, track progress, and download
                your certificate.
              </p>
              <a
                href="http://dashboard.riseupsolutions.com"
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="footer.link"
                className="inline-flex items-center gap-2 text-sm text-white font-600 hover:text-[#E87272] transition-colors"
              >
                Student Portal
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
            <div className="bg-[#C04B62]/20 rounded-2xl p-5">
              <p className="text-xs text-[#8A7E7C] uppercase tracking-wide mb-2">
                Free Demo Class
              </p>
              <p className="text-sm text-white font-500">April 5, 2026</p>
              <p className="text-sm text-[#C8B8B4]">11:00 AM IST</p>
            </div>
          </div>
        </div>

        <div className="border-t border-[#C04B62]/20 pt-8 flex items-center justify-center text-xs text-[#8A7E7C]">
          <p>© {year} RiseUp Solutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
