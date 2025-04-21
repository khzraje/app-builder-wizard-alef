
import React, { useEffect, useState } from "react";
import AddMemberModal from "@/components/AddMemberModal";
import MembersList from "@/components/MembersList";
import ImportMembersButton from "@/components/ImportMembersButton";
import { Member } from "@/types/Member";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  const [members, setMembers] = useState<Member[]>([]);

  // Load members from localStorage on component mount
  useEffect(() => {
    const savedMembers = localStorage.getItem("members");
    if (savedMembers) {
      try {
        setMembers(JSON.parse(savedMembers));
      } catch (error) {
        console.error("Error parsing saved members:", error);
      }
    }
  }, []);

  // Save members to localStorage when they change
  useEffect(() => {
    localStorage.setItem("members", JSON.stringify(members));
  }, [members]);

  const handleAddMember = (newMember: Member) => {
    setMembers((prevMembers) => [...prevMembers, newMember]);
  };

  const handleDeleteMember = (id: string) => {
    setMembers((prevMembers) => prevMembers.filter((member) => member.id !== id));
  };

  const handleImportMembers = (importedMembers: Member[]) => {
    setMembers((prevMembers) => [...prevMembers, ...importedMembers]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4 max-w-6xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-primary mb-2">نظام تسجيل الأعضاء</h1>
          <p className="text-gray-600">سجل وأدر أعضاء منظمتك الخيرية بسهولة</p>
        </div>

        <div className="flex justify-end mb-6">
          <ImportMembersButton onImport={handleImportMembers} />
        </div>

        <Card className="mb-6 shadow-sm">
          <CardContent className="p-4 flex justify-between items-center">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              قائمة الأعضاء
            </div>
            <AddMemberModal onAddMember={handleAddMember} />
          </CardContent>
        </Card>

        <MembersList members={members} onDeleteMember={handleDeleteMember} />
      </div>
    </div>
  );
};

export default Index;
