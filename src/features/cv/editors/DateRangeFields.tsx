import { TextField } from "../../../components/ui/Field";

interface Props {
  startDate: string;
  endDate: string;
  current: boolean;
  currentLabel: string;
  onChange: (patch: {
    startDate?: string;
    endDate?: string;
    current?: boolean;
  }) => void;
}

/**
 * Start / End month pickers plus a "current" toggle, shared by the Experience
 * and Education editors.
 *
 * Guards against inverted ranges two ways: the pickers cap each other via
 * min/max, and a visible warning shows if the stored data is still inverted
 * (e.g. typed in directly). "YYYY-MM" is zero-padded, so a plain string
 * comparison orders the months chronologically.
 */
export function DateRangeFields({
  startDate,
  endDate,
  current,
  currentLabel,
  onChange,
}: Props) {
  const inverted = !current && !!startDate && !!endDate && endDate < startDate;

  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-2 gap-3">
        <TextField
          label="Start"
          type="month"
          value={startDate}
          max={!current && endDate ? endDate : undefined}
          onChange={(e) => onChange({ startDate: e.target.value })}
        />
        <TextField
          label="End"
          type="month"
          value={endDate}
          min={startDate || undefined}
          disabled={current}
          onChange={(e) => onChange({ endDate: e.target.value })}
        />
      </div>

      {inverted && (
        <p className="text-xs text-ember">
          End date is before the start date.
        </p>
      )}

      <label className="flex items-center gap-2 text-sm text-midnight">
        <input
          type="checkbox"
          checked={current}
          onChange={(e) =>
            onChange({
              current: e.target.checked,
              endDate: e.target.checked ? "" : endDate,
            })
          }
          className="accent-navy"
        />
        {currentLabel}
      </label>
    </div>
  );
}
