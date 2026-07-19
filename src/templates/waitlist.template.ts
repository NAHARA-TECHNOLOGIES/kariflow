export function waitlistTemplate(name: string) {
  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<title>Welcome to Kariflow</title>
</head>

<body style="font-family:Arial;background:#f8fafc;padding:40px">

<div style="
max-width:650px;
margin:auto;
background:white;
border-radius:12px;
padding:40px;
">

<h1 style="color:#059669;">
Welcome to Kariflow 🚀
</h1>

<p>

Hi <strong>${name}</strong>,

</p>

<p>

Thanks for joining the Kariflow waitlist.

You're now among the first creators that will gain early access.

</p>

<p>

We'll notify you as soon as access becomes available.

</p>

<br>

<p>

The Kariflow Team

</p>

</div>

</body>

</html>
`;
}