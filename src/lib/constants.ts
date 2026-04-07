import {
  MemberRole,
  ProjectCategory,
  ProjectMemberStatus,
  ProjectStatus,
  ProjectType,
  UserStatus,
} from '@/generated/prisma';

export type ActionState = {
  success: boolean;
  message?: string;
  error?: string;
  fieldErrors?: Record<string, string[]>;
};

export const initialState: ActionState = {
  success: false,
};

export const userStatusLabels: Record<UserStatus, string> = {
  [UserStatus.ACTIVE]: 'Active',
  [UserStatus.DELETED]: 'Deleted',
  [UserStatus.BANNED]: 'Banned',
};

export const memberRoleLabels: Record<MemberRole, string> = {
  [MemberRole.FRONTEND_DEVELOPER]: 'Frontend Developer',
  [MemberRole.BACKEND_DEVELOPER]: 'Backend Developer',
  [MemberRole.FULLSTACK_DEVELOPER]: 'Fullstack Developer',
  [MemberRole.PROJECT_MANAGER]: 'Project Manager',
  [MemberRole.UI_UX_DESIGNER]: 'UI/UX Designer',
  [MemberRole.QA_ENGINEER]: 'QA Engineer',
  [MemberRole.DEVOPS_ENGINEER]: 'DevOps Engineer',
  [MemberRole.BUSINESS_ANALYST]: 'Business Analyst',
  [MemberRole.DATA_SCIENTIST]: 'Data Scientist',
  [MemberRole.MARKETING_SPECIALIST]: 'Marketing Specialist',
  [MemberRole.OWNER]: 'Owner',
};

export const projectStatusLabels: Record<ProjectStatus, string> = {
  [ProjectStatus.ACTIVE]: 'Active',
  [ProjectStatus.FINISHED]: 'Finished',
  [ProjectStatus.CLOSED]: 'Closed',
};

export const projectMemberStatusLabels: Record<ProjectMemberStatus, string> = {
  [ProjectMemberStatus.PENDING]: 'Pending',
  [ProjectMemberStatus.APPROVED]: 'Approved',
  [ProjectMemberStatus.DECLINED]: 'Declined',
};

export const projectCategoryLabels: Record<ProjectCategory, string> = {
  [ProjectCategory.E_COMMERCE]: 'E-commerce',
  [ProjectCategory.EDUCATION]: 'Education',
  [ProjectCategory.HEALTHCARE]: 'Healthcare',
  [ProjectCategory.FINANCE]: 'Finance',
  [ProjectCategory.SOCIAL_NETWORK]: 'Social Network',
  [ProjectCategory.PRODUCTIVITY]: 'Productivity',
  [ProjectCategory.ENTERTAINMENT]: 'Entertainment',
  [ProjectCategory.REAL_ESTATE]: 'Real Estate',
  [ProjectCategory.TRAVEL]: 'Travel',
  [ProjectCategory.FOOD_DELIVERY]: 'Food Delivery',
  [ProjectCategory.LOGISTICS]: 'Logistics',
  [ProjectCategory.SAAS]: 'SaaS',
  [ProjectCategory.ARTIFICIAL_INTELLIGENCE]: 'Artificial Intelligence',
  [ProjectCategory.BLOCKCHAIN]: 'Blockchain',
  [ProjectCategory.IOT]: 'IoT',
  [ProjectCategory.GAMING]: 'Gaming',
  [ProjectCategory.FITNESS]: 'Fitness',
  [ProjectCategory.MUSIC]: 'Music',
  [ProjectCategory.VIDEO]: 'Video',
  [ProjectCategory.NEWS]: 'News',
  [ProjectCategory.JOB_BOARD]: 'Job Board',
  [ProjectCategory.DATING]: 'Dating',
  [ProjectCategory.CROWDFUNDING]: 'Crowdfunding',
  [ProjectCategory.CRM]: 'CRM',
  [ProjectCategory.ERP]: 'ERP',
  [ProjectCategory.MARKETPLACE]: 'Marketplace',
  [ProjectCategory.STREAMING]: 'Streaming',
  [ProjectCategory.ANALYTICS]: 'Analytics',
  [ProjectCategory.CYBERSECURITY]: 'Cybersecurity',
  [ProjectCategory.AR_VR]: 'AR / VR',
};

export const projectTypeLabels: Record<ProjectType, string> = {
  [ProjectType.PET_PROJECT]: 'Pet Project',
  [ProjectType.COMMERCIAL]: 'Commercial',
  [ProjectType.OPEN_SOURCE]: 'Open Source',
  [ProjectType.CHARITY]: 'Charity',
};
