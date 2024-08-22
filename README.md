# Food Recipes App

This is a full-stack application for creating, listing, and managing food recipes. The frontend is built with React and Material-UI, and the backend is powered by Django. Recipes are stored in a SQLite database, and the application features a dialog box for adding new recipes and a delete function for managing them.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Running the App](#running-the-app)
  - [Running the Backend](#running-the-backend)
  - [Running the Frontend](#running-the-frontend)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Make sure you have the following installed:

- Python 3.8 or higher
- Node.js 16.x or higher
- npm 7.x or higher

## Installation

### Clone the Repository

```bash
git clone https://github.com/yourusername/food-recipes-app.git
cd food-recipes-app
Backend Setup
Navigate to the backend directory:

bash
Copy code
cd backend
Create a virtual environment:

bash
Copy code
python3 -m venv env
Activate the virtual environment:

On macOS/Linux:

bash
Copy code
source env/bin/activate
On Windows:

bash
Copy code
.\env\Scripts\activate
Install the required Python packages:

bash
Copy code
pip install -r requirements.txt
Apply the migrations to set up the SQLite database:

bash
Copy code
python manage.py migrate
Start the Django development server:

bash
Copy code
python manage.py runserver
Frontend Setup
Navigate to the frontend directory:

bash
Copy code
cd ../frontend
Install the required npm packages:

bash
Copy code
npm install
Running the App
Running the Backend
To run the backend server, ensure you're in the backend directory and your virtual environment is activated. Then, start the Django server:

bash
Copy code
python manage.py runserver
The backend will run on http://localhost:8000/.

Running the Frontend
To run the frontend, ensure you're in the frontend directory and run:

bash
Copy code
npm start
The frontend will run on http://localhost:3000/.
