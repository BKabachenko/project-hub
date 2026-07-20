import type { ProjectMilestonesPayload } from '../types';

import { milestonesStatusLabels } from '@/lib/constants';
import { Card, CardContent } from '@/shared/components/ui/card';
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDescription,
  TimelineDot,
  TimelineHeader,
  TimelineItem,
  TimelineTitle,
} from '@/shared/components/ui/timeline';

interface ProjectMilestonesBlockProps {
  milestones: ProjectMilestonesPayload;
}

const ProjectMilestonesBlock = ({ milestones }: ProjectMilestonesBlockProps) => {
  return (
    <div className={'flex flex-col gap-4'}>
      <h2 className={'text-lg font-bold'}>Project milestones</h2>
      <Card>
        <CardContent>
          <Timeline>
            {milestones.map(({ id, description, status, title }) => (
              <TimelineItem key={id}>
                <TimelineDot status={status} />
                <TimelineConnector status={status} />
                <TimelineContent className={'flex flex-col gap-2'}>
                  <TimelineHeader className={'gap-4'}>
                    <TimelineDescription className={'text-xs'}>
                      {milestonesStatusLabels[status]}
                    </TimelineDescription>
                    <TimelineTitle className={'wrap-anywhere'}>{title}</TimelineTitle>
                  </TimelineHeader>
                  <TimelineDescription className={'wrap-anywhere whitespace-pre-line'}>
                    {description}
                  </TimelineDescription>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectMilestonesBlock;
