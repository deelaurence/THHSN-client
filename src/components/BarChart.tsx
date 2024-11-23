import React from 'react';

type BarData = {
  label: string;
  value: number;
  color?: string;
};

interface BarChartProps {
  data: BarData[];
  chartTitle:string;
  barColor?: string;
}

const BarChart: React.FC<BarChartProps> = ({
  data,
  chartTitle,
  barColor = '#3498db', // Default color for bars
}) => {
  const maxValue = Math.max(...data.map((item) => item.value)); // Get the maximum value in the data
  const barWidth = 30; // Fixed width for each bar
  const spacing = 20; // Spacing between each bar
  const chartWidth = data.length * (barWidth + spacing); // Dynamically calculate chart width based on data length

  return (
    <div className="relative flex flex-col items-center w-full max-w-screen-md mx-auto">
       <h1 className='text-3xl mb-12 text-center'>{chartTitle}</h1>
      {/* SVG Bar Chart */}
      <svg
        viewBox={`0 0 ${chartWidth + spacing} 120`} // Adjust viewBox dynamically based on chart width
        preserveAspectRatio="none"
        className="w-full h-80"
      >
        {/* Y-Axis Labels */}
        <g className="y-axis">
          {[...Array(5)].map((_, index) => {
            const yValue = ((5 - index) * maxValue) / 5; // Divide maxValue into 5 segments
            return (
              <text
                key={index}
                x="0"
                y={(index * 20) + 10} // Spread the labels evenly
                fontSize="6" // Adjusted font size
                fontFamily="Arial, sans-serif" // Custom font family
                fill="#666"
                textAnchor="end"
                dy="0.3em" // Adjust vertical alignment
              >
                {yValue.toFixed(0)}
              </text>
            );
          })}
        </g>

        {data.map((item, index) => {
          const barHeight = (item.value / maxValue) * 80; // Calculate bar height percentage relative to max value
          const xPosition = index * (barWidth + spacing) + spacing; // Adjust x-position of the bar

          return (
            <g key={index}>
              {/* Bar */}
              <rect
                x={xPosition}
                y={100 - barHeight}
                width={barWidth}
                height={barHeight}
                fill={item.color || barColor}
                rx="3" // Rounded corners
                ry="3"
              />
              
              {/* Value Label (on the y-axis above the bar) */}
             
            </g>
          );
        })}

        {/* X and Y Axes */}
        <line
          x1="10"
          y1="100"
          x2={`${chartWidth + spacing}`} // Extend the x-axis to match the chart width
          y2="100"
          stroke="#777"
          strokeWidth="0.5"
        />
        <line
          x1="10"
          y1="0"
          x2="10"
          y2="100"
          stroke="#777"
          strokeWidth="0.5"
        />
      </svg>

      {/* HTML Labels for X-Axis */}
      <div className="absolute bottom-4 left-0 w-full flex justify-between">
        {data.map((item, index) => {
          const labelPosition = ((index * (barWidth + spacing)) + spacing + (barWidth / 2)) * 97 / chartWidth;

          return (
            <div
              key={index}
              style={{
                position: 'absolute',
                left: `${labelPosition}%`, // Use percentage to ensure dynamic placement
                bottom: '20px', // Adjust to position below the chart
                transform: 'translateX(-50%)', // Center the label
                whiteSpace: 'nowrap', // Prevent text from breaking
              }}
              className="text-xs font-medium text-center"
            >
              <span className='absolute opacity-40 text-[7px] top-4'>{item.value}</span>
              {item.label}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BarChart;
