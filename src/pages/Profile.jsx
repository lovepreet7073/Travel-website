import { useState } from "react";
import PageContainer from "../components/layout/PageContainer";
import SectionHeader from "../components/layout/SectionHeader";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import StatCard from "../components/ui/StatCard";
import Reveal from "../components/ui/Reveal";
import { CalendarIcon, CompassIcon, MapPinIcon } from "../components/ui/icons";
import { bookings } from "../data/bookings";
import { currentUser } from "../data/user";

export default function Profile() {
  const [form, setForm] = useState({
    name: currentUser.name,
    email: currentUser.email,
    phone: currentUser.phone,
    homeCity: currentUser.homeCity,
  });
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  function updateField(field) {
    return (event) => setForm((current) => ({ ...current, [field]: event.target.value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSaved(false);
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
    }, 1200);
  }

  return (
    <PageContainer className="flex flex-col gap-8 py-8 sm:py-12">
      <Reveal>
        <SectionHeader
          className="mb-0"
          title="Profile"
          intro="Manage your account details, contact info and preferences."
        />
      </Reveal>

      <Reveal as={Card} delay={1} className="flex flex-col items-center gap-4 p-8 text-center sm:flex-row sm:text-left">
        <img
          src={currentUser.avatar}
          alt={currentUser.name}
          className="size-24 shrink-0 rounded-full object-cover"
        />
        <div className="flex flex-col gap-1">
          <h2 className="text-h3 font-bold text-foreground">{currentUser.name}</h2>
          <p className="text-sm text-body">{currentUser.email}</p>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground sm:justify-start">
            <span className="inline-flex items-center gap-1">
              <CalendarIcon />
              Member since {currentUser.memberSince}
            </span>
            <span className="inline-flex items-center gap-1">
              <MapPinIcon />
              {currentUser.homeCity}
            </span>
          </div>
        </div>
      </Reveal>

      <Reveal delay={2} className="grid gap-4 sm:grid-cols-3">
        <StatCard icon={<CompassIcon />} value={bookings.length} label="Total bookings" />
        <StatCard icon={<CalendarIcon />} value={currentUser.memberSince} label="Member since" />
        <StatCard icon={<MapPinIcon />} value={currentUser.homeCity} label="Home city" />
      </Reveal>

      <Reveal as={Card} delay={3} className="flex flex-col gap-6 p-6 sm:p-8">
        <div className="flex flex-col gap-1">
          <h3 className="text-title font-medium text-foreground">Account details</h3>
          <p className="text-sm text-body">Keep your contact information up to date.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Full name" value={form.name} onChange={updateField("name")} />
            <Input label="Email" type="email" value={form.email} onChange={updateField("email")} />
            <Input label="Phone" type="tel" value={form.phone} onChange={updateField("phone")} />
            <Input label="Home city" value={form.homeCity} onChange={updateField("homeCity")} />
          </div>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={emailNotifications}
              onChange={(event) => setEmailNotifications(event.target.checked)}
              className="size-5 rounded-sm border-border accent-primary"
            />
            <span className="text-sm text-foreground">Email me about trip updates and offers</span>
          </label>

          <div className="flex items-center gap-4">
            <Button type="submit" loading={saving}>
              Save changes
            </Button>
            {saved && <span className="text-sm font-medium text-primary">Changes saved.</span>}
          </div>
        </form>
      </Reveal>
    </PageContainer>
  );
}
