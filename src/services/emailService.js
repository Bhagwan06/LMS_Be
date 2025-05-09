import { emailTransporter } from "./transport.js";
import {
  userAccountActivatedNotificationTemplete,
  userActivationUrlEmailTemplate,
} from "./emailTemplates.js";

export const userActivationUrlEmail = async (obj) => {
  const transport = emailTransporter();
  // get the transporter
  //   get the tempplate

  const info = await transport.sendMail(userActivationUrlEmailTemplate(obj));

  return info.messageId;
};

export const userActivatedNotificationEmail = async (obj) => {
  const transport = emailTransporter();
  // get the transporter
  //   get the tempplate

  const info = await transport.sendMail(
    userAccountActivatedNotificationTemplete(obj)
  );

  return info.messageId;
};
