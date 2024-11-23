import React from 'react';

/**
 * Represents a single segment in the PieChart.
 * @typedef {Object} Segment
 * @property {string} color - The color of the segment.
 * @property {number} percentage - The percentage value of the segment (0-100).
 * @property {string} label - The label used for the legend corresponding to the segment.
 */
type Segment = {
  color: string;
  percentage: number;
  label: string;
};

/**
 * Props for the PieChart component.
 * @typedef {Object} PieChartProps
 * @property {Segment[]} segments - An array of segment objects defining the chart segments.
 * @property {number} [size=200] - The size of the chart in pixels. Defaults to 200.
 * @property {number} [gapSize=3] - The gap size between segments in degrees. Defaults to 3.
 * @property {number} [strokeWidth=3.2] - The width of the stroke for each segment. Defaults to 3.2.
 */
interface PieChartProps {
  segments: Segment[];
  chartTitle:string;
  size?: number;
  gapSize?: number;
  strokeWidth?: number;
}

/**
 * A functional component that renders a customizable PieChart using SVG.
 *
 * @component
 * @param {PieChartProps} props - The properties for the PieChart component.
 * @returns {JSX.Element} The rendered PieChart component.
 */
const PieChart: React.FC<PieChartProps> = ({
  segments,
  chartTitle,
  size = 200, // Default size of the pie chart
  gapSize = 3, // Default gap size between segments
  strokeWidth = 3.2, // Default width of each segment stroke
}) => {
  // Constants for SVG circle
  const radius = 15.91549431; // Radius for the circle (half of viewBox size - stroke width)
  const circumference = 2 * Math.PI * radius; // Circumference of the circle

  // Adjusted percentage calculation to account for gaps
  const totalPercentage = segments.reduce((acc, seg) => acc + seg.percentage, 0);
  const adjustedCircumference = circumference - gapSize * segments.length; // Adjust circumference for gaps

  /**
   * Calculates the stroke-dasharray for a given percentage.
   * @param {number} percentage - The percentage of the segment.
   * @returns {string} The calculated stroke-dasharray value.
   */
  const calculateStrokeDasharray = (percentage: number) => {
    const filled = (percentage / totalPercentage) * adjustedCircumference;
    const empty = circumference - filled;
    return `${filled} ${empty}`;
  };

  /**
   * Calculates the stroke-dashoffset for a given segment index.
   * @param {number} index - The index of the segment.
   * @returns {number} The calculated stroke-dashoffset value.
   */
  const calculateOffset = (index: number) => {
    const previousPercentages = segments.slice(0, index).reduce((acc, seg) => acc + seg.percentage, 0);
    return ((previousPercentages / totalPercentage) * adjustedCircumference) + (index * gapSize);
  };

  return (
    <div className="flex flex-col  items-center">
      {/* SVG Pie Chart */}
      <h1 className='text-3xl mb-12 text-center'>{chartTitle}</h1>
      <svg width={size} height={size} viewBox="0 0 36 36" className="pie-chart">
        {segments.map((segment, index) => (
          <circle
            key={index}
            cx="18"
            cy="18"
            r={radius}
            fill="transparent"
            stroke={segment.color}
            strokeWidth={strokeWidth}
            strokeDasharray={calculateStrokeDasharray(segment.percentage)}
            strokeDashoffset={-calculateOffset(index)}
            strokeLinecap="round" // Adds rounded corners to the segments
            transform="rotate(-90 18 18)" // Rotates the chart to start from the top
          />
        ))}
      </svg>

      {/* Legends */}
      <div className="mt-8 flex flex-wrap justify-center">
        {segments.map((segment, index) => (
          <div key={index} className="flex items-center mr-4 mb-2">
            {/* Color Box */}
            <span
              style={{ backgroundColor: segment.color }}
              className="w-4 h-4 mr-2 inline-block"
            />
            {/* Label */}
            <span className="text-sm opacity-70">{segment.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChart;
