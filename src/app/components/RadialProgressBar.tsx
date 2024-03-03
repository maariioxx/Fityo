import { HTMLAttributes } from 'react';

type TCircle = {
  color: string;
  percentage?: number;
};

type TRadialProgressBar = {
  color: string;
  totalCalories: number;
  takenCalories: number;
  className: string;
};

const Circle = ({ color, percentage }: TCircle) => {
  const radius = 70;
  const circ = 2 * Math.PI * radius;
  let strokePercentage = 0;
  if (typeof percentage !== 'undefined') {
    if (percentage > 100) strokePercentage = 0;
    else strokePercentage = ((100 - percentage) * circ) / 100;
  }
  return (
    <circle
      r={radius}
      cx={100}
      cy={100}
      fill="transparent"
      stroke={strokePercentage === circ ? '' : color}
      strokeWidth="2rem"
      strokeDasharray={circ}
      strokeDashoffset={strokePercentage}
      strokeLinecap="round"
    ></circle>
  );
};

export default function RadialProgressBar({
  color,
  totalCalories,
  takenCalories,
  className,
}: TRadialProgressBar) {
  const percentage = (takenCalories / totalCalories) * 100;
  const remainingCalories = totalCalories - takenCalories;
  return (
    <div className={className}>
      <svg width={200} height={200}>
        <g transform="rotate(-90 100 100)">
          <Circle color="#e2e8f0" />
          <Circle color={color} percentage={percentage} />
        </g>
        <text
          fontSize="1.5rem"
          x="50%"
          y="50%"
          dominantBaseline="center"
          textAnchor="middle"
        >
          {Math.abs(remainingCalories)}
        </text>
        <text
          fontSize="0.7rem"
          x="50%"
          y="56%"
          dominantBaseline="center"
          textAnchor="middle"
        >
          {percentage > 100 ? 'extra' : 'remaining'}
        </text>
      </svg>
    </div>
  );
}
