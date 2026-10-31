import { useId, useState } from "react";
import PageContainer from "../components/layout/PageContainer";
import SectionHeader from "../components/layout/SectionHeader";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { cn } from "../components/ui/cn";
import { ChevronDownIcon, HeadsetIcon, ClockIcon, MapPinIcon } from "../components/ui/icons";
import Reveal from "../components/ui/Reveal";
import { faqs } from "../data/faqs";

/**
 * Styled to visually match ui/Input.jsx (same border/radius/surface/focus
 * treatment) since there's no shared Textarea component yet — DESIGN.md's
 * Input spec is single-line only. Kept as page-local markup, not a new
 * shared component (per the fallback agreed for the Contact page).
 */
function FormTextarea({ label, error, id, className, ...props }) {
  const autoId = useId();
  const fieldId = id ?? autoId;

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={fieldId} className="text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      <textarea
        id={fieldId}
        rows={5}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={error ? `${fieldId}-error` : undefined}
        className={cn(
          "w-full rounded-md border bg-surface px-4 py-3 text-body text-foreground placeholder:text-muted-foreground",
          "transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          error ? "border-danger" : "border-border focus:border-primary",
          className
        )}
        {...props}
      />
      {error && (
        <p id={`${fieldId}-error`} className="text-xs text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

/**
 * Minimal local expand/collapse per FAQ item (no shared Accordion component
 * exists yet). Kept as page-local markup per the fallback agreed for the
 * Contact page's FAQ section.
 */
function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <Card as="div" className="p-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={cn(
          "flex w-full items-center justify-between gap-4 p-6 text-left",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        )}
      >
        <span className="text-title font-medium text-foreground">{question}</span>
        <ChevronDownIcon
          className={cn("size-4 shrink-0 text-muted-foreground transition-transform", open && "rotate-180")}
        />
      </button>
      {open && <p className="px-6 pb-6 text-body text-body">{answer}</p>}
    </Card>
  );
}

/**
 * Contact — /contact. A contact form (Input name/email, styled textarea for
 * message, primary submit Button with a simulated loading/success flow),
 * an "other ways to reach us" block, and an FAQ section from
 * src/data/faqs.js.
 */
export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function validate() {
    const next = {};
    if (!form.name.trim()) next.name = "Enter your name.";
    if (!form.email.trim()) {
      next.email = "Enter your email address.";
    } else if (!form.email.includes("@")) {
      next.email = "Enter a valid email address.";
    }
    if (!form.message.trim()) next.message = "Tell us a little about your trip.";
    return next;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    }, 800);
  }

  return (
    <div className="flex flex-col gap-16 pb-16 sm:gap-24 sm:pb-24">
      {/* Header + form */}
      <PageContainer className="pt-8 sm:pt-12">
        <Reveal>
          <SectionHeader
            className="mb-0"
            title="Get in touch"
            intro="Questions about a booking, a destination, or just want to say hello? We'd love to hear from you."
          />
        </Reveal>
        <div className="mt-12 grid items-start gap-12 lg:grid-cols-2">
          <Reveal delay={1}>
            <Card as="section">
              {status === "success" ? (
                <div className="flex flex-col items-start gap-2 p-2">
                  <h2 className="text-title font-medium text-foreground">Message sent</h2>
                  <p className="text-body text-body">
                    Thanks for reaching out — a real person will reply within one business day.
                  </p>
                  <Button type="button" variant="outline" onClick={() => setStatus("idle")} className="mt-4">
                    Send another message
                  </Button>
                </div>
              ) : (
                <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
                  <Input
                    label="Name"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={(event) => updateField("name", event.target.value)}
                    error={errors.name}
                    disabled={status === "loading"}
                  />
                  <Input
                    label="Email"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(event) => updateField("email", event.target.value)}
                    error={errors.email}
                    disabled={status === "loading"}
                  />
                  <FormTextarea
                    label="Message"
                    placeholder="Tell us about your trip or your question"
                    value={form.message}
                    onChange={(event) => updateField("message", event.target.value)}
                    error={errors.message}
                    disabled={status === "loading"}
                  />
                  <Button type="submit" variant="primary" loading={status === "loading"} className="w-full">
                    Send message
                  </Button>
                </form>
              )}
            </Card>
          </Reveal>

          <Reveal delay={2} className="flex flex-col gap-6">
            <Card as="section" className="flex flex-col gap-6">
              <h2 className="text-title font-medium text-foreground">Other ways to reach us</h2>
              <div className="flex items-start gap-4">
                <span className="flex size-6 items-center justify-center text-primary">
                  <HeadsetIcon />
                </span>
                <div>
                  <p className="text-sm font-medium text-foreground">Email support</p>
                  <p className="text-sm text-body">hello@wandera.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="flex size-6 items-center justify-center text-primary">
                  <ClockIcon />
                </span>
                <div>
                  <p className="text-sm font-medium text-foreground">Support hours</p>
                  <p className="text-sm text-body">24/7 for travelers with an active booking</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="flex size-6 items-center justify-center text-primary">
                  <MapPinIcon />
                </span>
                <div>
                  <p className="text-sm font-medium text-foreground">Headquarters</p>
                  <p className="text-sm text-body">Lisbon, Portugal — remote team worldwide</p>
                </div>
              </div>
            </Card>
          </Reveal>
        </div>
      </PageContainer>

      {/* FAQ */}
      <PageContainer>
        <Reveal>
          <SectionHeader
            className="mb-0"
            title="Frequently asked questions"
            intro="The things travelers ask us most before and during a trip."
          />
        </Reveal>
        <div className="mt-12 flex flex-col gap-4">
          {faqs.map((faq, index) => (
            <Reveal key={faq.question} delay={index}>
              <FaqItem question={faq.question} answer={faq.answer} />
            </Reveal>
          ))}
        </div>
      </PageContainer>
    </div>
  );
}
