import nodemailer from "nodemailer";

type SendArgs = {
  to: string;
  verificationUrl: string;
};

function getTransport() {
  const host = process.env.MAIL_HOST;
  const port = process.env.MAIL_PORT ? Number(process.env.MAIL_PORT) : undefined;
  const user = process.env.MAIL_USER;
  const pass = process.env.MAIL_PASS;

  if (!host || !port || !user || !pass) {
    throw new Error(
      "SMTP não configurado (defina MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASS)"
    );
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true para 465, false TLS para outros
    auth: { user, pass },
  });
}

export async function sendVerificationEmail({ to, verificationUrl }: SendArgs) {
  const from = process.env.MAIL_FROM ?? `No-Reply <no-reply@localhost>`;
  const transport = getTransport();

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.5;color:#333">
      <h2 style="color:#4B0D65">Confirme seu e-mail</h2>
      <p>Obrigado por se cadastrar! Clique no botão abaixo para confirmar seu e-mail:</p>
      <p>
        <a href="${verificationUrl}"
           style="display:inline-block;background:#4B0D65;color:#fff;padding:10px 16px;
                  border-radius:6px;text-decoration:none;font-weight:bold">
          Verificar e-mail
        </a>
      </p>
      <p>Ou copie e cole este link no navegador:</p>
      <p><a href="${verificationUrl}">${verificationUrl}</a></p>
      <p style="color:#666;font-size:12px">Este link expira em 24 horas.</p>
    </div>
  `;

  await transport.sendMail({
    to,
    from,
    subject: "Confirme seu e-mail",
    html,
  });
}
