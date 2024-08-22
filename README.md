# Food Recipes App


Before getting started, ensure you have the following installed:

- **Python 3.8** or higher
- **Node.js 16.x** or higher
- **npm 7.x** or higher

# Installation

## Clone the Repository

Clone the repository and navigate into the project directory:

```bash
git clone https://github.com/jyaheza/recipe-app.git
cd recipe-app
```
## Backend Setup
Navigate to the backend directory:

```bash
cd backend
```
Create and activate a virtual environment:

### On macOS/Linux:

```bash
python3 -m venv env
source env/bin/activate
```
### On Windows:

```bash
python -m venv env
.\env\Scripts\activate
```
## Install the required Python packages:

```bash
pip install -r requirements.txt
```
## Apply database migrations:

```bash
python manage.py migrate
```
## Start the Django development server:

```bash
python manage.py runserver
```
## Frontend Setup
### Navigate to the frontend directory:

```bash
cd ../frontend
```
### Install the required npm packages:
```bash
npm install
```
## Running the App

### Backend

Ensure you are in the backend directory with the virtual environment activated. Start the Django server:

```bash
python manage.py runserver
```
The backend will be accessible at http://localhost:8000/.

### Frontend

Ensure you are in the frontend directory and start the React app:

```bash
npm start
```
The frontend will be accessible at http://localhost:3000/.
