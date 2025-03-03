*Spacex FrontEnd

SpaceX Frontend is a React-based web application that interacts with the SpaceX Backend. It fetches and displays launch data stored in a DynamoDB database, providing a user-friendly interface to explore success, failed and upcoming launches.

*🌟 Features

📊 Display SpaceX launches details (success, failed and upcoming).

🔎 Filter launches by recovery attempt and recovered.

🔗 Integration with a custom SpaceX Backend connected to AWS DynamoDB.

📱 Responsive design for desktop and mobile views.

*📦 Installation

Ensure you have Node.js installed on your system.

Clone the repository:

git clone https://github.com/yeisir/spacex_frontend.git
cd spacex_frontend

Install dependencies:

npm install

🚀 Usage

To run the app locally, execute:

npm start

Open http://localhost:3000 to view it in your browser.

🛠️ Environment Variables

Create a .env file in the root directory and add the following variables:

REACT_APP_API_URL=http://your-backend-url

Replace http://your-backend-url with the actual URL of your SpaceX Backend.

📤 Deployment

To build the app for production:

npm run build

The output will be in the build/ folder, ready for deployment.

📚 Tech Stack

Frontend: React, JavaScript

Backend (API): Node.js (via SpaceX Backend)

Database: AWS DynamoDB

