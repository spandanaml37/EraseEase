document.getElementById("removeBgBtn").addEventListener("click", async () => {
    const fileInput = document.getElementById("uploadImage");
    if (fileInput.files.length === 0) {
        alert("Please upload an image first.");
        return;
    }

    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append("image_file", file);
    formData.append("size", "auto");

    const API_KEY = "xGi8LXJmY1mDbu8GzY2zzGAX"; 
    const url = "https://api.remove.bg/v1.0/removebg";

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "X-Api-Key": API_KEY },
            body: formData
        });

        if (!response.ok) throw new Error("Failed to process image");

        const blob = await response.blob();
        const imgURL = URL.createObjectURL(blob);

        // Show the image and add a download button
        document.getElementById("result").innerHTML = `
            <img src="${imgURL}" alt="Processed Image">
            <a id="downloadBtn" href="${imgURL}" download="bg_removed.png">
                <button>Download Image</button>
            </a>
        `;

    } catch (error) {
        alert("Error removing background: " + error.message);
    }
});

