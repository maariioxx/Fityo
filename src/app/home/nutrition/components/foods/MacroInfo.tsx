export default function MacroInfo({
  macro,
  color,
  unit = 'g',
  decimals = true,
}: {
  macro: number;
  color: string;
  unit?: string;
  decimals?: boolean;
}) {
  return (
    <div className="flex items-end gap-1 w-24">
      <span className={`text-6xl ${color}`}>.</span>
      <p>
        {decimals ? macro.toFixed(2) : macro}
        {unit}
      </p>
    </div>
  );
}
