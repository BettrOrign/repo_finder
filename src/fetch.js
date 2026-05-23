export async function fetchToGithub(URL) {
  try {
    const response = await fetch(URL, {
      headers: { "User-Agent": "Project" },
    });

    if (!response.ok) {
      ("error with getting response");
    }

    return response;
  } catch (error) {
    console.log("Error" + error.message);
  }
}
