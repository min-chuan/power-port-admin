import { type RouteRecordRaw } from 'vue-router';
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/layouts/DefaultLayout.vue'),
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/Dashboard.vue'),
      },
      {
        path: '/alarm',
        name: 'Alarm',
        component: () => import('@/views/alarm/Alarm.vue'),
      },
      {
        path: '/chargingStation/Fault',
        name: 'Fault',
        component: () => import('@/views/chargingStation/Fault.vue'),
      },
      {
        path: '/chargingStation/Monitor',
        name: 'Monitor',
        component: () => import('@/views/chargingStation/Monitor.vue'),
      },
      {
        path: '/chargingStation/Revenue',
        name: 'Revenue',
        component: () => import('@/views/chargingStation/Revenue.vue'),
      },
      {
        path: '/document',
        name: 'Document',
        component: () => import('@/views/document/Document.vue'),
      },
      {
        path: '/equipment',
        name: 'Equipment',
        component: () => import('@/views/equipment/Equipment.vue'),
      },
      {
        path: '/map',
        name: 'ElectronicMap',
        component: () => import('@/views/map/ElectronicMap.vue'),
      },
      {
        path: '/operations/Detail',
        name: 'Detail',
        component: () => import('@/views/operations/Detail.vue'),
      },
      {
        path: '/operations/Orders',
        name: 'Orders',
        component: () => import('@/views/operations/Orders.vue'),
      },
      {
        path: '/operations/Total',
        name: 'Total',
        component: () => import('@/views/operations/Total.vue'),
      },
      {
        path: '/personal',
        name: 'Personal',
        component: () => import('@/views/personal/Personal.vue'),
      },
      {
        path: '/system',
        name: 'System',
        component: () => import('@/views/system/System.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'),
  },
];
export default routes;
