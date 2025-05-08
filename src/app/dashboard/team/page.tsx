"use client";

import { useState } from 'react';
import { User, Settings, CreditCard, ChevronDown, Copy, Mail, Plus, MoreHorizontal, RefreshCcw, Trash, Save, Check, X } from 'lucide-react';
import Link from 'next/link';

// 팀 멤버 타입 정의
type TeamMember = {
  id: string;
  name: string;
  email: string;
  role: string;
  joinedAt: string;
};

// 초대 타입 정의
type Invite = {
  id: string;
  email: string;
  sentAt: string;
};

// 구독 타입 정의
type Subscription = {
  id: string;
  name: string;
  provider: string;
  cost: number;
  cycle: string;
  nextBillingDate: string;
  isShared: boolean;
};

// 샘플 데이터
const sampleTeams = [
  { id: '1', name: '개인 팀' },
  { id: '2', name: '회사 팀' },
  { id: '3', name: '가족 팀' },
];

const sampleMembers: TeamMember[] = [
  { id: '1', name: '김철수', email: 'user@example.com', role: '관리자', joinedAt: '2023년 6월 10일' },
  { id: '2', name: '이영희', email: 'member1@example.com', role: '멤버', joinedAt: '2023년 6월 15일' },
  { id: '3', name: '박지민', email: 'member2@example.com', role: '멤버', joinedAt: '2023년 7월 1일' },
];

const sampleInvites: Invite[] = [
  { id: '1', email: 'invite1@example.com', sentAt: '2023년 8월 15일' },
  { id: '2', email: 'invite2@example.com', sentAt: '2023년 8월 16일' },
];

const sampleSubscriptions: Subscription[] = [
  { id: '1', name: 'Netflix', provider: 'Netflix', cost: 17000, cycle: '월간', nextBillingDate: '2023년 9월 15일', isShared: true },
  { id: '2', name: 'Disney+', provider: 'Disney', cost: 9900, cycle: '월간', nextBillingDate: '2023년 9월 20일', isShared: true },
  { id: '3', name: 'Spotify Family', provider: 'Spotify', cost: 16900, cycle: '월간', nextBillingDate: '2023년 9월 25일', isShared: true },
];

export default function TeamPage() {
  const [activeTeam, setActiveTeam] = useState(sampleTeams[0]);
  const [activeTab, setActiveTab] = useState<'members' | 'subscriptions' | 'settings'>('members');
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  
  const handleTeamChange = (teamId: string) => {
    const team = sampleTeams.find(t => t.id === teamId);
    if (team) setActiveTeam(team);
  };
  
  const copyInviteLink = () => {
    navigator.clipboard.writeText(`https://avensubs.com/invitation/${activeTeam.id}`);
    alert('초대 링크가 클립보드에 복사되었습니다.');
  };
  
  const acceptInvite = (inviteId: string) => {
    alert(`초대를 수락했습니다. ID: ${inviteId}`);
  };
  
  const declineInvite = (inviteId: string) => {
    alert(`초대를 거절했습니다. ID: ${inviteId}`);
  };
  
  const isSubscriptionShareable = (subscription: Subscription) => {
    return subscription.isShared;
  };
  
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">팀 관리</h1>
      
      {/* 대기 중인 초대 */}
      {sampleInvites.length > 0 && (
        <div className="mb-6 bg-blue-50 rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-blue-100">
            <h3 className="text-sm font-semibold text-blue-900">대기 중인 초대</h3>
          </div>
          <div className="p-4">
            <div className="space-y-3">
              {sampleInvites.map(invite => (
                <div key={invite.id} className="flex items-center justify-between p-3 bg-white rounded-xl shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <Mail className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{invite.email}</div>
                      <div className="text-xs text-gray-500">{invite.sentAt} 발송</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      className="p-1.5 text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors"
                      onClick={() => acceptInvite(invite.id)}
                      aria-label="초대 수락"
                      title="초대 수락"
                    >
                      <Check className="h-3.5 w-3.5" />
                    </button>
                    <button 
                      className="p-1.5 text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                      onClick={() => declineInvite(invite.id)}
                      aria-label="초대 거절"
                      title="초대 거절"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* 팀 선택 및 탭 */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative w-full md:w-64">
          <select
            value={activeTeam.id}
            onChange={(e) => handleTeamChange(e.target.value)}
            className="w-full appearance-none bg-white border border-gray-200 rounded-xl pl-4 pr-10 py-2.5 text-base font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent shadow-sm"
            aria-label="팀 선택"
            title="팀 선택"
          >
            {sampleTeams.map(team => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-3 h-5 w-5 text-gray-500 pointer-events-none" />
        </div>
        <div className="flex items-center gap-3">
          <Link 
            href="/dashboard/team/create" 
            className="px-4 py-2.5 bg-blue-50 text-blue-700 rounded-xl text-sm font-medium hover:bg-blue-100 transition-colors flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            새 팀 만들기
          </Link>
        </div>
      </div>

      {/* 탭 메뉴 */}
      <div className="mb-6 flex border-b border-gray-200">
        <button
          className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'members' ? 'text-blue-700 border-blue-600' : 'text-gray-600 border-transparent hover:text-gray-900'}`}
          onClick={() => setActiveTab('members')}
        >
          <User className="inline-block h-4 w-4 mr-2 relative -top-px" />
          팀원
        </button>
        <button
          className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'subscriptions' ? 'text-blue-700 border-blue-600' : 'text-gray-600 border-transparent hover:text-gray-900'}`}
          onClick={() => setActiveTab('subscriptions')}
        >
          <CreditCard className="inline-block h-4 w-4 mr-2 relative -top-px" />
          구독
        </button>
        <button
          className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'settings' ? 'text-blue-700 border-blue-600' : 'text-gray-600 border-transparent hover:text-gray-900'}`}
          onClick={() => setActiveTab('settings')}
        >
          <Settings className="inline-block h-4 w-4 mr-2 relative -top-px" />
          설정
        </button>
      </div>
      
      {/* 멤버 탭 */}
      {activeTab === 'members' && (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-lg font-semibold text-gray-900">팀원 관리</h2>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowInviteForm(!showInviteForm)}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
              >
                초대하기
              </button>
              <button 
                onClick={copyInviteLink}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors flex items-center shadow-sm"
              >
                <Copy className="h-4 w-4 mr-2" />
                초대 링크 복사
              </button>
            </div>
          </div>
          
          {/* 초대 폼 */}
          {showInviteForm && (
            <div className="p-5 bg-blue-50 border-b border-blue-100">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="초대할 이메일 주소 입력"
                  className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-sm"
                />
                <button 
                  className="px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
                >
                  초대 전송
                </button>
              </div>
            </div>
          )}
          
          {/* 멤버 목록 */}
          <div className="divide-y divide-gray-100">
            {sampleMembers.map(member => (
              <div key={member.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold text-base">
                      {member.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-base font-medium text-gray-900">{member.name}</span>
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">{member.role}</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        {member.email} • {member.joinedAt} 가입
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                    aria-label="멤버 삭제"
                    title="멤버 삭제"
                    onClick={() => alert('멤버를 삭제하시겠습니까?')}
                  >
                    <Trash className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* 구독 탭 */}
      {activeTab === 'subscriptions' && (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-lg font-semibold text-gray-900">구독 관리</h2>
            <Link 
              href="/dashboard/subscriptions/add" 
              className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              구독 추가
            </Link>
          </div>
          
          {/* 구독 목록 */}
          {sampleSubscriptions.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {sampleSubscriptions.map(subscription => (
                <div key={subscription.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-xl bg-gray-100 flex items-center justify-center">
                        <CreditCard className="h-5 w-5 text-gray-700" />
                      </div>
                      <div>
                        <div className="text-base font-medium text-gray-900 mb-0.5">{subscription.name}</div>
                        <div className="text-sm text-gray-500">
                          {subscription.provider} • {subscription.cost.toLocaleString()}원/{subscription.cycle}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-xs text-gray-500 mb-0.5">다음 결제일</div>
                        <div className="text-sm font-medium text-gray-900">{subscription.nextBillingDate}</div>
                      </div>
                      
                      <button 
                        className="p-2 rounded-full hover:bg-gray-200 transition-colors"
                        aria-label="구독 메뉴"
                        title="구독 메뉴"
                      >
                        <MoreHorizontal className="h-5 w-5 text-gray-500" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-3 ml-16">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${isSubscriptionShareable(subscription) ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                      {isSubscriptionShareable(subscription) ? '팀원과 공유 중' : '공유 안 함'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <CreditCard className="h-6 w-6 text-gray-500" />
              </div>
              <h3 className="text-base font-medium text-gray-900 mb-2">아직 구독이 없습니다</h3>
              <p className="text-sm text-gray-500 mb-4">팀원들과 함께 구독 서비스를 관리해보세요.</p>
              <Link 
                href="/dashboard/subscriptions/add" 
                className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors inline-flex items-center shadow-sm"
              >
                <Plus className="h-4 w-4 mr-2" />
                첫 구독 추가하기
              </Link>
            </div>
          )}
        </div>
      )}
      
      {/* 설정 탭 */}
      {activeTab === 'settings' && (
        <div className="space-y-6">
          {/* 기본 정보 */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden p-5">
            <h2 className="text-lg font-semibold text-gray-900 mb-5">팀 설정</h2>
            
            <div className="space-y-4 mb-6">
              <div>
                <label htmlFor="teamName" className="block text-sm font-medium text-gray-700 mb-1">팀 이름</label>
                <input
                  id="teamName"
                  type="text"
                  defaultValue={activeTeam.name}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">생성일</label>
                <div className="text-base text-gray-900 px-4 py-2.5">2023년 5월 10일</div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button className="px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm flex items-center">
                <Save className="h-4 w-4 mr-2" />
                변경사항 저장
              </button>
            </div>
          </div>
          
          {/* 위험 영역 */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden p-5 border border-red-100">
            <h3 className="text-lg font-semibold text-red-600 mb-3">위험 영역</h3>
            <p className="text-sm text-gray-700 mb-4">
              팀을 삭제하면 모든 팀 데이터와 팀원 정보가 영구적으로 삭제됩니다. 이 작업은 되돌릴 수 없습니다.
            </p>
            <button className="px-4 py-2.5 bg-red-600 text-white rounded-xl text-sm font-medium hover:bg-red-700 transition-colors shadow-sm flex items-center">
              <Trash className="h-4 w-4 mr-2" />
              팀 삭제하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 