import React from "react";
import { FaClock, FaTasks, FaCalendarAlt, FaPaperPlane } from "react-icons/fa";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";

const timesheetData = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  value: 0,
}));
const timeCardData = [
  { day: 1, value: 0 },
  { day: 5, value: 500 },
  { day: 10, value: 1400 },
  { day: 15, value: 600 },
  { day: 20, value: 800 },
  { day: 25, value: 1300 },
  { day: 30, value: 0 },
];

const HRMSDashboard: React.FC = () => {
  return (
    <div className="md:p- bg-gray-100 min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {[
          {
            icon: <FaClock className="text-blue-500 text-3xl" />,
            title: "Clock Out",
            subtitle: "Clock started at: 10:22 AM",
          },
          {
            icon: <FaTasks className="text-green-500 text-3xl" />,
            title: "My Open Tasks",
            value: 0,
          },
          {
            icon: <FaCalendarAlt className="text-orange-500 text-3xl" />,
            title: "Events Today",
            value: 0,
          },
          {
            icon: <FaPaperPlane className="text-purple-500 text-3xl" />,
            title: "New Posts",
            value: 0,
          },
        ].map((card, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-lg flex justify-between items-center"
          >
            <div className="flex items-center gap-3">
              {card.icon}
              <div>
                <p className="text-sm text-gray-600">{card.title}</p>
                {card.subtitle ? (
                  <p className="text-xs text-gray-500">{card.subtitle}</p>
                ) : (
                  <span className="text-2xl font-bold text-gray-700">
                    {card.value}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4">My Timesheet</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timesheetData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis domain={[-1, 1]} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#0088FE"
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Time Card Statistics</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={timeCardData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#00C49F"
                fill="#00C49F"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Events</h3>
          <div className="h-40 flex items-center justify-center text-gray-500">
            No events found!
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Task Status</h3>
          <div className="h-40 bg-gray-100 flex items-center justify-center text-gray-500 rounded-lg">
            No tasks available
          </div>
        </div>
      </div>

      <div className="mt-8 bg-yellow-100 p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-2">Sticky Note (Private)</h3>
        <textarea
          className="w-full h-20 bg-yellow-200 p-3 border-none focus:outline-none rounded-lg"
          placeholder="Add your private notes here..."
        ></textarea>
      </div>
    </div>
  );
};

export default HRMSDashboard;
