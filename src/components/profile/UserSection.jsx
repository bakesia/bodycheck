import React, { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaCalendarAlt,
  FaChartLine,
  FaTimes,
} from "react-icons/fa";

export default function UserSection() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editTab, setEditTab] = useState("nickname"); // 'nickname' 또는 'password'

  const [userData, setUserData] = useState({
    nickname: "tuser",
    email: "tuser@example.com",
    joinedDate: "2026.04.12",
    totalAnalysis: 42,
  });

  const [editForm, setEditForm] = useState({
    newNickname: userData.nickname,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleUpdate = () => {
    // 탭에 따른 유효성 검사 및 API 요청 로직
    if (editTab === "nickname") {
      console.log("닉네임 변경 요청:", editForm.newNickname);
      setUserData({ ...userData, nickname: editForm.newNickname });
    } else {
      if (editForm.newPassword !== editForm.confirmPassword) {
        return alert("새 비밀번호가 일치하지 않습니다.");
      }
      console.log("비밀번호 변경 요청");
    }

    setIsEditModalOpen(false);
    alert("수정이 완료되었습니다.");
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditForm({
      newNickname: userData.nickname,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 space-y-16">
      {/* 1. 상단 프로필 헤더 */}
      <div className="flex items-center gap-10">
        <div className="w-32 h-32 bg-gray-100 flex items-center justify-center rounded-full shrink-0 border-2 border-black overflow-hidden">
          <FaUser size={60} className="text-gray-300 translate-y-2" />
        </div>
        <div className="flex flex-col justify-center">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
            User Nickname
          </span>
          <h3 className="text-4xl font-black text-black tracking-tighter uppercase">
            {userData.nickname}
          </h3>
        </div>
      </div>

      {/* 2. 메인 정보 구역 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-4">
        <div className="space-y-6">
          <h4 className="text-sm font-black border-b-2 border-black pb-2">
            계정 정보
          </h4>
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-base font-bold">
              <FaEnvelope className="text-gray-400" />
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase">
                  Email Address
                </p>
                <p>{userData.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-base font-bold">
              <FaCalendarAlt className="text-gray-400" />
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase">
                  Joined Since
                </p>
                <p>{userData.joinedDate}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h4 className="text-sm font-black  border-b-2 border-black pb-2">
            활동 이력
          </h4>
          <div className="flex items-center gap-4 text-base font-bold">
            <FaChartLine className="text-gray-400" />
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase">
                Total Analysis
              </p>
              <p>{userData.totalAnalysis} Times</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. 수정 버튼 */}
      <div className="pt-12 border-t-2 border-black">
        <button
          onClick={() => setIsEditModalOpen(true)}
          className="w-full md:w-fit px-12 py-4 border-2 border-black text-sm font-black bg-white text-black hover:bg-black hover:text-white transition-all"
        >
          프로필 수정
        </button>
      </div>

      {/* 프로필 수정 모달 */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={closeEditModal}
          />

          <div className="relative w-full max-w-md bg-white border-4 border-black p-10 animate-in fade-in zoom-in duration-300">
            <button
              onClick={closeEditModal}
              className="absolute top-4 right-4 text-black hover:scale-110 transition-transform"
            >
              <FaTimes size={20} />
            </button>

            <div className="space-y-8">
              <h2 className="text-2xl font-black uppercase tracking-tighter border-b-4 border-black inline-block">
                Update Settings
              </h2>

              {/* 모달 탭 메뉴 */}
              <div className="flex border-b-2 border-gray-100">
                <button
                  onClick={() => setEditTab("nickname")}
                  className={`flex-1 py-3 text-xs font-black uppercase tracking-widest transition-all ${editTab === "nickname" ? "border-b-4 border-black text-black" : "text-gray-300"}`}
                >
                  Nickname
                </button>
                <button
                  onClick={() => setEditTab("password")}
                  className={`flex-1 py-3 text-xs font-black uppercase tracking-widest transition-all ${editTab === "password" ? "border-b-4 border-black text-black" : "text-gray-300"}`}
                >
                  Password
                </button>
              </div>

              <div className="space-y-5">
                {editTab === "nickname" ? (
                  /* 닉네임 수정 폼 */
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[12px] font-black tracking-widest">
                        새로운 닉네임
                      </label>
                      <input
                        type="text"
                        value={editForm.newNickname}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            newNickname: e.target.value,
                          })
                        }
                        className="w-full px-4 py-4 bg-white border-2 border-black outline-none text-sm font-bold"
                      />
                    </div>
                    <div className="space-y-2 pt-2">
                      <label className="text-[12px] font-black  tracking-widest">
                        비밀번호 확인
                      </label>
                      <input
                        type="password"
                        placeholder="본인 확인을 위해 입력해주세요"
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            currentPassword: e.target.value,
                          })
                        }
                        className="w-full px-4 py-4 bg-white border-2 border-black outline-none text-sm font-bold"
                      />
                    </div>
                  </div>
                ) : (
                  /* 비밀번호 수정 폼 */
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[12px] font-black  tracking-widest">
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
                        className="w-full px-4 py-4 bg-white border-2 border-black outline-none text-sm font-bold"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[12px] font-black tracking-widest">
                        새로운 비밀번호
                      </label>
                      <input
                        type="password"
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            newPassword: e.target.value,
                          })
                        }
                        className="w-full px-4 py-4 bg-white border-2 border-black outline-none text-sm font-bold"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[12px] font-black  tracking-widest">
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
                        className="w-full px-4 py-4 bg-white border-2 border-black outline-none text-sm font-bold"
                      />
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={handleUpdate}
                className="w-full py-5 bg-black text-white font-black text-sm uppercase tracking-[0.4em] hover:bg-gray-800 transition-all"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
