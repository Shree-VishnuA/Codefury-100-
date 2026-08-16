async function test() {
  const form = new FormData();
  form.append('resumeText', 'Sarah Jenkins, Software Engineer. I build apps.');
  form.append('targetRole', 'Frontend Developer');

  try {
    const res = await fetch('http://localhost:5000/api/improve-resume', {
      method: 'POST',
      body: form
    });
    const text = await res.text();
    console.log("Status:", res.status);
    console.log("Response:", text);
  } catch (err) {
    console.error(err);
  }
}
test();
