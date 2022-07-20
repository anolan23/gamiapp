import SidebarManage from '../SidebarManage';

interface Props {
  children: React.ReactNode;
}

function ManagerDashboard({ children }: Props) {
  return (
    <div className="manager-dashboard">
      <SidebarManage />
      {children}
    </div>
  );
}

export default ManagerDashboard;
