import { Event } from '../../hooks/useEvents';
import SidebarManage from '../SidebarManage';

interface Props {
  event: Event;
  children: React.ReactNode;
}

function ManagerDashboard({ event, children }: Props) {
  return (
    <div className="manager-dashboard">
      <SidebarManage event={event} />
      <div className="manager-dashboard__content">{children}</div>
    </div>
  );
}

export default ManagerDashboard;
