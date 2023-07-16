
import { createRouter, createWebHistory } from 'vue-router'
import AdHome from '../pages/Admin/AdHome'
import LoginSample from '../pages/LoginSample.vue'
import BranchPage from '../pages/Admin/BranchPage.vue'
import ManagerHome from '../pages/Manager/ManagerHome.vue'
import BranchesDashboard from '../components/Admin/BranchesDashboard.vue'
import leadPage from '../components/Admin/leadPage.vue'
import AssignLeads from '../components/Admin/AssignLeads.vue'
import Home from '../views/HomeView.vue'
import Adminempl from '../components/Admin/AdminEmployee.vue'
import ManEmp from '../components/Manager/managercomponents/ManEmp.vue'
import adminintl from '../components/Admin/InterestedLeads.vue'

// import NotFound from './views/NotFound.vue';
// import EmpPage from '../pages/Admin/EmpView.vue'

import Targetpage from '../pages/Admin/AdTarget.vue'

import AdPayment from '../pages/Admin/AdPaymen.vue'
import Adsplc from '../pages/Admin/AdSplc.vue'
import AdLeadRequest from '../pages/Admin/AdLeadRequest.vue'
import Adminlead from '../components/Admin/leadPage.vue'
import accounts from '../components/Admin/AdminAccounts.vue'
import sp from '../components/Admin/SamplePage.vue'
// admin home page multi routing
import BranchAssign from '../components/Admin/BranchAssig.vue'
import RL from '../components/Admin/RemainingL.vue'
import Rem from '../components/Admin/RemBranch.vue'
import AddDnd from '../components/Admin/NotD.vue'
import dndl from '../components/Admin/DndLeads.vue'
import LeadpB from '../components/Admin/LeadsPBranch.vue'
import salesdb from '../components/Admin/salesdata/SalesD.vue'
import sb from '../components/Admin/salesdata/SalesB.vue'
import lr from '../components/Admin/LoginReport.vue'
import LE from '../components/Admin/LoginEmp.vue'
import LD from '../components/Admin/LeadsDetail.vue'
import LAP from '../pages/LoginApprove.vue'
// end of multi routing
// admin card routing
import achat from '../components/Admin/ChatAdmin.vue'
import UL from '../components/Admin/cardsleads/UploadedLeads.vue'
import salesemp from '../components/Admin/salesdata/SalesEmp.vue'
import delul from '../components/Admin/cardsleads/DelUlead.vue'
import mv from '../views/MessageV.vue'

// end cards routing

//manager imports
import LeadsView from '../pages/Manager/LeadsView.vue'
import Payment from '../pages/Manager/PaymentView.vue'
import RequestLead from '../pages/Manager/ReqleadsView.vue'
import MgHome from '../pages/Manager/HomeView.vue'
import Target from '../pages/Manager/TargetView.vue'
import splclient from '../components/Manager/SplClients.vue'
import mngemp from '../pages/Manager/EmpView.vue'
import Asl from '../components/Manager/managercomponents/AssignLeads.vue'
import dnd from '../components/Manager/MDnd.vue'
import leadsdata from '../components/Manager/LeadsData.vue'
import msales from '../components/Manager/LeadSales.vue'

// end of manager imports 
// Employee imports 
import EmpHome from '../pages/Employee/EmpHome.vue'
import EmpLeadRequest from '../components/Employee/EmpReqLead.vue'
import EmpTarget from '../pages/Employee/EmptargetView.vue'
import Empleads from '../pages/Employee/EmpLeads.vue'
import empl from '../components/Employee/EmpLeads.vue'
import Notinterestedleads from '../components/Employee/NotInterestedLead.vue'
import interestedleads from '../components/Employee/InterestedLeads.vue'
import Empsplc from '../components/Employee/EmpspclClient.vue'
import EmpPayment from '../components/Employee/EmpPayment.vue'
import EmpnewPayment from '../components/Employee/NewPayment.vue'
import futurepay from '../components/Employee/FutPayment.vue'
// import empchat from '../components/Employee/EmpMsg.vue'
import Dnd from '../components/Employee/DndLeads.vue'
import followup from '../components/Employee/LeadFollowup.vue'
import busy from '../components/Employee/BusyLeads.vue'
import partial from '../components/Employee/PartialPayments.vue'
import empchat from '../components/Employee/ChatEmp.vue'
// import addpayment from '../components/Employee/AddPayment.vue'
// employee imports
// import axios from 'axios'

const routes = [
  // cards routing
  {
    path: '/ul',
    name: 'ul',
    component:UL,
    meta: {
      requiresAuth: true,
      role: 'admin'
    } 
  },
  {
    path: '/LAP/:employeeName',
    name: 'LAP',
    component:LAP,
    // meta: {
    //   requiresAuth: true,
    //   role: 'admin'
    // } 
  },
  {
    path: '/LD',
    name: 'lead-page',
    component:LD,
    props: true,
    meta: {
      requiresAuth: true,
      role: 'admin'
    } 
  },
  {
    path: '/dul',
    name: 'dul',
    component:delul,
    meta: {
      requiresAuth: true,
      role: 'admin'
    } 
  },


  // card routing end
 
  {
    path: '/',
    name: 'home',
    component: LoginSample,
  
  },
  {
    path: '/mv',
    name: 'mv',
    component: mv
  
  },
  {
    path: '/adchat',
    name: 'adchat',
    component: achat,
  
  },
  {
    path: '/salesemp',
    name: 'salesemp',
    component: salesemp,
  
  },
  
  
  {
    path: '/sp',
    name: 'sp',
    component:sp,
    meta: {
      requiresAuth: true,
      role: 'admin'
    } 
  },
  // {
  //   path: '/EmpPage',
  //   name: 'EmpPage',
  //   component: EmpPage
  // },
  {
    path: '/interest',
    name: 'adminintl',
    component: adminintl,
    meta: {
      requiresAuth: true,
      role: 'admin'
    } 
  },
  {
    path: '/hv',
    name: 'hv',
    component: Home,
    // meta: {
    //   requiresAuth: true,
    //   role: 'admin'
    // } 
  },
  {
    path: '/lp',
    name: 'lp',
    component: leadPage,
    meta: {
      requiresAuth: true,
      role: 'admin'
    } 
  },
  {
    path: '/assign',
    name: 'assign',
    component: AssignLeads,
    meta: {
      requiresAuth: true,
      role: 'admin'
    } 
  },
  {
    path: '/AdTarget',
    name: 'monthlytarget',
    component:Targetpage,
    meta: {
      requiresAuth: true,
      role: 'admin'
    } 
  },
  {
    path: '/AEmp',
    name: 'adminemp',
    component:Adminempl,
    meta: {
      requiresAuth: true,
      role: 'admin'
    } 

  },
  {
    path: '/Adpay',
    name: 'adpay',
    component: AdPayment,
    meta: {
      requiresAuth: true,
      role: 'admin'
    } 
  },
  {
    path: '/Adsplc',
    name: 'adsplc',
    component: Adsplc,
    meta: {
      requiresAuth: true,
      role: 'admin'
    } 
  },
  {
    path: '/accounts',
    name: 'accounts',
    component: accounts,
    meta: {
      requiresAuth: true,
      role: 'admin'
    } 
  },
  {
    path: '/Adleads',
    name: 'adleads',
    component: Adminlead,
    meta: {
      requiresAuth: true,
      role: 'admin'
    } 
  },
  {
    path: '/Bassin',
    name: 'bassign',
    component: BranchAssign,
    meta: {
      requiresAuth: true,
      role: 'admin'
    } 
  },
  {
    path: '/RL',
    name: 'RL',
    component:RL,
    props: true,
    meta: {
      requiresAuth: true,
      role: 'admin'
    } 
  },
  {
    path: '/addnd',
    name: 'addnd',
    component:AddDnd,
    meta: {
      requiresAuth: true,
      role: 'admin'
    } 
  },
  {
    path: '/lr',
    name: 'lr',
    component:lr,
    meta: {
      requiresAuth: true,
      role: 'admin'
    } 
  },
  {
    path: '/LE/:name',
    name: 'LE',
    component:LE,
    props: true,
    meta: {
      requiresAuth: true,
      role: 'admin'
    } 
  },
  {
    path: '/lpb',
    name: 'lpb',
    component:LeadpB,
    meta: {
      requiresAuth: true,
      role: 'admin'
    } 
  },
  {
    path: '/sdb',
    name: 'sdb',
    component:salesdb,
    meta: {
      requiresAuth: true,
      role: 'admin'
    } 
  },
  {
    path: '/sb',
    name: 'sb',
    component:sb,
    meta: {
      requiresAuth: true,
      role: 'admin'
    } 
  },
  {
    path: '/dl',
    name: 'dl',
    component:dndl,
    meta: {
      requiresAuth: true,
      role: 'admin'
    } 
  },
  {
    path: '/Rem/:branch/:status',
    name: 'Rem',
    component:Rem,
    props:true,
    meta: {
      requiresAuth: true,
      role: 'admin'
    } 
  },
  
  {
    path: '/AdLeadRequest',
    name: 'AdLeadRequest',
    component: AdLeadRequest,
    meta: {
      requiresAuth: true,
      role: 'admin'
    } 
  },
  {
    path: '/AdHome',
    name: 'adhome',
    component: AdHome,
    meta: {
      requiresAuth: true,
      role: 'admin'
    } // Add meta field to indicate that this route requires authentication
  },
  {
    path: '/Branch',
    name: 'branch',
    component: BranchPage,
    meta: { requiresAuth: true } // Add meta field to indicate that this route requires authentication
  },
  {
    path: '/MgHome/',
    name: 'mghome',
    component: ManagerHome,
    props: true,
    meta: {
      requiresAuth: true,
      role: 'manager'
    }
  },
  {
    path: '/branch/:branchname',
    name: 'BranchesDashboard',
    component:BranchesDashboard,
    meta: {
      requiresAuth: true,
     
    }// Add meta field to indicate that this route requires authentication
  },
  {
    path: '/ManEmp/:branchName/:manager',
    name: 'manemp',
    component:ManEmp,
    props: true,
    meta: {
      requiresAuth: true,
      role: 'manager'
    } // Add meta field to indicate that this route requires authentication
  },
  
  // manager componenets routing
  {
    path: '/ML/:branchName/:manager',
    name: 'LeadsV',
    component:LeadsView,
    props: true,
    meta: {
      requiresAuth: true,
      role: 'manager'
    } // Add meta field to indicate that this route requires authentication
  }
,
{
  path: '/Payment/:branchName/:manager',
  name: 'payment',
  component:Payment,
  props: true,
  meta: {
    requiresAuth: true,
    role: 'manager'
  }
},
{
  path: '/msales/:branchName/:manager',
  name: 'msales',
  component:msales,
  props: true,
  meta: {
    requiresAuth: true,
    role: 'manager'
  }
},
{
  path: '/LD/:branchName/:manager',
  name: 'LD',
  component:leadsdata,
  props: true,
  meta: {
    requiresAuth: true,
    role: 'manager'
  }
},
{
  path: '/dnd/:branchName/:manager',
  name: 'dnd',
  component:dnd,
  props: true,
  meta: {
    requiresAuth: true,
    role: 'manager'
  }
},
{
  path: '/RequestLead/:branchName/:manager',
  name: 'leadrequest',
  component:RequestLead,
  props: true,
  meta: {
    requiresAuth: true,
    role: 'manager'
  }
},
{
  path: '/Target/:branchName/:manager',
  name: 'Target',
  component:Target,
  props: true,
  meta: {
    requiresAuth: true,
    role: 'manager'
  }
},
{
  path:'/MgHome/:branchName/:manager',
  name: 'mghome',
  component:MgHome,
  props: true,
  meta: {
    requiresAuth: true,
    role: 'manager'
  }
},
{
  path: '/splc/:branchName/:manager',
  name: 'splclients',
  component:splclient,
  props: true,
},
{
  path: '/mngemp/:branchName/:manager',
  name: 'managemp',
  component:mngemp,
  props: true,
},
{
  path: '/Asl/:branchName/:manager',
  name: 'asl',
  component:Asl,
  props: true,
},
// end of manager routing
// emp routing
{
  path: '/emphome/:employeeName',
  name: 'emphome',
  component:EmpHome,
},
{
  path: '/emplead/:employeeName',
  name: 'emplead',
  component:Empleads,
},
{
  path: '/emptarget/:employeeName',
  name: 'emptarget',
  component:EmpTarget,
},
{
  path: '/empchat/:employeeName',
  name: 'empchat',
  component:empchat,
},

{
  path: '/el/:employeeName',
  name: 'el',
  component:empl,
},
{
  path: '/Intlead/:employeeName',
  name: 'intlead',
  component:interestedleads,
},
{
  path: '/NotIntlead/:employeeName',
  name: 'NOtintlead',
  component:Notinterestedleads,
},
{
  path: '/Dnd/:employeeName',
  name: 'Dnd',
  component:Dnd,
},
{
  path: '/busy/:employeeName',
  name: 'busy',
  component:busy,
},
{
  path: '/Followup/:employeeName',
  name: 'followup',
  component:followup,
},
{
  path: '/Leadrequest/:employeeName',
  name: 'leadrequest',
  component:EmpLeadRequest,
},
{
  path: '/empspcl/:employeeName',
  name: 'emplspcl',
  component:Empsplc,
},
{
  path: '/Emppay/:employeeName',
  name: 'emppay',
  component:EmpPayment,
},
{
  path: '/newpayment/:employeeName',
  name: 'empnewpay',
  component:EmpnewPayment,
},
{
  path: '/futurepay/:employeeName',
  name: 'futurepay',
  component:futurepay,
},
{
  path: '/partial/:employeeName',
  name: 'partial',
  component:partial,
},
{
  path: '/empchat',
  name: 'empchat',
  component:empchat,
},

// {
//   path: '/newpayment/:employeeName',
//   name: 'newpayment',
//   component:addpayment,
// },



//  end of emp routing
// {
//   path: '/MgHome/:branchName',
//   name: 'mghome',
//   component: ManagerHome,
//   meta: {
//     requiresAuth: true,
//     role: 'manager'
//   }// Add meta field to indicate that this route requires authentication
// },
  // end of manager routing
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// Add navigation guard to check if the user is logged in before allowing access to the route
// router.beforeEach((to, from, next) => {
//   const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
//   const userRole = localStorage.getItem('userRole')
//   const token = localStorage.getItem('token')

//   if (to.meta.requiresAuth && !isLoggedIn) {
//     next('/') // Redirect to login page if the user is not logged in
//   } else if (to.meta.requiresAdminAuth && isLoggedIn && userRole !== 'admin') {
//     next('/') // Redirect to login page if the user is not an admin
//   } else if (to.meta.requiresManagerAuth && isLoggedIn && userRole !== 'manager') {
//     next('/') // Redirect to login page if the user is not a manager
//   } else if (isLoggedIn && token) {
//     // Set the JWT token as the default authorization header for axios
//     axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
//     next() // Allow access to the route
//   } else {
//     next() // Allow access to the route
//   }
// })
router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const userRole = localStorage.getItem('userRole');
  // router.app.$data.isLoading = true;
  try{
    if (to.meta.requiresAuth) {
      if (!isLoggedIn) {
        next('/') // Redirect to login page if the user is not logged in
      } else if (to.meta.role && to.meta.role !== userRole) {
        next('/') // Redirect to access denied page if the user is not authorized
      } else {
        next() // Allow access to the route
      }
    } else {
      next() // Allow access to the public route
    }
  }
  catch (error) {
    console.error(error);
    // Handle error if necessary
    next('/login');
  } finally {
    // Hide loading indicator after the route is resolved
    router.app.$data.isLoading = false;
  }

 
});



export default router
