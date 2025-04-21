
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DepartmentOptions, Member, RankOptions } from "@/types/Member";
import { toast } from "@/components/ui/use-toast";
import { v4 as uuidv4 } from "uuid";

interface AddMemberModalProps {
  onAddMember: (member: Member) => void;
}

const AddMemberModal: React.FC<AddMemberModalProps> = ({ onAddMember }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [rank, setRank] = useState("");
  const [department, setDepartment] = useState("");
  const [joinDate, setJoinDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    if (!name || !phoneNumber || !email || !rank || !department || !joinDate) {
      toast({
        variant: "destructive",
        title: "خطأ في الإدخال",
        description: "الرجاء ملء جميع الحقول المطلوبة",
      });
      return;
    }

    // Create new member
    const newMember: Member = {
      id: uuidv4(),
      name,
      phoneNumber,
      email,
      rank,
      department,
      joinDate,
    };

    onAddMember(newMember);
    
    // Clear form
    setName("");
    setPhoneNumber("");
    setEmail("");
    setRank("");
    setDepartment("");
    setJoinDate("");
    
    // Close modal
    setOpen(false);

    toast({
      title: "تم إضافة العضو",
      description: `تم إضافة ${name} بنجاح`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary text-primary-foreground flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          إضافة عضو جديد
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">إضافة عضو جديد</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">الاسم</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="أدخل اسم العضو"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phoneNumber">رقم الهاتف</Label>
            <Input
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="أدخل رقم الهاتف"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">البريد الإلكتروني</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="أدخل البريد الإلكتروني"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="rank">الرتبة</Label>
            <Select value={rank} onValueChange={setRank}>
              <SelectTrigger>
                <SelectValue placeholder="اختر الرتبة" />
              </SelectTrigger>
              <SelectContent>
                {RankOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="department">القسم</Label>
            <Select value={department} onValueChange={setDepartment}>
              <SelectTrigger>
                <SelectValue placeholder="اختر القسم" />
              </SelectTrigger>
              <SelectContent>
                {DepartmentOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="joinDate">تاريخ الانضمام</Label>
            <Input
              id="joinDate"
              type="date"
              value={joinDate}
              onChange={(e) => setJoinDate(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full bg-primary text-primary-foreground">
            إضافة عضو جديد
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddMemberModal;
