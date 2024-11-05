// import { Resend } from "resend";

// const resend = new Resend(process.env.RESEND_API);

// export const sendVerificationEmail = async (to, verificationLink) => {
//   const emailData = {
//     from: "onboarding@resend.dev",
//     to: [to],
//     subject: "Bitte verifizieren Sie Ihre E-Mail-Adresse",
//     html: `<p>Klicken Sie auf den folgenden Link, um Ihre E-Mail-Adresse zu verifizieren:</p>
//                <a href="${verificationLink}">Verifizieren Sie Ihre E-Mail</a>`,
//   };

//   try {
//     const { data, error } = await resend.emails.send(emailData);

//     if (error) {
//       console.error("Fehler beim Senden der E-Mail:", error);
//       throw new Error("E-Mail konnte nicht gesendet werden");
//     }

//     console.log("E-Mail gesendet:", data);
//   } catch (error) {
//     console.error("Fehler:", error);
//   }
// };
