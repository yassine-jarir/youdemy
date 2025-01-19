import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
  { key: 'overview', title: 'Vue d\'ensemble', href: paths.dashboard.overview, icon: 'chart-pie' },
  { key: 'Gestion des enseignants ', title: 'Gestion des enseignants ',
     href: paths.dashboard.teacherManage, icon: 'users' },
  { key: 'Gestion des Contenus', title: ' Gestion des Contenus', href: paths.dashboard.ContenusManage, icon: 'plugs-connected' },
  { key: 'Gestion des utilisateurs', title: 'Gestion des Utilisateurs', href: paths.dashboard.usersManage, icon: 'gear-six' },
  // { key: 'Visiteur', title: 'Visiteur', href: paths.dashboard.Visiteur, icon: 'user' },
 ] satisfies NavItemConfig[];
