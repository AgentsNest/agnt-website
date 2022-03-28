import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

function guardMyroute(to, from, next) {
  var isAuthenticated = false;
  if (localStorage.getItem("token")) isAuthenticated = true;
  else isAuthenticated = false;

  if (isAuthenticated) {
    next();
  } else {
    next("/agnt/auth/login");
  }
}

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/privacy-policy",
    name: "Policy",
    component: () =>
      import(/* webpackChunkName: "privacy" */ "../views/Pages/Privacy.vue"),
  },
  {
    path: "/agnt/auth/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Auth/Login.vue"),
  },
  {
    path: "/forgot-password",
    name: "forgotPassword",
    component: () =>
      import(
        /* webpackChunkName: "forgot-password" */ "../views/Auth/Forgot.vue"
      ),
  },
  // {
  //   path: "/agnt/auth/register",
  //   name: "Register",
  //   component: () => import("../views/Auth/Register.vue"),
  //   meta: { guestOnly: true },
  // },
  {
    path: "/profile",
    name: "Profile",
    beforeEnter: guardMyroute,
    component: () =>
      import(/* webpackChunkName: "profile" */ "../views/Auth/Profile.vue"),
  },
  {
    path: "/agent-dashboard",
    name: "AgentDashboard",
    beforeEnter: guardMyroute,
    component: () =>
      import(
        /* webpackChunkName: "agent-dashboard" */ "../views/Dashboard.vue"
      ),
    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        beforeEnter: guardMyroute,
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ "../views/Pages/AgentDashboard.vue"
          ),
      },

      // v-card
      {
        path: "/get-card",
        name: "GetCard",
        beforeEnter: guardMyroute,
        component: () =>
          import(
            /* webpackChunkName: "get-vcard" */ "../views/Pages/getCard.vue"
          ),
      },

      /*
      * = ===================================== **
      * = ===================================== **
                    Graphics Routes
      * = ===================================== **
      * = ===================================== **
      */

      {
        path: "/graphics",
        name: "Graphic",
        beforeEnter: guardMyroute,
        component: () =>
          import(
            /* webpackChunkName: "graphic" */ "../views/Graphics/Index.vue"
          ),
      },
      {
        path: "/graphic/:id",
        name: "previewGraphic",
        beforeEnter: guardMyroute,
        component: () =>
          import(
            /* webpackChunkName: "previewGraphic" */ "../views/Graphics/DesktopPreview.vue"
          ),
      },
      {
        path: "/m-graphics",
        name: "mGraphic",
        beforeEnter: guardMyroute,
        component: () =>
          import(
            /* webpackChunkName: "mgraphic" */ "../views/Graphics/mIndex.vue"
          ),
      },
      {
        path: "/m/graphic/:id",
        name: "previewMgraphic",
        beforeEnter: guardMyroute,
        component: () =>
          import(
            /* webpackChunkName: "previewGraphic" */ "../views/Graphics/mPreview.vue"
          ),
      },

      /*
      * = ===================================== **
      * = ===================================== **
                Existing Clients Routes
      * = ===================================== **
      * = ===================================== **
      */
      {
        path: "/clients",
        name: "Client",
        beforeEnter: guardMyroute,
        component: () =>
          import(/* webpackChunkName: "client" */ "../views/Client/Index.vue"),
      },
      {
        path: "/clients/client-profile/:id",
        name: "clientProfile",
        beforeEnter: guardMyroute,
        component: () =>
          import(
            /* webpackChunkName: "clientProfile" */ "../views/Client/clientProfile.vue"
          ),
      },
      {
        path: "/clients/add-client",
        name: "AddClient",
        beforeEnter: guardMyroute,
        component: () =>
          import(
            /* webpackChunkName: "addClient" */ "../views/Client/addClient.vue"
          ),
      },
      {
        path: "/clients/add-update",
        name: "sendUpdateToClient",
        beforeEnter: guardMyroute,
        component: () =>
          import(
            /* webpackChunkName: "sendUpdateToClient" */ "../views/Client/sendUpdate.vue"
          ),
      },
      {
        path: "/clients/add-property/:id",
        name: "AddProperty",
        beforeEnter: guardMyroute,
        component: () =>
          import(
            /* webpackChunkName: "addProperty" */ "../views/Client/addProperty.vue"
          ),
      },
      {
        path: "/clients/edit-property/:id",
        name: "editProperty",
        beforeEnter: guardMyroute,
        component: () =>
          import(
            /* webpackChunkName: "editProperty" */ "../views/Client/editProperty.vue"
          ),
      },
      {
        path: "/clients/single-property/:id",
        name: "singleProperty",
        beforeEnter: guardMyroute,
        component: () =>
          import(
            /* webpackChunkName: "singleProperty" */ "../views/Client/singleProperty.vue"
          ),
      },

      /*
      * = ===================================== **
      * = ===================================== **
                Social Ads Manager Routes
      * = ===================================== **
      * = ===================================== **
      */
      {
        path: "/social-ads",
        name: "Smm",
        beforeEnter: guardMyroute,
        component: () =>
          import(/* webpackChunkName: "smm" */ "../views/Smm/Index.vue"),
      },
      {
        path: "/social-ads/create",
        name: "CreateNewAd",
        beforeEnter: guardMyroute,
        component: () =>
          import(/* webpackChunkName: "createNewAd" */ "../views/Smm/New.vue"),
      },
      {
        path: "/social-ads/checkout",
        name: "socialAdCheckout",
        beforeEnter: guardMyroute,
        component: () =>
          import(
            /* webpackChunkName: "socialAdCheckout" */ "../views/Smm/Checkout.vue"
          ),
      },
      {
        path: "/social-ads/success",
        name: "SuccessPayment",
        beforeEnter: guardMyroute,
        component: () =>
          import(
            /* webpackChunkName: "createNewAd" */ "../views/Smm/Success.vue"
          ),
      },
      {
        path: "/social-ads/failed",
        name: "FailedPayment",
        beforeEnter: guardMyroute,
        component: () =>
          import(
            /* webpackChunkName: "createNewAd" */ "../views/Smm/Failed.vue"
          ),
      },

      /*
      * = ===================================== **
      * = ===================================== **
                    Leads Routes
      * = ===================================== **
      * = ===================================== **
      */
      {
        path: "/leads",
        name: "Leads",
        beforeEnter: guardMyroute,
        component: () =>
          import(/* webpackChunkName: "leads" */ "../views/Leads/Index.vue"),
      },
      {
        path: "/m-leads",
        name: "mLeads",
        beforeEnter: guardMyroute,
        component: () =>
          import(/* webpackChunkName: "m-leads" */ "../views/Leads/mIndex.vue"),
      },
      {
        path: "/lead/:id",
        name: "singleLead",
        beforeEnter: guardMyroute,
        component: () =>
          import(
            /* webpackChunkName: "single-leads" */ "../views/Leads/Single.vue"
          ),
      },
      {
        path: "/leads/hot",
        name: "HotLeads",
        beforeEnter: guardMyroute,
        component: () =>
          import(
            /* webpackChunkName: "hot-leads" */ "../views/Leads/HotLeads.vue"
          ),
      },
      {
        path: "/leads/add-lead",
        name: "AddLeads",
        beforeEnter: guardMyroute,
        component: () =>
          import(/* webpackChunkName: "add-leads" */ "../views/Leads/Add.vue"),
      },
      {
        path: "/leads/bulk-upload",
        name: "bulkUploadLead",
        beforeEnter: guardMyroute,
        component: () =>
          import(
            /* webpackChunkName: "bulk-upload" */ "../views/Leads/Bulk.vue"
          ),
      },
      {
        path: "/followups",
        name: "Followups",
        beforeEnter: guardMyroute,
        component: () =>
          import(
            /* webpackChunkName: "followups" */ "../views/Leads/Followups.vue"
          ),
      },

      /*
      * = ===================================== **
      * = ===================================== **
                    Websites Routes
      * = ===================================== **
      * = ===================================== **
      */
      {
        path: "/w/all",
        name: "Website",
        beforeEnter: guardMyroute,
        component: () =>
          import(
            /* webpackChunkName: "all-website" */ "../views/Website/Index.vue"
          ),
      },
      {
        path: "/w/my-websites",
        name: "MyWebsite",
        beforeEnter: guardMyroute,
        component: () =>
          import(
            /* webpackChunkName: "my-website" */ "../views/Website/Mywebsite.vue"
          ),
      },
      {
        path: "/w/addNew",
        name: "addNewWebsite",
        beforeEnter: guardMyroute,
        component: () =>
          import(
            /* webpackChunkName: "add-new-website" */ "../views/Website/AddNew.vue"
          ),
      },
      {
        path: "/w/info/:id",
        name: "WebsiteDetails",
        beforeEnter: guardMyroute,
        component: () =>
          import(
            /* webpackChunkName: "website-details" */ "../views/Website/websiteDetails.vue"
          ),
      },

      /*
      * = =====================================
                Setting Page - 
        (Accoutn, Notifications, Integrations) 
                    Routes
      * = =====================================
      */
      {
        path: "/setting/account",
        name: "AgentAccount",
        beforeEnter: guardMyroute,
        component: () =>
          import(
            /* webpackChunkName: "accountSetting" */ "../views/Setting/Account.vue"
          ),
      },
      {
        path: "/setting/notification",
        name: "NotificationSetting",
        beforeEnter: guardMyroute,
        component: () =>
          import(
            /* webpackChunkName: "notificationSetting" */ "../views/Setting/Notification.vue"
          ),
      },
      {
        path: "/setting/integration",
        name: "Integration",
        beforeEnter: guardMyroute,
        component: () =>
          import(
            /* webpackChunkName: "integration" */ "../views/Setting/Integration.vue"
          ),
      },
      {
        path: "/webhook",
        name: "payWebhook",
        beforeEnter: guardMyroute,
        component: () =>
          import(
            /* webpackChunkName: "paywebhook" */ "../views/Webhook/Index.vue"
          ),
      },
      {
        path: "/setting/membership",
        name: "Membership",
        beforeEnter: guardMyroute,
        component: () =>
          import(
            /* webpackChunkName: "membership" */ "../views/Setting/Membership.vue"
          ),
      },
      {
        path: "/setting/digitalcard",
        name: "digitalCard",
        beforeEnter: guardMyroute,
        component: () =>
          import(
            /* webpackChunkName: "digitalCard" */ "../views/Setting/DigitalCard.vue"
          ),
      },

      /*
      * = ===================================== **
      * = ===================================== **
                    Managers Routes
      * = ===================================== **
      * = ===================================== **
      */
      {
        path: "/managers",
        name: "Manager",
        beforeEnter: guardMyroute,
        component: () =>
          import(
            /* webpackChunkName: "my-website" */ "../views/Managers/Index.vue"
          ),
      },

      /*
      * = ===================================== **
      * = ===================================== **
                    Teams Routes
      * = ===================================== **
      * = ===================================== **
      */

      {
        path: "/teams",
        name: "Team",
        beforeEnter: guardMyroute,
        component: () =>
          import(/* webpackChunkName: "my-team" */ "../views/Team/Index.vue"),
      },
      {
        path: "/team/:id",
        name: "teamLeads",
        beforeEnter: guardMyroute,
        component: () =>
          import(
            /* webpackChunkName: "team-leads" */ "../views/Team/Single.vue"
          ),
      },

      /*
      * = ===================================== **
      * = ===================================== **
                    Groups Routes
      * = ===================================== **
      * = ===================================== **
      */
      {
        path: "/groups",
        name: "Groups",
        beforeEnter: guardMyroute,
        component: () =>
          import(
            /* webpackChunkName: "my-website" */ "../views/Group/Index.vue"
          ),
      },

      /*
      * = ===================================== **
      * = ===================================== **
                    Messages Routes
      * = ===================================== **
      * = ===================================== **
      */
      {
        path: "/messages",
        name: "Message",
        beforeEnter: guardMyroute,
        component: () =>
          import(
            /* webpackChunkName: "my-website" */ "../views/Message/Index.vue"
          ),
      },
    ],
  },
  {
    path: "/w/:id",
    name: "SingleWebsite",
    beforeEnter: guardMyroute,
    component: () =>
      import(
        /* webpackChunkName: "single-website" */ "../views/Website/Single.vue"
      ),
  },
  {
    // path: "/w/:tracker/:website",
    path: "/wt/:tracker/:share",
    name: "trackWebsite",
    component: () =>
      import(
        /* webpackChunkName: "track-website" */ "../views/Website/Track.vue"
      ),
  },
  {
    path: "/tell-friend",
    name: "tellFriend",
    component: () =>
      import(
        /* webpackChunkName: "tellFriend" */ "../views/Pages/tellFriend.vue"
      ),
  },
  {
    path: "/wallet",
    name: "Wallet",
    beforeEnter: guardMyroute,
    component: () =>
      import(/* webpackChunkName: "wallet" */ "../views/Setting/Wallet.vue"),
  },
  {
    path: "/feedback",
    name: "Feedback",
    beforeEnter: guardMyroute,

    component: () =>
      import(/* webpackChunkName: "feedback" */ "../views/Pages/Feedback.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/me/:uid",
    name: "vCard",
    component: () =>
      import(/* webpackChunkName: "vCard" */ "../views/Auth/vcard.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: "active",
  linkExactActiveClass: "exact-active",
});

export default router;
