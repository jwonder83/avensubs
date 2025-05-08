"use client";

import { ArrowLeft, Users, Building2, Home, Briefcase, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const teamTypes = [
  {
    id: 'personal',
    name: '개인 팀',
    description: '혼자 사용하는 구독 서비스를 관리해요',
    icon: Users,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50'
  },
  {
    id: 'family',
    name: '가족 팀',
    description: '가족들과 함께 사용하는 구독 서비스를 관리해요',
    icon: Home,
    color: 'text-green-500',
    bgColor: 'bg-green-50'
  },
  {
    id: 'company',
    name: '회사 팀',
    description: '회사에서 사용하는 구독 서비스를 관리해요',
    icon: Building2,
    color: 'text-purple-500',
    bgColor: 'bg-purple-50'
  },
  {
    id: 'project',
    name: '프로젝트 팀',
    description: '프로젝트용 구독 서비스를 관리해요',
    icon: Briefcase,
    color: 'text-orange-500',
    bgColor: 'bg-orange-50'
  }
];

export default function CreateTeamPage() {
  const [selectedType, setSelectedType] = useState('');
  const [teamName, setTeamName] = useState('');
  
  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <div className="max-w-[640px] mx-auto px-5 py-10">
        {/* 헤더 */}
        <div className="mb-8">
          <Link 
            href="/dashboard/team" 
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span className="text-sm">돌아가기</span>
          </Link>
          <h1 className="text-[26px] font-bold text-gray-900 tracking-tight">
            새로운 팀 만들기
          </h1>
          <p className="text-[15px] text-gray-600 mt-2">
            팀원들과 함께 구독 서비스를 관리하고 비용을 절약해보세요
          </p>
        </div>

        {/* 팀 정보 입력 */}
        <div className="space-y-8">
          {/* 팀 이름 입력 */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <label className="block mb-4">
              <span className="text-[15px] font-medium text-gray-900">팀 이름</span>
              <input
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="팀 이름을 입력해주세요"
                className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-200 text-[15px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors"
              />
            </label>
          </div>

          {/* 팀 유형 선택 */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="mb-4">
              <h2 className="text-[15px] font-medium text-gray-900">팀 유형</h2>
              <p className="text-[13px] text-gray-500 mt-1">
                팀의 성격과 가장 잘 맞는 유형을 선택해주세요
              </p>
            </div>
            
            <div className="space-y-3">
              {teamTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={"w-full flex items-center justify-between p-4 " + 
                    (selectedType === type.id 
                      ? 'bg-blue-50 border-blue-200' 
                      : 'bg-gray-50 border-transparent hover:bg-gray-100') + 
                    " border rounded-xl transition-colors"}
                >
                  <div className="flex items-center gap-4">
                    <div className={"w-10 h-10 " + type.bgColor + " rounded-lg flex items-center justify-center"}>
                      <type.icon className={"w-5 h-5 " + type.color} />
                    </div>
                    <div className="text-left">
                      <div className="text-[15px] font-medium text-gray-900">
                        {type.name}
                      </div>
                      <div className="text-[13px] text-gray-500 mt-0.5">
                        {type.description}
                      </div>
                    </div>
                  </div>
                  <ChevronRight className={"w-5 h-5 " + 
                    (selectedType === type.id ? 'text-blue-500' : 'text-gray-400')} />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 하단 버튼 */}
        <div className="mt-8">
          <button
            disabled={!teamName || !selectedType}
            className={"w-full py-3.5 rounded-xl text-white font-medium text-[15px] transition-colors " + 
              (teamName && selectedType
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-gray-200 cursor-not-allowed')}
          >
            팀 만들기
          </button>
          <p className="text-center text-[13px] text-gray-500 mt-4">
            팀을 만들면 자동으로 관리자로 지정됩니다
          </p>
        </div>
      </div>
    </div>
  );
} 