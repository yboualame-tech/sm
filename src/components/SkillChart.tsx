/**
 * SkillChart Component
 * Displays a skill with a circular progress indicator
 */

interface SkillChartProps {
  skill: string;
  level: number; // 0-100
}

export const SkillChart: React.FC<SkillChartProps> = ({ skill, level }) => {
  const circumference = 2 * Math.PI * 45; // radius = 45
  const strokeDashoffset = circumference - (level / 100) * circumference;

  return (
    <div className="skill-chart">
      <svg width="120" height="120" viewBox="0 0 120 120" className="skill-circle">
        <defs>
          <linearGradient id="skillGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1e40af" />
          </linearGradient>
        </defs>
        <circle
          cx="60"
          cy="60"
          r="45"
          className="skill-circle-bg"
        />
        <circle
          cx="60"
          cy="60"
          r="45"
          className="skill-circle-progress"
          style={{
            strokeDashoffset: strokeDashoffset,
          }}
        />
      </svg>
      <div className="skill-info">
        <span className="skill-level">{level}%</span>
        <span className="skill-name">{skill}</span>
      </div>
    </div>
  );
};
