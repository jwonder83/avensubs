"use client";

import { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import { ko } from 'date-fns/locale';

type PaymentEvent = {
  id: string;
  name: string;
  amount: number;
  date: Date;
  icon: string;
  color: string;
};

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<PaymentEvent[]>([]);

  // 임시 데이터 생성
  useEffect(() => {
    const mockEvents: PaymentEvent[] = [
      {
        id: '1',
        name: '넷플릭스',
        amount: 17000,
        date: new Date(2024, 2, 15),
        icon: '🎬',
        color: 'bg-red-500',
      },
      {
        id: '2',
        name: '멜론',
        amount: 10900,
        date: new Date(2024, 2, 20),
        icon: '🎵',
        color: 'bg-green-500',
      },
      {
        id: '3',
        name: '디즈니+',
        amount: 13900,
        date: new Date(2024, 2, 25),
        icon: '📺',
        color: 'bg-blue-500',
      },
    ];
    setEvents(mockEvents);
  }, []);

  const days = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  });

  const previousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const getEventsForDay = (date: Date) => {
    return events.filter(event => isSameDay(event.date, date));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">결제 캘린더</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={previousMonth}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              title="이전 달"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <span className="text-lg font-medium text-gray-900">
              {format(currentDate, 'yyyy년 M월', { locale: ko })}
            </span>
            <button
              onClick={nextMonth}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              title="다음 달"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* 캘린더 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
          {/* 요일 헤더 */}
          <div className="grid grid-cols-7 gap-px border-b border-gray-200">
            {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
              <div
                key={day}
                className="px-3 py-2 text-sm font-medium text-gray-900 text-center"
              >
                {day}
              </div>
            ))}
          </div>

          {/* 날짜 그리드 */}
          <div className="grid grid-cols-7 gap-px">
            {days.map((day, dayIdx) => {
              const dayEvents = getEventsForDay(day);
              const isCurrentMonth = isSameMonth(day, currentDate);

              return (
                <div
                  key={day.toString()}
                  className={`min-h-[120px] p-2 ${
                    isCurrentMonth ? 'bg-white' : 'bg-gray-50'
                  }`}
                >
                  <p
                    className={`text-sm font-medium ${
                      isCurrentMonth ? 'text-gray-900' : 'text-gray-400'
                    }`}
                  >
                    {format(day, 'd')}
                  </p>
                  
                  {/* 이벤트 목록 */}
                  <div className="mt-1 space-y-1">
                    {dayEvents.map((event) => (
                      <div
                        key={event.id}
                        className="flex items-center p-1.5 rounded-lg text-sm"
                      >
                        <span className="w-6 h-6 flex items-center justify-center rounded-full mr-1.5 text-lg">
                          {event.icon}
                        </span>
                        <div>
                          <p className="font-medium text-gray-900 text-xs">
                            {event.name}
                          </p>
                          <p className="text-gray-600 text-xs">
                            {event.amount.toLocaleString()}원
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 이번 달 결제 요약 */}
        <div className="mt-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">이번 달 결제 예정</h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 divide-y divide-gray-200">
            {events
              .sort((a, b) => a.date.getTime() - b.date.getTime())
              .map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between p-4"
                >
                  <div className="flex items-center">
                    <span className={`w-10 h-10 ${event.color} rounded-xl flex items-center justify-center text-white shadow-sm mr-3`}>
                      {event.icon}
                    </span>
                    <div>
                      <p className="font-medium text-gray-900">{event.name}</p>
                      <p className="text-sm text-gray-500">
                        {format(event.date, 'M월 d일')} 결제 예정
                      </p>
                    </div>
                  </div>
                  <p className="font-medium text-gray-900">
                    {event.amount.toLocaleString()}원
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
} 