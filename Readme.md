# Wander Stay
## Description
Welcome to WanderStay! WanderStay is a web application that enables travelers to connect with locals all around the world and experience authentic cultural exchanges during their journeys. Our platform provides a range of features to facilitate interactions and stays with locals, ensuring a memorable travel experience.

## Key Features 
###### User Registration and Login: 
Users can easily create an account and log in to access the platform's features.
###### Google One-Tap Login: 
Seamlessly log in with a single click using your Google account.
###### Role-based Access Control: 
The platform includes three user roles: admins, editors, and basic users, each with specific permissions and access levels.
###### Admin Dashboard with Analytics: 
Admins have access to a comprehensive dashboard that provides valuable analytics and insights to track platform usage and performance.
###### Efficient Room Search: 
Utilizing Mapbox integration, users can explore and search for available rooms worldwide, ensuring an efficient and intuitive search experience.
###### Room Management: 
Users with appropriate permissions can add new rooms, update existing room details, and maintain an up-to-date database of available accommodations.
###### Photo Uploads: 
Users can conveniently upload photos of rooms and profile pictures. We leverage Firebase for secure and fast storage and retrieval of these images.

## Project Structure:
<pre>
├── client/                # Frontend React application
│   ├── public/            # Public assets
│   ├── src/               # React components and logic
│   └── package.json       # Client-side dependencies and scripts
├── server/                # Backend Express application
│   ├── controllers/       # Request handlers
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   ├── middleware/        # Utility functions for security purposes
│   ├── index.js           # Express app configuration
│   └── package.json       # Server-side dependencies and scripts
├── .env                   # Environment variable configuration
├── .gitignore             # Files and directories to be ignored by Git
├── README.md              # Project documentation (you are here)
└── package.json           # Project metadata and scripts
</pre>
## Contributing:
Contributing
We appreciate contributions from the community to enhance Wanderlust Connect further. To contribute to the project, please follow these steps:
<pre>
1. Fork the repository on GitHub.
2. Create a new branch with a descriptive name.
3. Implement your changes and commit them with clear and concise messages.
4. Push your changes to your forked repository.
5. Submit a pull request, detailing the modifications you have made.
</pre>