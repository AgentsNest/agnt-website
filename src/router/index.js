import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Auth/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Auth/Register.vue"),
    meta: { guestOnly: true },
  },
  {
    path: "/profile",
    name: "Profile",
    component: () =>
      import(/* webpackChunkName: "profile" */ "../views/Auth/Profile.vue"),
  },
  {
    path: "/agent-dashboard",
    name: "AgentDashboard",
    component: () =>
      import(
        /* webpackChunkName: "agent-dashboard" */ "../views/Dashboard.vue"
      ),
    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ "../views/Pages/AgentDashboard.vue"
          ),
      },
      // Graphics
      {
        path: "/graphics",
        name: "Graphic",
        component: () =>
          import(
            /* webpackChunkName: "graphic" */ "../views/Graphics/Index.vue"
          ),
      },
      {
        path: "/graphic/:id",
        name: "previewGraphic",
        meta: { authOnly: true },
        component: () =>
          import(
            /* webpackChunkName: "previewGraphic" */ "../views/Graphics/Preview.vue"
          ),
      },
      // Client Routes
      {
        path: "/clients",
        name: "Client",
        component: () =>
          import(/* webpackChunkName: "client" */ "../views/Client/Index.vue"),
      },
      {
        path: "/clients/client-profile/:id",
        name: "clientProfile",
        component: () =>
          import(
            /* webpackChunkName: "clientProfile" */ "../views/Client/clientProfile.vue"
          ),
      },
      {
        path: "/clients/add-client",
        name: "AddClient",
        component: () =>
          import(
            /* webpackChunkName: "addClient" */ "../views/Client/addClient.vue"
          ),
      },
      {
        path: "/clients/add-property/:id",
        name: "AddProperty",
        component: () =>
          import(
            /* webpackChunkName: "addProperty" */ "../views/Client/addProperty.vue"
          ),
      },
      {
        path: "/clients/single-property/:id",
        name: "singleProperty",
        component: () =>
          import(
            /* webpackChunkName: "singleProperty" */ "../views/Client/singleProperty.vue"
          ),
      },
      // Social Advertisment Routes
      {
        path: "/social-ads",
        name: "Smm",
        component: () =>
          import(/* webpackChunkName: "smm" */ "../views/Smm/Index.vue"),
      },
      {
        path: "/social-ads/create",
        name: "CreateNewAd",
        component: () =>
          import(/* webpackChunkName: "createNewAd" */ "../views/Smm/New.vue"),
      },
      {
        path: "/social-ads/checkout",
        name: "socialAdCheckout",
        component: () =>
          import(
            /* webpackChunkName: "socialAdCheckout" */ "../views/Smm/Checkout.vue"
          ),
      },
      {
        path: "/social-ads/success",
        name: "SuccessPayment",
        component: () =>
          import(
            /* webpackChunkName: "createNewAd" */ "../views/Smm/Success.vue"
          ),
      },
      {
        path: "/social-ads/failed",
        name: "FailedPayment",
        component: () =>
          import(
            /* webpackChunkName: "createNewAd" */ "../views/Smm/Failed.vue"
          ),
      },
      // Leads Routes
      {
        path: "/leads",
        name: "Leads",
        component: () =>
          import(/* webpackChunkName: "leads" */ "../views/Leads/Index.vue"),
      },
      {
        path: "/leads/add-lead",
        name: "AddLeads",
        component: () =>
          import(/* webpackChunkName: "add-leads" */ "../views/Leads/Add.vue"),
      },
      {
        path: "/leads/bulk-upload",
        name: "bulkUploadLead",
        component: () =>
          import(
            /* webpackChunkName: "bulk-upload" */ "../views/Leads/Bulk.vue"
          ),
      },
      {
        path: "/followups",
        name: "Followups",
        component: () =>
          import(
            /* webpackChunkName: "followups" */ "../views/Leads/Followups.vue"
          ),
      },

      // Websites Routes
      {
        path: "/w/:tracker/:website",
        name: "trackWebsite",
        component: () =>
          import(
            /* webpackChunkName: "track-website" */ "../views/Website/Track.vue"
          ),
      },
      {
        path: "/w/all",
        name: "Website",
        component: () =>
          import(
            /* webpackChunkName: "all-website" */ "../views/Website/Index.vue"
          ),
      },
      {
        path: "/w/my-websites",
        name: "MyWebsite",
        component: () =>
          import(
            /* webpackChunkName: "my-website" */ "../views/Website/Mywebsite.vue"
          ),
      },
      {
        path: "/w/addNew",
        name: "addNewWebsite",
        component: () =>
          import(
            /* webpackChunkName: "my-website" */ "../views/Website/AddNew.vue"
          ),
      },
      {
        path: "/w/:id",
        name: "SingleWebsite",
        component: () =>
          import(
            /* webpackChunkName: "single-website" */ "../views/Website/Single.vue"
          ),
      },

      // Setting Page - (Accoutn, Notifications, Integrations)
      {
        path: "/setting/account",
        name: "AgentAccount",
        component: () =>
          import(
            /* webpackChunkName: "accountSetting" */ "../views/Setting/Account.vue"
          ),
      },
      {
        path: "/setting/notification",
        name: "NotificationSetting",
        component: () =>
          import(
            /* webpackChunkName: "notificationSetting" */ "../views/Setting/Notification.vue"
          ),
      },
      {
        path: "/setting/integration",
        name: "Integration",
        component: () =>
          import(
            /* webpackChunkName: "integration" */ "../views/Setting/Integration.vue"
          ),
      },
      {
        path: "/setting/membership",
        name: "Membership",
        component: () =>
          import(
            /* webpackChunkName: "membership" */ "../views/Setting/Membership.vue"
          ),
      },
      {
        path: "/setting/digitalcard",
        name: "digitalCard",
        component: () =>
          import(
            /* webpackChunkName: "digitalCard" */ "../views/Setting/DigitalCard.vue"
          ),
      },

      // Managers Route
      {
        path: "/managers",
        name: "Manager",
        component: () =>
          import(
            /* webpackChunkName: "my-website" */ "../views/Managers/Index.vue"
          ),
      },

      // Teams Route
      {
        path: "/teams",
        name: "Team",
        component: () =>
          import(
            /* webpackChunkName: "my-website" */ "../views/Team/Index.vue"
          ),
      },

      // Groups
      {
        path: "/groups",
        name: "Groups",
        component: () =>
          import(
            /* webpackChunkName: "my-website" */ "../views/Group/Index.vue"
          ),
      },
      // Messages Routes
      {
        path: "/messages",
        name: "Message",
        component: () =>
          import(
            /* webpackChunkName: "my-website" */ "../views/Message/Index.vue"
          ),
      },
    ],
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
    path: "/feedback",
    name: "Feedback",
    component: () =>
      import(/* webpackChunkName: "feedback" */ "../views/Pages/Feedback.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
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
