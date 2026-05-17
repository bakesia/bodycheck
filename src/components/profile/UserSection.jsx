import React, { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaCalendarAlt,
  FaChartLine,
  FaTimes,
  FaVenusMars,
  FaRulerVertical,
  FaWeightHanging,
} from "react-icons/fa";
import useUserStore from "../../store/useUserStore";
import { useProfile } from "../../hooks/useProfile"; // 👈 훅 장착

export default function UserSection({ joinedDate, totalAnalysis }) {
  const { user } = useUserStore();
  const { handleUpdateProfile, handleUpdatePassword } = useProfile(); // 👈 기능 바인딩
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editTab, setEditTab] = useState("계정 정보");

  const [editForm, setEditForm] = useState({
    name: user.name,
    gender: user.gender,
    height: user.height,
    weight: user.weight,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleUpdate = () => {
    if (editTab === "계정 정보") {
      handleUpdateProfile(editForm, () => setIsEditModalOpen(false));
    } else if (editTab === "신체 정보") {
      if (!editForm.height || !editForm.weight)
        return alert("수치를 입력해주세요.");

      handleUpdateProfile(editForm, () => setIsEditModalOpen(false));
    } else if (editTab === "비밀번호") {
      if (editForm.newPassword.length < 8)
        return alert("새 비밀번호는 최소 8자 이상이어야 합니다.");
      if (editForm.newPassword !== editForm.confirmPassword)
        return alert("새 비밀번호가 일치하지 않습니다.");
      handleUpdatePassword(
        {
          currentPassword: editForm.currentPassword,
          newPassword: editForm.newPassword,
        },
        () => closeEditModal(),
      );
    }
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditForm((prev) => ({
      ...prev,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    }));
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 space-y-16">
      {/* 1. 상단 프로필 헤더 */}
      <div className="flex items-center gap-10">
        <div className="w-32 h-32 bg-gray-100 flex items-center justify-center rounded-full shrink-0 border-2 border-black overflow-hidden">
          <FaUser size={60} className="text-gray-300 translate-y-2" />
        </div>
        <div className="flex flex-col justify-center text-left">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
            nickname
          </span>
          <h3 className="text-5xl font-black text-black tracking-tighter uppercase">
            {user.name}
          </h3>
        </div>
      </div>

      {/* 2. 메인 정보 구역 (3컬럼 그리드) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-4 text-left">
        <div className="space-y-6">
          <h4 className="text-sm font-black border-b-2 border-black pb-2 uppercase">
            계정 정보
          </h4>
          <div className="space-y-4">
            <div className="flex items-center gap-4 font-bold text-sm">
              <FaEnvelope className="text-gray-400" />
              <div>
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-tighter">
                  Email
                </p>
                <p>{user.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 font-bold text-sm">
              <FaCalendarAlt className="text-gray-400" />
              <div>
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-tighter">
                  Joined
                </p>
                <p>{joinedDate}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h4 className="text-sm font-black border-b-2 border-black pb-2 uppercase">
            신체 데이터
          </h4>
          <div className="space-y-4">
            <div className="flex items-center gap-4 font-bold text-sm">
              <FaVenusMars className="text-gray-400" />
              <div>
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-tighter">
                  Gender
                </p>
                <p className="uppercase">{user.gender || "Not Set"}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 font-bold text-sm">
              <FaRulerVertical className="text-gray-400" />
              <div>
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-tighter">
                  Height
                </p>
                <p>{user.height ? `${user.height} CM` : "Not Set"}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 font-bold text-sm">
              <FaWeightHanging className="text-gray-400" />
              <div>
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-tighter">
                  Weight
                </p>
                <p>{user.weight ? `${user.weight} KG` : "Not Set"}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h4 className="text-sm font-black border-b-2 border-black pb-2 uppercase">
            활동 이력
          </h4>
          <div className="flex items-center gap-4 font-bold text-sm">
            <FaChartLine className="text-gray-400" />
            <div>
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-tighter">
                Analysis count
              </p>
              <p className="text-xl font-black">
                {totalAnalysis} <span className="text-xs uppercase">Times</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-12 border-t-2 border-black">
        <button
          onClick={() => {
            setEditForm({
              name: user.name,
              gender: user.gender,
              height: user.height,
              weight: user.weight,
              currentPassword: "",
              newPassword: "",
              confirmPassword: "",
            });
            setIsEditModalOpen(true);
          }}
          className="px-12 py-5 border-2 border-black text-sm font-black bg-white text-black hover:bg-black hover:text-white transition-all"
        >
          프로필 정보 수정
        </button>
      </div>

      {/* 모달 마크업 영역은 기존 소스코드와 완벽하게 동일하므로 생략 (handleUpdate 바인딩 완벽 완료) */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
          <div
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
            onClick={closeEditModal}
          />
          <div className="relative w-full max-w-md bg-white border-4 border-black p-10 shadow-[12px_12px_0px_0px_rgba(0,0,0,0.3)]">
            <button
              onClick={closeEditModal}
              className="absolute top-4 right-4 text-black hover:rotate-90 transition-transform"
            >
              <FaTimes size={20} />
            </button>
            <div className="space-y-8">
              <h2 className="text-2xl font-black uppercase tracking-tighter border-b-4 border-black inline-block">
                CONFIGURATION
              </h2>
              <div className="flex border-b-2 border-gray-100">
                {["계정 정보", "신체 정보", "비밀번호"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setEditTab(tab)}
                    className={`flex-1 py-3 text-[11px] font-black uppercase tracking-widest transition-all ${editTab === tab ? "border-b-4 border-black text-black" : "text-gray-300"}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="space-y-5 text-left">
                {editTab === "계정 정보" && (
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                      닉네임
                    </label>
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) =>
                        setEditForm({ ...editForm, name: e.target.value })
                      }
                      className="w-full px-4 py-4 bg-white border-2 border-black outline-none font-bold text-sm"
                    />
                  </div>
                )}
                {editTab === "신체 정보" && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                        성별
                      </label>
                      <div className="flex border-2 border-black overflow-hidden">
                        {["male", "female"].map((g) => (
                          <button
                            key={g}
                            onClick={() =>
                              setEditForm({ ...editForm, gender: g })
                            }
                            className={`flex-1 py-3 text-[10px] font-black uppercase transition-all ${editForm.gender === g ? "bg-black text-white" : "bg-white text-black hover:bg-gray-50"}`}
                          >
                            {g}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                          신장 (cm)
                        </label>
                        <input
                          type="number"
                          value={editForm.height}
                          onChange={(e) =>
                            setEditForm({ ...editForm, height: e.target.value })
                          }
                          className="w-full px-4 py-4 bg-white border-2 border-black outline-none font-bold text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                          몸무게 (kg)
                        </label>
                        <input
                          type="number"
                          value={editForm.weight}
                          onChange={(e) =>
                            setEditForm({ ...editForm, weight: e.target.value })
                          }
                          className="w-full px-4 py-4 bg-white border-2 border-black outline-none font-bold text-sm"
                        />
                      </div>
                    </div>
                  </div>
                )}
                {editTab === "비밀번호" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                        현재 비밀번호
                      </label>
                      <input
                        type="password"
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            currentPassword: e.target.value,
                          })
                        }
                        className="w-full px-4 py-4 bg-white border-2 border-black outline-none font-bold text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                        새 비밀번호
                      </label>
                      <input
                        type="password"
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            newPassword: e.target.value,
                          })
                        }
                        className="w-full px-4 py-4 bg-white border-2 border-black outline-none font-bold text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                        새 비밀번호 확인
                      </label>
                      <input
                        type="password"
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            confirmPassword: e.target.value,
                          })
                        }
                        className="w-full px-4 py-4 bg-white border-2 border-black outline-none font-bold text-sm"
                      />
                    </div>
                  </div>
                )}
              </div>
              <button
                onClick={handleUpdate}
                className="w-full py-5 bg-black text-white font-black text-sm uppercase tracking-[0.4em] hover:bg-gray-800 transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,0.1)]"
              >
                데이터 업데이트 적용
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
