async function fetchVideo() {
  const url = document.getElementById("videoURL").value;
  const loader = document.getElementById("loader");
  const resultBox = document.getElementById("result");
  const videoPreview = document.getElementById("videoPreview");
  const downloadBtn = document.getElementById("downloadBtn");

  if (!url) {
    alert("❌ Please enter a valid video URL!");
    return;
  }

  loader.classList.remove("hidden");
  resultBox.classList.add("hidden");

  try {
    const response = await fetch("https://video-downloader-production-1235.up.railway.app/api/download", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url })
    });

    const data = await response.json();

    loader.classList.add("hidden");

    if (data && data.url) {
      videoPreview.src = data.url;
      downloadBtn.href = data.url;
      resultBox.classList.remove("hidden");
    } else {
      alert("❌ Could not fetch video.");
    }

  } catch (err) {
    loader.classList.add("hidden");
    alert("⚠️ Error connecting to server.");
    console.error(err);
  }
}
