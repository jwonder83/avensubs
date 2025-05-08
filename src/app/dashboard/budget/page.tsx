"use client";

import { useState, Fragment } from "react";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line,
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  Calendar,
  BadgeInfo,
  Wallet,
  PiggyBank,
  Target,
  ArrowUpRight,
  Plus,
  Edit,
  Trash2,
  X
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

// 월별 예산 및 지출 데이터
const monthlyData = [
  { month: "1월", 예산: 250000, 지출: 232000, 절약: 18000 },
  { month: "2월", 예산: 250000, 지출: 258500, 절약: -8500 },
  { month: "3월", 예산: 280000, 지출: 263000, 절약: 17000 },
  { month: "4월", 예산: 280000, 지출: 286500, 절약: -6500 },
  { month: "5월", 예산: 300000, 지출: 274500, 절약: 25500 },
  { month: "6월", 예산: 300000, 지출: null, 절약: null },
];

// 카테고리별 예산 및 지출 데이터
const categoryData = [
  { name: "엔터테인먼트", 예산: 80000, 지출: 76800, 남은금액: 3200, 퍼센트: 96, color: "#F87171", bgClass: "bg-red-400" },
  { name: "음악", 예산: 30000, 지출: 26700, 남은금액: 3300, 퍼센트: 89, color: "#60A5FA", bgClass: "bg-blue-400" },
  { name: "유틸리티", 예산: 25000, 지출: 22000, 남은금액: 3000, 퍼센트: 88, color: "#34D399", bgClass: "bg-green-400" },
  { name: "교육", 예산: 30000, 지출: 19000, 남은금액: 11000, 퍼센트: 63, color: "#FBBF24", bgClass: "bg-amber-400" },
  { name: "식품/생활", 예산: 110000, 지출: 106900, 남은금액: 3100, 퍼센트: 97, color: "#A78BFA", bgClass: "bg-purple-400" },
  { name: "기부", 예산: 15000, 지출: 10000, 남은금액: 5000, 퍼센트: 67, color: "#EC4899", bgClass: "bg-pink-400" },
  { name: "기타", 예산: 10000, 지출: 13100, 남은금액: -3100, 퍼센트: 131, color: "#9CA3AF", bgClass: "bg-gray-400" }
];

// 목표 저축 데이터
const savingsGoals = [
  { name: "여행 기금", 목표액: 1200000, 현재액: 850000, 퍼센트: 70.8, icon: "✈️" },
  { name: "비상금", 목표액: 3000000, 현재액: 1500000, 퍼센트: 50, icon: "🛡️" },
  { name: "새 노트북", 목표액: 2000000, 현재액: 600000, 퍼센트: 30, icon: "💻" }
];

export default function BudgetPage() {
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [showEditBudget, setShowEditBudget] = useState(false);
  const [timeFrame, setTimeFrame] = useState("monthly");
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingGoal, setEditingGoal] = useState(null);
  
  // 현재 달 총 예산
  const currentBudget = 300000;
  // 현재 달 총 지출
  const currentSpending = 274500;
  // 남은 예산
  const remainingBudget = currentBudget - currentSpending;
  // 하루 남은 평균 지출액 (31일 기준)
  const dailyRemaining = Math.round(remainingBudget / 11); // 5월 20일 기준 남은 일수 약 11일
  
  // 예산 대비 지출 퍼센트
  const spendingPercentage = Math.round((currentSpending / currentBudget) * 100);
  
  // 파이 차트 데이터
  const pieData = categoryData.map(item => ({
    name: item.name,
    value: item.지출
  }));

  // 너비 클래스 결정 함수
  const getWidthClass = (percentage: number) => {
    const clampedPercentage = Math.min(Math.max(0, percentage), 100);
    if (clampedPercentage <= 0) return 'w-0';
    if (clampedPercentage <= 5) return 'w-[5%]';
    if (clampedPercentage <= 10) return 'w-[10%]';
    if (clampedPercentage <= 15) return 'w-[15%]';
    if (clampedPercentage <= 20) return 'w-[20%]';
    if (clampedPercentage <= 25) return 'w-[25%]';
    if (clampedPercentage <= 30) return 'w-[30%]';
    if (clampedPercentage <= 35) return 'w-[35%]';
    if (clampedPercentage <= 40) return 'w-[40%]';
    if (clampedPercentage <= 45) return 'w-[45%]';
    if (clampedPercentage <= 50) return 'w-[50%]';
    if (clampedPercentage <= 55) return 'w-[55%]';
    if (clampedPercentage <= 60) return 'w-[60%]';
    if (clampedPercentage <= 65) return 'w-[65%]';
    if (clampedPercentage <= 70) return 'w-[70%]';
    if (clampedPercentage <= 75) return 'w-[75%]';
    if (clampedPercentage <= 80) return 'w-[80%]';
    if (clampedPercentage <= 85) return 'w-[85%]';
    if (clampedPercentage <= 90) return 'w-[90%]';
    if (clampedPercentage <= 95) return 'w-[95%]';
    return 'w-full';
  };

  // 카테고리 모달을 열기 위한 함수
  const openCategoryModal = (category = null) => {
    setEditingCategory(category);
    setShowCategoryModal(true);
  };

  // 목표 모달을 열기 위한 함수
  const openGoalModal = (goal = null) => {
    setEditingGoal(goal);
    setShowGoalModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">예산 관리</h1>
        <div className="space-x-2">
          <Button onClick={() => setShowEditBudget(true)} aria-label="예산 수정">
            <Edit size={16} className="mr-2" />
            예산 수정
          </Button>
          <Button onClick={() => openCategoryModal()} aria-label="새 카테고리 추가">
            <Plus size={16} className="mr-2" />
            새 카테고리
          </Button>
          <Button onClick={() => openGoalModal()} aria-label="새 저축 목표 추가">
            <Plus size={16} className="mr-2" />
            새 저축 목표
          </Button>
        </div>
      </div>
      
      {/* 요약 카드 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-start">
            <div className="mr-4 p-3 bg-blue-50 rounded-full">
              <Wallet size={24} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">이번 달 예산</p>
              <p className="text-2xl font-bold text-gray-800">₩{currentBudget.toLocaleString()}</p>
              <div className="flex items-center mt-1">
                <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                  <div
                    className={`h-2 rounded-full ${
                      spendingPercentage > 100 ? 'bg-red-500' : 'bg-blue-500'
                    } ${getWidthClass(spendingPercentage)}`}
                  ></div>
                </div>
                <p className="text-xs text-gray-500">{spendingPercentage}% 사용</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-start">
            <div className="mr-4 p-3 bg-green-50 rounded-full">
              <PiggyBank size={24} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">남은 예산</p>
              <p className={`text-2xl font-bold ${remainingBudget < 0 ? 'text-red-500' : 'text-gray-800'}`}>
                ₩{remainingBudget.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                하루 약 ₩{dailyRemaining.toLocaleString()} 사용 가능
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-start">
            <div className="mr-4 p-3 bg-indigo-50 rounded-full">
              <Target size={24} className="text-indigo-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">이번 달 절약</p>
              <p className={`text-2xl font-bold ${remainingBudget < 0 ? 'text-red-500' : 'text-green-500'}`}>
                ₩{remainingBudget.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                목표 대비 {Math.round((remainingBudget / currentBudget) * 100)}% 절약 중
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* 지출 트렌드 차트 */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium text-gray-800">예산 및 지출 추이</h2>
          <div className="flex space-x-2">
            <button 
              className={`px-3 py-1 text-sm rounded-md ${
                timeFrame === "monthly" 
                  ? "bg-indigo-100 text-indigo-700" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setTimeFrame("monthly")}
            >
              월간
            </button>
            <button
              className={`px-3 py-1 text-sm rounded-md ${
                timeFrame === "yearly" 
                  ? "bg-indigo-100 text-indigo-700" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setTimeFrame("yearly")}
            >
              연간
            </button>
          </div>
        </div>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={monthlyData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => {
                  return [`₩${value.toLocaleString()}`, name];
                }}
              />
              <Legend />
              <Bar dataKey="예산" fill="#93c5fd" />
              <Bar dataKey="지출" fill="#4f46e5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 카테고리별 예산 */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-800">카테고리별 예산</h2>
            <button 
              onClick={() => setShowAddCategory(true)}
              className="p-1 bg-indigo-50 text-indigo-600 rounded-md hover:bg-indigo-100"
              aria-label="카테고리 추가"
              title="카테고리 추가"
            >
              <Plus size={16} />
            </button>
          </div>
          <div className="space-y-5">
            {categoryData.map((category, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700 font-medium">{category.name}</span>
                  <span className="text-gray-700 font-medium">
                    ₩{category.지출.toLocaleString()} / ₩{category.예산.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="flex-grow">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          category.퍼센트 > 100 ? 'bg-red-500' : 'bg-indigo-500'
                        } ${getWidthClass(category.퍼센트)}`}
                      ></div>
                    </div>
                  </div>
                  <div className="ml-2 text-xs font-medium">
                    <span className={category.퍼센트 > 100 ? 'text-red-500' : 'text-gray-500'}>
                      {category.퍼센트}%
                    </span>
                  </div>
                  <div className="ml-4 flex space-x-1">
                    <button 
                      className="p-1 text-gray-400 hover:text-indigo-500"
                      aria-label={`${category.name} 카테고리 수정`}
                      title={`${category.name} 수정`}
                    >
                      <Edit size={14} />
                    </button>
                    <button 
                      className="p-1 text-gray-400 hover:text-red-500"
                      aria-label={`${category.name} 카테고리 삭제`}
                      title={`${category.name} 삭제`}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* 저축 목표 */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-800">저축 목표</h2>
            <button 
              onClick={() => setShowAddGoal(true)}
              className="p-1 bg-indigo-50 text-indigo-600 rounded-md hover:bg-indigo-100"
              aria-label="저축 목표 추가"
              title="저축 목표 추가"
            >
              <Plus size={16} />
            </button>
          </div>
          <div className="space-y-5">
            {savingsGoals.map((goal, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <span className="text-2xl mr-2">{goal.icon}</span>
                    <span className="font-medium">{goal.name}</span>
                  </div>
                  <div className="flex space-x-1">
                    <button 
                      className="p-1 text-gray-400 hover:text-indigo-500"
                      aria-label={`${goal.name} 목표 수정`}
                      title={`${goal.name} 수정`}
                    >
                      <Edit size={14} />
                    </button>
                    <button 
                      className="p-1 text-gray-400 hover:text-red-500"
                      aria-label={`${goal.name} 목표 삭제`}
                      title={`${goal.name} 삭제`}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                <div className="text-sm text-gray-500 mb-2">
                  ₩{goal.현재액.toLocaleString()} / ₩{goal.목표액.toLocaleString()}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div 
                    className={`bg-indigo-500 h-2 rounded-full ${getWidthClass(goal.퍼센트)}`}
                  ></div>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-500">{goal.퍼센트}% 달성</span>
                  <button className="text-indigo-500 font-medium flex items-center">
                    더 저축하기
                    <ArrowUpRight size={12} className="ml-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* 저축 추천 */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-lg font-medium text-gray-800 mb-4">맞춤형 저축 추천</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border rounded-lg p-4 bg-gradient-to-br from-indigo-50 to-blue-50">
            <div className="mb-2 font-medium text-indigo-800">자동 이체 설정</div>
            <p className="text-sm text-indigo-600 mb-3">
              매달 5일 급여일에 자동으로 10%를 저축 계좌로 이체하세요.
            </p>
            <button className="text-xs bg-white text-indigo-600 px-3 py-1.5 rounded-md hover:bg-indigo-50">
              설정하기
            </button>
          </div>
          
          <div className="border rounded-lg p-4 bg-gradient-to-br from-green-50 to-emerald-50">
            <div className="mb-2 font-medium text-green-800">절약 챌린지</div>
            <p className="text-sm text-green-600 mb-3">
              식비 10% 줄이기 챌린지로 매달 약 11,000원을 추가 저축할 수 있어요.
            </p>
            <button className="text-xs bg-white text-green-600 px-3 py-1.5 rounded-md hover:bg-green-50">
              시작하기
            </button>
          </div>
          
          <div className="border rounded-lg p-4 bg-gradient-to-br from-amber-50 to-yellow-50">
            <div className="mb-2 font-medium text-amber-800">투자 포트폴리오</div>
            <p className="text-sm text-amber-600 mb-3">
              안정적인 수익률로 장기 저축을 위한 투자 포트폴리오를 확인하세요.
            </p>
            <button className="text-xs bg-white text-amber-600 px-3 py-1.5 rounded-md hover:bg-amber-50">
              추천 보기
            </button>
          </div>
        </div>
      </div>
      
      {/* 모달: 카테고리 추가 (실제 구현 시 별도 컴포넌트로 분리) */}
      {showAddCategory && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium mb-4">새 예산 카테고리 추가</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  카테고리 이름
                </label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="예: 여가 활동"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  예산 금액
                </label>
                <input 
                  type="number" 
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="50000"
                />
              </div>
              <div className="flex space-x-2 justify-end pt-4">
                <button 
                  onClick={() => setShowAddCategory(false)}
                  className="px-4 py-2 border text-sm rounded-md hover:bg-gray-50"
                  aria-label="카테고리 추가 취소"
                >
                  취소
                </button>
                <button 
                  className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700"
                  aria-label="카테고리 추가하기"
                >
                  추가하기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* 모달: 저축 목표 추가 (실제 구현 시 별도 컴포넌트로 분리) */}
      {showAddGoal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium mb-4">새 저축 목표 추가</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="goal-name">
                  목표 이름
                </label>
                <input 
                  id="goal-name"
                  type="text" 
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="예: 여행 자금"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="goal-amount">
                  목표 금액
                </label>
                <input 
                  id="goal-amount"
                  type="number" 
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="1000000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="goal-date">
                  목표 달성일
                </label>
                <input 
                  id="goal-date"
                  type="date" 
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  아이콘
                </label>
                <div className="grid grid-cols-6 gap-2">
                  {["✈️", "🏠", "🚗", "💻", "📱", "👕", "🎓", "💍", "🛡️", "🏥", "🎁", "💰"].map((icon) => (
                    <button 
                      key={icon} 
                      className="p-2 border rounded-md text-xl hover:bg-gray-50"
                      aria-label={`${icon} 아이콘 선택`}
                      title={`${icon} 선택`}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex space-x-2 justify-end pt-4">
                <button 
                  onClick={() => setShowAddGoal(false)}
                  className="px-4 py-2 border text-sm rounded-md hover:bg-gray-50"
                  aria-label="저축 목표 추가 취소"
                >
                  취소
                </button>
                <button 
                  className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700"
                  aria-label="저축 목표 추가하기"
                >
                  추가하기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* 모달: 예산 수정 (실제 구현 시 별도 컴포넌트로 분리) */}
      {showEditBudget && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium mb-4">월간 예산 수정</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="budget-amount">
                  전체 예산 금액
                </label>
                <input 
                  id="budget-amount"
                  type="number" 
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="300000"
                  defaultValue={300000}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="budget-month">
                  적용 시작 월
                </label>
                <select 
                  id="budget-month"
                  className="w-full px-3 py-2 border rounded-md"
                  aria-label="예산 적용 시작 월"
                >
                  <option>6월</option>
                  <option>7월</option>
                  <option>8월</option>
                </select>
              </div>
              <div className="flex space-x-2 justify-end pt-4">
                <button 
                  onClick={() => setShowEditBudget(false)}
                  className="px-4 py-2 border text-sm rounded-md hover:bg-gray-50"
                  aria-label="예산 수정 취소"
                >
                  취소
                </button>
                <button 
                  className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700"
                  aria-label="예산 저장하기"
                >
                  저장하기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 