
import React from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Member } from "@/types/Member";

interface ImportMembersButtonProps {
  onImport: (members: Member[]) => void;
}

const ImportMembersButton: React.FC<ImportMembersButtonProps> = ({ onImport }) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const importedMembers = JSON.parse(content);
        
        if (Array.isArray(importedMembers)) {
          onImport(importedMembers);
          toast({
            title: "تم الاستيراد بنجاح",
            description: `تم استيراد ${importedMembers.length} من الأعضاء`,
          });
        } else {
          toast({
            variant: "destructive",
            title: "خطأ في الاستيراد",
            description: "تنسيق الملف غير صالح",
          });
        }
      } catch (error) {
        console.error("Error parsing import file:", error);
        toast({
          variant: "destructive",
          title: "خطأ في الاستيراد",
          description: "فشل في قراءة الملف",
        });
      }

      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    };

    reader.readAsText(file);
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImport}
        accept=".json"
        className="hidden"
      />
      <Button
        variant="outline"
        className="flex items-center gap-2"
        onClick={() => fileInputRef.current?.click()}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
        استيراد الأعضاء
      </Button>
    </>
  );
};

export default ImportMembersButton;
