'use client';

import React from 'react';

export default function DashboardPage() {
  const stats = [
    { title: '총 매출', value: '₩1,235,000', change: '+12.5%', trend: 'up' },
    { title: '신규 주문', value: '25', change: '+3.2%', trend: 'up' },
    { title: '활성 사용자', value: '1,234', change: '-2.4%', trend: 'down' },
    { title: '전환율', value: '3.2%', change: '+1.1%', trend: 'up' },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
            <div className="mt-2 flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              <p className={`ml-2 text-sm font-medium ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900">최근 활동</h2>
          <div className="mt-6 flow-root">
            <ul className="-my-5 divide-y divide-gray-200">
              {[1, 2, 3, 4, 5].map((item) => (
                <li key={item} className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        새로운 주문 #{item}
                      </p>
                      <p className="text-sm text-gray-500">
                        2024-01-{item < 10 ? `0${item}` : item} 10:00:00
                      </p>
                    </div>
                    <div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        완료
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

