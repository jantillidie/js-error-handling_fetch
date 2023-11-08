console.clear();

const userElement = document.querySelector(".user");

async function loadUser(url) {
  // Select the error element:
  const errorElement = document.querySelector(".error")
  // Clear any existing error messages:
  errorElement.textContent = '';
  console.log(url);

  // Start the try...catch block to catch errors during the fetch call:
  try {
    const response = await fetch(url);
    // if the response is not okay throw an error with the status text:
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const json = await response.json();
    const user = json.data;

    userElement.innerHTML = `
  <h2>${user.first_name} ${user.last_name}</h2>
  <img alt="${user.first_name} ${user.last_name}" src="${user.avatar}"/>
  `;
  }
  // display the error message:
  catch (error) {
    errorElement.textContent = error.message;
  }
  // if there is no error, the error element stays empty (line 9)
}

document
  .querySelectorAll("button[data-url]")
  .forEach((button) =>
    button.addEventListener("click", (event) =>
      loadUser(event.target.dataset.url)
    )
  );
