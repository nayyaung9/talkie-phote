const pushServerPublicKey =
  "BIN2Jc5Vmkmy-S3AUrcMlpKxJpLeVRAfu9WBqUbJ70SJOCWGCGXKY-Xzyh7HDr6KbRDGYHjqZ06OcS3BjD7uAm8";

/**
 * ကိုယ့် browser က Push Notification နဲ့ service workers ကို support လုပ်မလုပ် စစ်မယ်။
 *
 * serviceWorker အတွက် navigator မှာစစ်
 * PushManager အတွက် window မှာစစ်
 */

function isPushNotificationSupported() {
  return "serviceWorker" in navigator && "PushManager" in window;
}

// ဒုတိယအဆင့်အနေနဲ့ service worker ကို register လုပ်မယ်။
function registerServiceWorker() {
  return navigator.serviceWorker.register("/notification-sw.js");
}

// တတိယအဆင့်မှာ User ကို notification permission တောင်းရမယ်။
async function askUserPermission() {
  return await Notification.requestPermission();
}

// service worker လည်း register ပြီးပြီ၊ permission လည်းရပြီဆိုတော့၊ user ကို subscribe လုပ်ဖို့ ဒီလိုရေးမယ်
async function createNotificationSubscription() {
  //service worker installation ကို ready ဖြစ်တဲ့အထိစောင့်မယ်။
  const serviceWorker = await navigator.serviceWorker.ready;
  // subscribe and return the subscription
  return await serviceWorker.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: pushServerPublicKey,
  });
}

/**
 * subscription ရှိမရှိစစ်မယ်
 */
function getUserSubscription() {
  //service worker installation ကို ready ဖြစ်တဲ့အထိစောင့်မယ်။
  return navigator.serviceWorker.ready
    .then(function (serviceWorker) {
      return serviceWorker.pushManager.getSubscription();
    })
    .then(function (pushSubscription) {
      return pushSubscription;
    });
}

export {
  isPushNotificationSupported,
  registerServiceWorker,
  askUserPermission,
  createNotificationSubscription,
  getUserSubscription,
};
