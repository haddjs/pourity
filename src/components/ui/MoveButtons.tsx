interface Props {
  index: number;
  count: number;
  onMove: (direction: -1 | 1) => void;
  labelUp?: string;
  labelDown?: string;
}

/** A pair of up/down buttons for reordering an item within a list. */
export function MoveButtons({
  index,
  count,
  onMove,
  labelUp = "Move up",
  labelDown = "Move down",
}: Props) {
  return (
    <div className="flex items-center">
      <Btn label={labelUp} disabled={index === 0} onClick={() => onMove(-1)}>
        ↑
      </Btn>
      <Btn
        label={labelDown}
        disabled={index === count - 1}
        onClick={() => onMove(1)}
      >
        ↓
      </Btn>
    </div>
  );
}

function Btn({
  label,
  onClick,
  disabled,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  children: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-sm text-slate transition-colors hover:bg-stone/50 hover:text-midnight disabled:opacity-30 disabled:hover:bg-transparent"
    >
      {children}
    </button>
  );
}
