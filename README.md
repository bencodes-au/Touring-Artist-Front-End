# Touring-Artist-Back-End
Touring Arist is an application built for artists booking venues. Created as part of study at CoderAcademy. 

Repo: https://github.com/bencodes-au/Touring-Artist-Front-End#

Front End Deployment: https://touringartist.netlify.app/

Back End Deployment: https://touring-artist-back-end.onrender.com

*As these have been deployed to free services, please give a moment for the back end functionality to load when first accessing it. If it does not work at first, try refreshing the page after a few moments.*

# Welcome to Touring Artist
Touring Artist is a booking website for aspiring artists to book venues for their performances. This tool is designed to allow artists to register an account, log in, view all available venues in a given area or genre and follow it up with a quick and effortless booking process. Any user may view available venues, filter venues by location or genre, make a booking by specifying a venue, date, artist name and whether or not they have paid up front. 

# Requirements
This is a simple project that does not require high grade hardware. Most modern computers will be able to run this project provided they have stable internet connection during installation, a modern web browser (chrome, firefox, safari, edge) and a recent operating system (windows 10/11, macOS or Linux).

# Set Up
1. Clone the repository
git clone git@github.com:bencodes-au/Touring-Artist-Front-End.git

2. Install dependencies
npm install

3. Set up environment variables
Edit the .env with your set up
r
npm run dev
4. Start the development serve

# Dependencies
The newest available versions of these dependencies were used for this project as of the time this was written (23/03/2025). 

## Node.JS
Node.js serves as the runtime environment for the backend of this project, allowing JavaScript to be executed on the server side. It provides a non-blocking, event-driven architecture, making it efficient for handling multiple concurrent requests. In this project, Node.js powers the Express server, enabling the creation of APIs for user authentication, data retrieval, and interaction with the MongoDB database. 

## Libraries
### React
React is a JavaScript library for building user interfaces. It allows developers to create dynamic, interactive web applications with a component-based architecture. React uses a virtual DOM to efficiently update and render components, improving performance by minimizing direct manipulation of the actual DOM. React shone in this project for it's ability to enable hook and state management. 

### Vite
Vite is a fast and modern build tool for JavaScript and TypeScript projects, specifically designed to improve the development experience for web applications. Vite has a zero-config set up for React. It became the skeleton of this app.  

### Tanstack Query 
Tanstack Query, previously known as React Query, is a data-fetching and state management library for React applications. It simplifies handling asynchronous data fetching, caching, synchronization, and background data updates. React Query provides hooks like useQuery and useMutation to fetch, cache, and manage data in an efficient and declarative manner, helping developers avoid complex state management for server data. In this project, it was primarily used to simply hooks.

```
export function useLoginUser() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (payload) => {
      try {
        const response = await api.post("/users/login", payload);
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("userId", response.data.user_id);
          navigate("/");
        } else {
          throw new Error("Token or User ID not found in response");
        }
      } catch (error) {
        console.error("Login error:", error.response?.data || error.message);
        throw error;
      }
    },
  });
}
```

### Axios
Axios is a library used to make HTTP requests in Node via utilising promises. Axios simplifies handling asynchronous operations by supporting promises and async/await syntax.

import axios from "axios";

const API_BASE_URL = "https://touring-artist-back-end.onrender.com";
const DEV_BASE_URL = "http://localhost:3000/";

const API_URL = import.meta.env.DEV ? DEV_BASE_URL : API_BASE_URL;

const api = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
});

export default api;

### Tailwind
Tailwind is a CSS framework for designing CSS without writing it traditionally. Instead of providing predefined components, Tailwind gives utility classes to style elements directly in HTML or JSX. This is common in building UI's, especially in React. In this project, it also enabled the easy use of Daisy UI, which became an easy access component library. 

```
 <main className="flex justify-center items-center bg-base-100 p-6">
      <div className="py-12 w-full max-w-xl">
        <h1 className="text-3xl font-semibold mb-6 text-primary">Bookings</h1>
```

### Daisy UI
daisyUI is a plugin for Tailwind CSS that provides a set of pre-built, customizable components like buttons, forms, modals, and navigation bars. It extends Tailwind's utility-first approach by offering ready-to-use components while maintaining full customization through Tailwind's utility classes. daisyUI simplifies building responsive and attractive UIs without needing to write a lot of custom CSS.

```
<dialog
      id="auth_modal"
      className={`modal ${isOpen ? "modal-open" : ""}`}
      aria-labelledby="auth-modal-title"
      aria-describedby="auth-modal-description"
    >
      <div className="modal-box">
        {/* Modal Header */}
        <header>
          <h2
            id="auth-modal-title"
            className="font-bold text-lg text-center"
            aria-live="polite"
          >
            Welcome to Touring Artist!
          </h2>
```

### React Icons
React icons is a library for icons. It was used for the guitar icon in the logo and the arrows on the filters.

``` <FiChevronDown className="text-lg" /> 
```

### Vitest
Vitest is a testming framework for Javascript apps, specifically built for Vite. It supports features like snapshot testing, mocking, and code coverage. 

```
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});
```

### React Testing Library/ User Event Testing Library
React Testing Library that provides utilities for simulating real user events (such as clicks, typing, and mouse movements) in your tests. It encourages testing user interactions by triggering events that mirror how users would actually interact with your application. 

```
await userEvent.click(screen.getByText("Close"));
```

# Licenses
This project and all of it's libraries are under the MIT License. The MIT Licensee License is an open-source license, meaning they allow software to be freely used, modified, and distributed, even for commercial purposes, with minimal restrictions. The MIT License keeps the original license and copyright notice but imposes no further restrictions on modification or redistribution.

## Ethical Concerns
The license explicitly state that the software is provided "as is," meaning users cannot hold developers accountable for security flaws, bugs, or damages caused by the software. The responsibility of security for programs under this license fall on the user. These licenses also allow companies to take this code, modify it and release a different version without sharing improvements. This means that this project is under threat of being copied and monetised elsewhere. 

## MIT License
The MIT License
Copyright (c) 2025 Ben Gorman

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

# Design and Reflection
## Architecture
Touring Artist was always going to be a full-stack JS project, which meant it made the most sense to follow MERN architecture. MERN is an acronym named after the core technologies it uses:

**M**ongoDB
**E**xpress
**R**eact
**N**ode

MERN stacks are generally used for it's ability to create full stack applications seamlessly by enabling similar frameworks in the front and back end. With MERN, I was able to write both server and client side code in Javascript. This allows for highly varied applications with simplicity, scalability  and strong community support. This makes it a popular option for web apps, such as the one I have created.

## Comparison to Alternate Technologies
### React vs Vue (SPA's)
Vue is another popular framework that I could have used instead of React. React is more of a library focused on the view layer and requires additional libraries for routing and state management. Vue, on the other hand, is a more full-featured framework that provides built-in tools for routing, state management, and more. React was chosen for it's larger eco-system and community over Vue's simplicity. 

### Tailwind vs CSS 
For this project, I chose Tailwind over CSS because it gave me easier access to component libraries. When viewing past cohort's projects, the ones that stood out to me the most were using component libraries. Instead of writing custom styles or creating components from scratch, I could use DaisyUI's ready-made components, and tailor them to the project's needs. 

## Libraries
This project was written in Node.js utilising the following libraries. These libraries were chosen over their competitors due to the wide reach that they have seen. From a student on the outside looking in, these libraries appear to be the industry standard. As this project was my first attempt at writing Javascript, it seemed best to solidfy my learning in the commonly used and trusted formats. When downloading libaries I stick to well known libraries over lesser known ones to avoid potential security risks. 

- React
- Tanstack Query
- Axios
- Tailwind
- daisyUI
- React icons
- Vitest
