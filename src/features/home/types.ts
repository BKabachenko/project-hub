import { type ProjectType } from "@/generated/prisma";
import { type LucideIcon } from "lucide-react";

export interface FeatureCardType {
  name: ProjectType;
  title: string,
  description: string,
  badgeTitle: string,
  badgeBg: string,
  icon: LucideIcon,
  iconColor: string;
  tags: string[],
}