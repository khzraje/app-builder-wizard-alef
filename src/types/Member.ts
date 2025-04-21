
export interface Member {
  id: string;
  name: string;
  phoneNumber: string;
  email: string;
  rank: string;
  department: string;
  joinDate: string;
}

export const RankOptions = [
  "مدير",
  "مشرف",
  "موظف",
  "متطوع",
  "متدرب",
];

export const DepartmentOptions = [
  "الإدارة",
  "الموارد البشرية",
  "التسويق",
  "المالية",
  "تقنية المعلومات",
  "التطوير",
  "الدعم",
  "العمليات",
];
