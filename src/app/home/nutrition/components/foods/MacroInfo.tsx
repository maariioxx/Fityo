export default function MacroInfo({
  macro,
  color,
}: {
  macro: number;
  color: string;
}) {
  return (
    <div className="flex items-end gap-1 w-24">
      <span className={`text-6xl ${color}`}>.</span>
      <p>{macro.toFixed(2)}g</p>
    </div>
  );
}
