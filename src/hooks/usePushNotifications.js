import { useState, useEffect } from "react";
import http from "./utils/http";

import {
  isPushNotificationSupported,
  askUserPermission,
  registerServiceWorker,
  createNotificationSubscription,
  getUserSubscription,
} from "../utils/push-notifications";
//import all the function created to manage the push notifications

const pushNotificationSupported = isPushNotificationSupported();
// ကိုယ့် browser က Push Notification နဲ့ service workers ကို support လုပ်မလုပ် စစ်မယ်။

export default function usePushNotifications() {
  // Notification.permission ဆိုတာ JS ရဲ့ native func တစ်ခု၊ သူကနေ လက်ရှိ permission ရဲ့ အခြေအနေကို ပြမယ်။
  const [userConsent, setSuserConsent] = useState(Notification.permission);

  // User ရဲ့ ခွင့်ပြုချက်ကို ဒီ value နဲ့ initialize လုပ်ထားမယ်။
  const [userSubscription, setUserSubscription] = useState(null);

  //to manage the use push notification subscription
  const [pushServerSubscriptionId, setPushServerSubscriptionId] = useState();
  //to manage the push server subscription
  const [error, setError] = useState(null);
  //to manage errors
  const [loading, setLoading] = useState(true);
  //to manage async actions

  // ဒီ Effect က first render မှာသာလျှင် run မည်။
  useEffect(() => {
    if (pushNotificationSupported) {
      setLoading(true);
      setError(false);
      registerServiceWorker().then(() => {
        setLoading(false);
      });
    }
  }, []);
  // တစ်ကယ်လို့ push notifications ကို support လုပ်တယ်ဆိုရင်၊
  // service worker ကို register လုပ်မယ်။

  /**
   * registered လုပ်ထားတဲ့ service worker အတွက် notifications subscription ရှိမရှိ စစ်မယ်။
   */
  useEffect(() => {
    setLoading(true);
    setError(false);
    const getExixtingSubscription = async () => {
      const existingSubscription = await getUserSubscription();
      setUserSubscription(existingSubscription);
      setLoading(false);
    };
    getExixtingSubscription();
  }, []);
  // ဒီ Effect က first render မှာသာလျှင် run မည်။

  /**
   * user permission တောင်းသည့် function
   * user ရဲ့ခွင့်ပြုချက်ကို setSuserConsent state မှာ သိမ်းမယ်။
   * တစ်ကယ်လို့ user က deni လုပ်ရင် setError hook ထဲမှာ error ကိုဖမ်းမယ်။
   */
  const onClickAskUserPermission = () => {
    setLoading(true);
    setError(false);
    askUserPermission().then((consent) => {
      setSuserConsent(consent);
      if (consent !== "granted") {
        setError({
          name: "Consent denied",
          message: "You denied the consent to receive notifications",
          code: 0,
        });
      }
      setLoading(false);
    });
  };

  /**
   * Push Notifications ကို subscribe လုပ်မည့် function
   * subscription အဆင်ပြေတယ်ဆိုရင် setUserSubscription hook မှာသိမ်းမယ်
   */
  const onClickSusbribeToPushNotification = () => {
    setLoading(true);
    setError(false);
    createNotificationSubscription()
      .then(function (subscrition) {
        setUserSubscription(subscrition);
        setLoading(false);
      })
      .catch((err) => {
        console.error(
          "Couldn't create the notification subscription",
          err,
          "name:",
          err.name,
          "message:",
          err.message,
          "code:",
          err.code,
        );
        setError(err);
        setLoading(false);
      });
  };

  /**
   * ကိုယ့် server ဆီကို subscription ပို့မယ့် click handler
   * subscription done ပြီဆိုရင် id ကို setPushServerSubscriptionId hook သိမ်းမယ်
   */
  const onClickSendSubscriptionToPushServer = () => {
    setLoading(true);
    setError(false);
    http
      .post("/subscription", userSubscription)
      .then(function (response) {
        setPushServerSubscriptionId(response.id);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  };

  /**
   * user စီ notifications ပို့ဖို့အတွက် push server ဆီ request လုပ်သည့် click handler
   */
  const onClickSendNotification = async () => {
    setLoading(true);
    setError(false);
    await http.get(`/subscription/${pushServerSubscriptionId}`).catch((err) => {
      setLoading(false);
      setError(err);
    });
    setLoading(false);
  };

  /**
   * လိုအပ်တဲ့ component တွေကနေ တစ်ဆင့်သုံးနိုင်ဖို့ အကုန်ခွဲထုတ်မယ်
   */
  return {
    onClickAskUserPermission,
    onClickSusbribeToPushNotification,
    onClickSendSubscriptionToPushServer,
    pushServerSubscriptionId,
    onClickSendNotification,
    userConsent,
    pushNotificationSupported,
    userSubscription,
    error,
    loading,
  };
}
