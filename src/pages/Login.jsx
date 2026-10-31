import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageContainer from "../components/layout/PageContainer";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import PasswordToggle from "../components/ui/PasswordToggle";
import Reveal from "../components/ui/Reveal";
import { PlaneIcon } from "../components/ui/icons";
import { destinations } from "../data/destinations";

const heroDestination = destinations.find((d) => d.slug === "santorini-greece") ?? destinations[0];

/**
 * Login — /login. Two-panel card: form left, a travel photo with a text
 * overlay right (see COMPONENTS.md "Auth pages, take 2" note). No extra
 * decorative background wrapper — the photo itself is the travel element.
 * Navbar/Footer still wrap it via RootLayout.
 */
export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [resetRequested, setResetRequested] = useState(false);

  function validate() {
    const next = {};
    if (!email.trim()) {
      next.email = "Enter your email address.";
    } else if (!email.includes("@")) {
      next.email = "Enter a valid email address.";
    }
    if (!password) {
      next.password = "Enter your password.";
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
            <h1 className="text-h2 font-extrabold text-foreground">Login</h1>
            <p className="text-sm text-muted-foreground">Sign in to pick up where you left off.</p>
          </div>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
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
              autoComplete="current-password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              error={errors.password}
              disabled={loading}
              trailing={
                <PasswordToggle visible={showPassword} onClick={() => setShowPassword((v) => !v)} />
              }
            />

            <div className="flex items-center justify-between gap-4">
              <label className="flex items-center gap-2 text-sm text-foreground">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(event) => setRemember(event.target.checked)}
                  className="size-5 rounded-sm border-border accent-primary"
                />
                Remember me
              </label>
              <button
                type="button"
                onClick={() => setResetRequested(true)}
                className="text-sm font-medium text-primary hover:text-primary-hover"
              >
                Forgot password?
              </button>
            </div>

            {resetRequested && (
              <p className="text-xs text-muted-foreground">
                If an account matches that email, we've sent a reset link.
              </p>
            )}

            <Button type="submit" variant="primary" loading={loading} className="w-full">
              Login
            </Button>
          </form>

          <p className="text-center text-sm text-body">
            Don't have an account?{" "}
            <Link to="/signup" className="font-medium text-primary hover:text-primary-hover">
              Sign up
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
            <PlaneIcon className="size-5" />
          </span>
          <p className="absolute inset-x-0 bottom-8 px-8 text-h3 text-white">
            Pack your bags, <span className="font-extrabold">we'll handle the rest.</span>
          </p>
        </div>
      </Reveal>
    </PageContainer>
  );
}
