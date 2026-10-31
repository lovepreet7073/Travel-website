import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageContainer from "../components/layout/PageContainer";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import PasswordToggle from "../components/ui/PasswordToggle";
import Reveal from "../components/ui/Reveal";
import { CompassIcon } from "../components/ui/icons";
import { destinations } from "../data/destinations";

const heroDestination = destinations.find((d) => d.slug === "bali-indonesia") ?? destinations[0];

/**
 * SignUp — /signup. Mirrors Login's two-panel card (form left, travel photo
 * with text overlay right) — see COMPONENTS.md "Auth pages, take 2" note.
 * Navbar/Footer still wrap it via RootLayout.
 */
export default function SignUp() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  function validate() {
    const next = {};
    if (!fullName.trim()) {
      next.fullName = "Enter your full name.";
    }
    if (!email.trim()) {
      next.email = "Enter your email address.";
    } else if (!email.includes("@")) {
      next.email = "Enter a valid email address.";
    }
    if (!password) {
      next.password = "Enter a password.";
    } else if (password.length < 8) {
      next.password = "Password must be at least 8 characters.";
    }
    if (!confirmPassword) {
      next.confirmPassword = "Confirm your password.";
    } else if (confirmPassword !== password) {
      next.confirmPassword = "Passwords don't match.";
    }
    if (!agreed) {
      next.agreed = "You need to agree to the terms to continue.";
    }
    return next;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/bookings");
    }, 600);
  }

  return (
    <PageContainer className="py-8 sm:py-16">
      <Reveal className="grid overflow-hidden rounded-xl bg-surface shadow-float lg:grid-cols-2">
        <div className="flex flex-col justify-center gap-6 p-8 sm:p-12">
          <div className="flex flex-col gap-2">
            <h1 className="text-h2 font-extrabold text-foreground">Create an account</h1>
            <p className="text-sm text-muted-foreground">
              Save destinations and manage your bookings in one place.
            </p>
          </div>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
            <Input
              label="Full name"
              type="text"
              autoComplete="name"
              placeholder="Jordan Rivera"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              error={errors.fullName}
              disabled={loading}
            />
            <Input
              label="Email"
              type="email"
              autoComplete="email"
              placeholder="john.doe@gmail.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              error={errors.email}
              disabled={loading}
            />
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="At least 8 characters"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              error={errors.password}
              disabled={loading}
              trailing={
                <PasswordToggle visible={showPassword} onClick={() => setShowPassword((v) => !v)} />
              }
            />
            <Input
              label="Confirm password"
              type={showConfirmPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              error={errors.confirmPassword}
              disabled={loading}
              trailing={
                <PasswordToggle
                  visible={showConfirmPassword}
                  onClick={() => setShowConfirmPassword((v) => !v)}
                />
              }
            />

            <div className="flex flex-col gap-1">
              <label className="flex items-start gap-2 text-sm text-foreground">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(event) => setAgreed(event.target.checked)}
                  className="mt-0.5 size-5 shrink-0 rounded-sm border-border accent-primary"
                />
                I agree to the Terms of Service and Privacy Policy.
              </label>
              {errors.agreed && <p className="text-xs text-danger">{errors.agreed}</p>}
            </div>

            <Button type="submit" variant="primary" loading={loading} className="w-full">
              Sign up
            </Button>
          </form>

          <p className="text-center text-sm text-body">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-primary hover:text-primary-hover">
              Log in
            </Link>
          </p>
        </div>

        <div className="relative hidden lg:block">
          <img
            src={heroDestination.image}
            alt={heroDestination.name}
            className="absolute inset-0 size-full object-cover"
          />
          <div
            className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-foreground/80 to-transparent"
            aria-hidden="true"
          />
          <span className="absolute right-4 top-4 flex size-11 items-center justify-center rounded-full bg-white/90 text-foreground">
            <CompassIcon className="size-5" />
          </span>
          <p className="absolute inset-x-0 bottom-8 px-8 text-h3 text-white">
            Your next adventure <span className="font-extrabold">starts today.</span>
          </p>
        </div>
      </Reveal>
    </PageContainer>
  );
}
