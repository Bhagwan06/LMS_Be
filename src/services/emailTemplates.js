export const userActivationUrlEmailTemplate = ({ email, name, url }) => {
  return {
    from: `"Local Library" <${process.env.SMTP_EMAIL}>`, // sender address
    to: email, // list of receivers
    subject: "Action Required - Activate your new account", // Subject line
    text: `hello${name} follow the link to activate your account.${url}`, // plain text body
    html: `
   <p>Hello ${name}</p>;
   
<br/>
<br/>

<p>Your account has been created. Click the button to activate your account</p>

<br/>
<br/>

<a href =${url}>
<button style="background: green; color: white; padding: 2rem">Activate Now</button></a>


<br/>
<br/>

Regards,
<br/>
-----

    `, // html body
  };
};

export const userAccountActivatedNotificationTemplete = ({
  email,
  name,
  url,
}) => {
  return {
    from: `"Local Library" <${process.env.SMTP_EMAIL}>`, // sender address
    to: email, // list of receivers
    subject: "Your account is now active", // Subject line
    text: `hello ${name} Your account is ready to use. You may go and sign in now.${url}`, // plain text body
    html: `
   <p>Hello ${name}</p>;
   
<br/>
<br/>

<p>Your account is ready to use. You may go and sign in now.</p>

<br/>
<br/>

// optional//

<a href =${url}>
<button style="background: green; color: white; padding: 2rem">Activate Now</button></a>


<br/>
<br/>

Regards,
<br/>
-----

    `, // html body
  };
};
