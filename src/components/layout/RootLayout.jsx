import { Outlet, Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Button from "../ui/Button";
import { navLinks, footerColumns, footerSocialLinks } from "../../data/nav";

const logo = (
  <>
    <span className="size-3 rounded-full bg-accent" aria-hidden="true" />
    <span className="font-extrabold">Vendra</span>
  </>
);

/**
 * RootLayout — the shared shell every route renders inside: Navbar, the
 * routed page via <Outlet/>, and Footer. Individual pages only return
 * their own content, never Navbar/Footer, so every page stays consistent.
 */
export default function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar
        logo={logo}
        links={navLinks}
        actions={
          <>
            <Button as={Link} to="/login" variant="outline">
              Log in
            </Button>
            <Button as={Link} to="/signup" variant="primary">
              Sign up
            </Button>
          </>
        }
      />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer
        logo={logo}
        tagline="Plan less, explore more."
        columns={footerColumns}
        socialLinks={footerSocialLinks}
        copyright={`© ${new Date().getFullYear()} Vendra. All rights reserved.`}
      />
    </div>
  );
}
