import type { LetterConfig, LetterData } from "./types";
import { TextField, TextArea } from "../../components/ui/Field";
import { Button } from "../../components/ui/Button";
import { FormSection } from "../cv/FormSection";

interface Props {
  data: LetterData;
  config: LetterConfig;
  onChange: (next: LetterData) => void;
  onFillFromCv: () => void;
}

export function LetterForm({ data, config, onChange, onFillFromCv }: Props) {
  const set = <K extends keyof LetterData>(key: K, v: LetterData[K]) =>
    onChange({ ...data, [key]: v });

  return (
    <div className="divide-y divide-stone">
      <FormSection
        title="Your Details"
        action={
          <Button variant="ghost" size="sm" onClick={onFillFromCv}>
            Fill from CV
          </Button>
        }
      >
        <TextField
          label="Full name"
          value={data.senderName}
          placeholder="Alexandra Chen"
          onChange={(e) => set("senderName", e.target.value)}
        />
        <div className="grid grid-cols-2 gap-3">
          <TextField
            label="Email"
            type="email"
            value={data.senderEmail}
            placeholder="you@email.com"
            onChange={(e) => set("senderEmail", e.target.value)}
          />
          <TextField
            label="Phone"
            value={data.senderPhone}
            placeholder="(415) 555-0142"
            onChange={(e) => set("senderPhone", e.target.value)}
          />
        </div>
        <TextField
          label="Location"
          value={data.senderLocation}
          placeholder="City, Country"
          onChange={(e) => set("senderLocation", e.target.value)}
        />
      </FormSection>

      <FormSection title="Recipient">
        <TextField
          label="Recipient name"
          value={data.recipientName}
          placeholder={config.recipientPlaceholder}
          hint="Leave blank to keep a general greeting."
          onChange={(e) => set("recipientName", e.target.value)}
        />
        <TextField
          label="Recipient title"
          value={data.recipientTitle}
          placeholder={config.recipientPlaceholder}
          onChange={(e) => set("recipientTitle", e.target.value)}
        />
        <TextField
          label={config.orgLabel}
          value={data.organization}
          placeholder={config.orgPlaceholder}
          onChange={(e) => set("organization", e.target.value)}
        />
        <TextField
          label={`${config.orgLabel} location`}
          value={data.organizationLocation}
          placeholder="City, Country"
          onChange={(e) => set("organizationLocation", e.target.value)}
        />
      </FormSection>

      <FormSection title="Letter Details">
        <TextField
          label={config.roleLabel}
          value={data.role}
          placeholder={config.rolePlaceholder}
          hint="Used for the subject line."
          onChange={(e) => set("role", e.target.value)}
        />
        <TextField
          label="Date"
          type="date"
          value={data.date}
          onChange={(e) => set("date", e.target.value)}
        />
      </FormSection>

      <FormSection title="Content">
        <TextField
          label="Greeting"
          value={data.greeting}
          placeholder={config.defaultGreeting}
          onChange={(e) => set("greeting", e.target.value)}
        />
        <TextArea
          label="Body"
          rows={14}
          value={data.body}
          hint="Separate paragraphs with a blank line. Replace the [bracketed] prompts with your own words."
          onChange={(e) => set("body", e.target.value)}
        />
        <TextField
          label="Sign-off"
          value={data.signOff}
          placeholder={config.defaultSignOff}
          onChange={(e) => set("signOff", e.target.value)}
        />
      </FormSection>
    </div>
  );
}
